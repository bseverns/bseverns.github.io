import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SiteContentTests(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text(encoding="utf-8")

    def test_teaching_pages_expose_content_and_one_canonical_entry(self):
        self.assertIn("{{ content }}", self.read("_layouts/teaching.html"))
        redirect = self.read("teaching.md")
        self.assertIn('http-equiv="refresh"', redirect)
        self.assertIn('/courses.html', redirect)

    def test_selected_programs_precede_infrastructure_diagrams(self):
        page = self.read("courses.html")
        titles = [
            "Build Your Block",
            "From Idea to 3D Print",
            "Sound Design and Engineering",
            "Tiny Whoop Tuning &amp; Racing",
            "AI in Your Feed: Create, Explore, Protect",
        ]
        for title in titles:
            self.assertIn(title, page)
        self.assertLess(page.index("Selected learning programs"), page.index("Learning maps"))

    def test_lineage_pages_reference_imported_media(self):
        expected = {
            "docs/legacy/i-was-young-once.md": [
                "img/lineage/i-was-young-once/rocket_01.jpg",
                "img/lineage/i-was-young-once/rocket_02.jpg",
            ],
            "docs/legacy/scar.md": ["img/lineage/scar/scar_hero.jpg"],
            "docs/legacy/digital-bath-engram.md": [
                "img/lineage/digital-bath/digital-bath_03.jpg",
                "img/lineage/digital-bath/digital-bath_04.jpg",
            ],
            "docs/legacy/everything-was-beautiful.md": [
                f"img/lineage/everything-was-beautiful/beautiful_0{index}.jpg"
                for index in range(1, 5)
            ],
            "docs/legacy/there-was-blood-on-my-hands.md": [
                f"img/lineage/there-was-blood/tbh_0{index}.jpg"
                for index in range(1, 6)
            ],
        }
        for page_path, assets in expected.items():
            page = self.read(page_path)
            for asset in assets:
                self.assertTrue((ROOT / asset).is_file(), asset)
                self.assertIn("/" + asset, page)

    def test_new_archive_records_and_crowd_organ_are_public(self):
        legacy = self.read("_data/legacy_works.yml")
        for slug in ("everything-was-beautiful", "there-was-blood-on-my-hands"):
            self.assertIn(f"- id: {slug}", legacy)
            self.assertTrue((ROOT / "docs" / "legacy" / f"{slug}.md").is_file())
        node = ROOT / "_nodes" / "crowdOrgan.md"
        self.assertTrue(node.is_file())
        node_text = node.read_text(encoding="utf-8")
        self.assertIn('repo: "https://github.com/bseverns/crowd-organ"', node_text)
        self.assertIn("proof_objects:", node_text)

    def test_proxy_only_data_weird_is_not_a_studio_route(self):
        self.assertNotIn("id: data-weird", self.read("_data/studio_routes.yml"))

    def test_i_was_young_catalog_only_lists_public_media(self):
        catalog = json.loads(self.read("catalog/items/i-was-young-once.json"))
        for media_type in ("images", "video"):
            for asset in catalog["media"][media_type]:
                self.assertTrue((ROOT / asset.lstrip("/")).is_file(), asset)
        self.assertIn("withheld", catalog["ethics"]["consent"])


if __name__ == "__main__":
    unittest.main()
