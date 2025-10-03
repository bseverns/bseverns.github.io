#!/usr/bin/env python3
"""Generate the Critical Digital Studies sampler PDF from the data source."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from io import BytesIO
from pathlib import Path
from typing import Iterable

import cairosvg
import yaml
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (Image, ListFlowable, PageBreak, Paragraph,
                                SimpleDocTemplate, Spacer)


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "_data/cds.yml"
PAGE_PATH = ROOT / "critical-digital-studies-sampler/index.md"
# Keep the build target aligned with the asset actually linked on the site.
OUTPUT_PATH = ROOT / "assets/docs/Severns_CriticalDigitalStudies.pdf"
MAX_IMG_WIDTH = 6.5 * inch
MAX_IMG_HEIGHT = 3.9 * inch


@dataclass
class Card:
    """Type-checked container for sampler data."""

    id: str
    title: str
    img_src: str | None
    abstract: str | None
    aligns: list[str]
    methods: list[str]
    outcomes: list[str]
    teach: dict
    links: list[dict]


def load_cards() -> list[Card]:
    """Load cards from `_data/cds.yml` and normalize defaults."""
    raw = yaml.safe_load(DATA_PATH.read_text())
    cards: list[Card] = []
    for entry in raw.get("cards", []):
        cards.append(
            Card(
                id=entry.get("id", ""),
                title=entry.get("title", ""),
                img_src=entry.get("img_src"),
                abstract=entry.get("abstract"),
                aligns=entry.get("aligns", []) or [],
                methods=entry.get("methods", []) or [],
                outcomes=entry.get("outcomes", []) or [],
                teach=entry.get("teach", {}) or {},
                links=entry.get("links", []) or [],
            )
        )
    if not cards:
        raise SystemExit("No cards found in _data/cds.yml; PDF would be a ghost.")
    return cards


def load_updated_stamp() -> str:
    """Grab the `updated` value from the sampler page front matter."""
    text = PAGE_PATH.read_text()
    if not text.startswith("---"):
        return ""
    lines = text.splitlines()[1:]
    front_matter: list[str] = []
    for line in lines:
        if line.strip() == "---":
            break
        front_matter.append(line)
    meta = yaml.safe_load("\n".join(front_matter))
    stamp = meta.get("updated") if isinstance(meta, dict) else None
    if isinstance(stamp, str):
        try:
            clean = stamp.strip("\"")
            return datetime.fromisoformat(clean).strftime("%Y-%m-%d")
        except ValueError:
            return stamp
    return ""


def svg_to_png_bytes(path: Path) -> bytes:
    """Render an SVG asset to PNG bytes using CairoSVG."""
    return cairosvg.svg2png(url=path.as_uri(), output_width=1600)


def load_image(card: Card) -> Image | None:
    """Return a scaled ReportLab Image for the card hero."""
    if not card.img_src:
        return None
    asset_path = ROOT / card.img_src.lstrip("/")
    if not asset_path.exists():
        raise FileNotFoundError(f"Image not found for card {card.id}: {asset_path}")

    if asset_path.suffix.lower() == ".svg":
        image_bytes = svg_to_png_bytes(asset_path)
    else:
        image_bytes = asset_path.read_bytes()

    stream = BytesIO(image_bytes)
    stream.seek(0)
    hero = Image(stream)
    hero._restrictSize(MAX_IMG_WIDTH, MAX_IMG_HEIGHT)
    hero.hAlign = "CENTER"
    return hero


def bullet_list(items: Iterable[str], style: ParagraphStyle) -> ListFlowable:
    paras = [Paragraph(str(item), style) for item in items if item]
    return ListFlowable(
        paras,
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica",
        bulletFontSize=8,
        spaceBefore=2,
        spaceAfter=6,
    )


def teach_blocks(card: Card, style: ParagraphStyle) -> ListFlowable | None:
    teach_map = []
    goal = card.teach.get("goal")
    lab = card.teach.get("lab60")
    assess = card.teach.get("assess")
    if goal:
        teach_map.append(Paragraph(f"<b>Goal:</b> {goal}", style))
    if lab:
        teach_map.append(Paragraph(f"<b>60-min lab:</b> {lab}", style))
    if assess:
        teach_map.append(Paragraph(f"<b>Assess:</b> {assess}", style))
    if not teach_map:
        return None
    return ListFlowable(
        teach_map,
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica",
        bulletFontSize=8,
        spaceBefore=2,
        spaceAfter=6,
    )


def link_list(card: Card, style: ParagraphStyle) -> ListFlowable | None:
    items = []
    for link in card.links:
        if link.get("disabled"):
            continue
        url = link.get("url")
        label = link.get("label")
        if not url or not label or url.strip() == "#":
            continue
        items.append(Paragraph(f"<link href='{url}'>{label}</link>", style))
    if not items:
        return None
    return ListFlowable(
        items,
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica",
        bulletFontSize=8,
        spaceBefore=2,
        spaceAfter=0,
    )


def build_pdf(cards: list[Card]) -> None:
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.8 * inch,
        bottomMargin=0.8 * inch,
    )
    styles = getSampleStyleSheet()
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontSize=10.5, leading=14)
    tags = ParagraphStyle(
        "Tags",
        parent=body,
        textColor="#334155",
        fontName="Helvetica-Oblique",
        spaceAfter=8,
    )
    heading = ParagraphStyle(
        "Heading",
        parent=styles["Heading3"],
        fontSize=12,
        leading=16,
        spaceBefore=14,
        spaceAfter=4,
        textColor="#0f172a",
        fontName="Helvetica-Bold",
    )
    title = ParagraphStyle(
        "CardTitle",
        parent=styles["Heading1"],
        fontSize=20,
        leading=24,
        spaceAfter=10,
        textColor="#0b1431",
    )
    intro = ParagraphStyle(
        "Intro",
        parent=styles["Heading1"],
        fontSize=28,
        leading=32,
        textColor="#0b1431",
        alignment=1,
        spaceAfter=20,
    )
    intro_body = ParagraphStyle(
        "IntroBody",
        parent=body,
        fontSize=12,
        leading=18,
        alignment=1,
        spaceBefore=12,
    )

    elements: list = []
    updated_stamp = load_updated_stamp()
    elements.append(Paragraph("Critical Digital Studies — Sampler", intro))
    elements.append(
        Paragraph(
            "Practice-based glimpses of how pedagogy, ethics, and tooling intertwine.",
            intro_body,
        )
    )
    if updated_stamp:
        elements.append(
            Paragraph(
                f"<font size=10>Unlisted page · Updated {updated_stamp}</font>",
                ParagraphStyle("Stamp", parent=body, alignment=1, spaceBefore=6),
            )
        )
    elements.append(Spacer(1, 1.2 * inch))
    elements.append(
        Paragraph(
            "Each subsequent page is a card: hero image, methods, outcomes, and the teach-with-this kit so a"
            " future instructor can reproduce the work without guessing.",
            ParagraphStyle(
                "CoverNote",
                parent=body,
                alignment=1,
                leading=16,
                spaceBefore=0,
            ),
        )
    )
    elements.append(PageBreak())

    for index, card in enumerate(cards):
        elements.append(Paragraph(card.title, title))
        if card.aligns:
            elements.append(Paragraph("Alignment: " + " · ".join(card.aligns), tags))
        hero = load_image(card)
        if hero:
            elements.append(hero)
            elements.append(Spacer(1, 0.25 * inch))
        if card.abstract:
            elements.append(Paragraph(card.abstract, body))
        if card.methods:
            elements.append(Paragraph("Methods & Ethics", heading))
            elements.append(bullet_list(card.methods, body))
        if card.outcomes:
            elements.append(Paragraph("Outcomes", heading))
            elements.append(bullet_list(card.outcomes, body))
        teach = teach_blocks(card, body)
        if teach:
            elements.append(Paragraph("Teach with this", heading))
            elements.append(teach)
        links = link_list(card, body)
        if links:
            elements.append(Paragraph("Links", heading))
            elements.append(links)
        if index < len(cards) - 1:
            elements.append(PageBreak())

    doc.build(elements)
    print(f"Wrote sampler PDF to {OUTPUT_PATH.relative_to(ROOT)}")


def main() -> None:
    cards = load_cards()
    build_pdf(cards)


if __name__ == "__main__":
    main()
