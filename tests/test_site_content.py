import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class SiteContentTests(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text(encoding="utf-8")

    def test_teaching_pages_expose_content_and_one_canonical_entry(self):
        self.assertIn("{{ content }}", self.read("_layouts/teaching.html"))
        self.assertFalse((ROOT / "teaching.md").exists())
        redirect = self.read("teaching.html")
        self.assertIn('http-equiv="refresh"', redirect)
        self.assertIn('/courses.html', redirect)
        rendered = ROOT / "_site" / "teaching" / "index.html"
        if rendered.exists():
            self.assertTrue(rendered.read_text(encoding="utf-8").startswith("<!doctype html>"))

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
            "docs/legacy/iykywhgi.md": [
                "img/lineage/iykywhgi/iykywhgi_01.jpg"
            ],
        }
        for page_path, assets in expected.items():
            page = self.read(page_path)
            for asset in assets:
                self.assertTrue((ROOT / asset).is_file(), asset)
                self.assertIn("/" + asset, page)

    def test_new_archive_records_and_crowd_organ_are_public(self):
        legacy = self.read("_data/legacy_works.yml")
        for slug in (
            "everything-was-beautiful",
            "there-was-blood-on-my-hands",
            "iykywhgi",
        ):
            self.assertIn(f"- id: {slug}", legacy)
            self.assertTrue((ROOT / "docs" / "legacy" / f"{slug}.md").is_file())
        node = ROOT / "_nodes" / "crowdOrgan.md"
        self.assertTrue(node.is_file())
        node_text = node.read_text(encoding="utf-8")
        self.assertIn('repo: "https://github.com/bseverns/crowd-organ"', node_text)
        self.assertIn("proof_objects:", node_text)

    def test_proxy_only_data_weird_is_not_a_studio_route(self):
        self.assertNotIn("id: data-weird", self.read("_data/studio_routes.yml"))

    def test_lofi_sampler_is_a_studio_route_with_real_hardware_image(self):
        routes = self.read("_data/studio_routes.yml")
        self.assertIn("- id: lofi-sampler", routes)
        self.assertIn("url: /atlas/n/lofisampler/", routes)
        image = "img/studio/lofi-sampler/neotrellis.jpg"
        self.assertIn("/" + image, routes)
        self.assertTrue((ROOT / image).is_file())

    def test_classhub_node_publishes_only_staged_interface_proof(self):
        node = self.read("_nodes/classhub.md")
        self.assertIn("atlas-proof-gallery", self.read("_layouts/atlas_node.html"))
        self.assertIn('status: "workshop prototype / staged proof"', node)
        self.assertIn("No real student identities", node)
        self.assertIn("They do not establish live deployment", node)
        for image in (
            "img/studio/classhub/teacher-dashboard.png",
            "img/studio/classhub/student-standard-view.png",
            "img/studio/classhub/data-lifespan-dashboard.png",
        ):
            self.assertTrue((ROOT / image).is_file(), image)
            self.assertIn("/" + image, node)

    def test_i_was_young_catalog_only_lists_public_media(self):
        catalog = json.loads(self.read("catalog/items/i-was-young-once.json"))
        for media_type in ("images", "video"):
            for asset in catalog["media"][media_type]:
                self.assertTrue((ROOT / asset.lstrip("/")).is_file(), asset)
        self.assertIn("withheld", catalog["ethics"]["consent"])
        self.assertNotIn("I was young once too", self.read("docs/legacy/i-was-young-once.md"))

    def test_bundle_uses_supported_ruby_line(self):
        self.assertIn('ruby "~> 3.3"', self.read("Gemfile"))

    def test_studio_leads_with_sound_and_keeps_system_diagrams_in_atlas(self):
        page = self.read("art.html")
        self.assertLess(page.index('id="sound-flow"'), page.index('id="current-work"'))
        self.assertNotIn("sound-flow-visual", page)
        self.assertNotIn("Scene Systems", page)
        self.assertNotIn("Open methods", page)
        self.assertNotIn("Open privacy &amp; ethics", page)

    def test_primary_navigation_leads_with_studio_without_press_kit(self):
        navigation = self.read("_data/navigation.yml")
        self.assertLess(navigation.index("- title: Studio"), navigation.index("- title: Atlas"))
        self.assertNotIn("Press kit", navigation)

    def test_bs_route_is_not_labeled_as_release_practice(self):
        routes = self.read("_data/studio_routes.yml")
        self.assertNotIn("- id: bs-sound", routes)

    def test_studio_bs_encounter_uses_real_cover_art(self):
        page = self.read("art.html")
        for asset in (
            "assets/images/bs/whole-pile-cover.png",
            "assets/images/bs/waves.png",
        ):
            self.assertIn("/" + asset, page)
            self.assertTrue((ROOT / asset).is_file(), asset)

    def test_bs_catalog_lists_only_public_assets_that_exist(self):
        catalog = json.loads(self.read("catalog/items/bs-noise-thread.json"))
        self.assertEqual(
            catalog["media"]["images"],
            [
                "/assets/images/bs/whole-pile-cover.png",
                "/assets/images/bs/waves.png",
            ],
        )
        self.assertEqual(catalog["media"]["audio"], ["/assets/audio/bs-archive-excerpt-2020.mp3"])

    def test_studio_bs_encounter_has_a_local_audio_excerpt(self):
        page = self.read("art.html")
        self.assertIn('<audio controls preload="metadata">', page)
        self.assertIn('/assets/audio/bs-archive-excerpt-2020.mp3', page)
        self.assertTrue((ROOT / "assets/audio/bs-archive-excerpt-2020.mp3").is_file())

    def test_homepage_gives_bs_its_own_bandcamp_encounter(self):
        page = self.read("index.html")
        self.assertNotIn("B_S. / live-rig", page)
        self.assertIn('class="bs-home-encounter"', page)
        self.assertIn('https://bandcamp.com/EmbeddedPlayer/album=2619394710/', page)
        self.assertIn('title="B_S. — i hope the sky still takes us"', page)

    def test_studio_places_video_and_sculpture_before_current_work(self):
        page = self.read("art.html")
        current_work = page.index('id="current-work"')
        for asset in (
            '/assets/video/after-another-empty-empire_excerpt-2021.mp4',
            '/img/lineage/a-hundred-years-falling/a-hundred-years-falling_01.jpg',
        ):
            self.assertIn(asset, page)
            self.assertLess(page.index(asset), current_work)
        self.assertIn("studio-encounter-video", page)
        self.assertIn("studio-encounter-object", page)

    def test_studio_defers_explanation_to_lineage_and_atlas(self):
        page = self.read("art.html")
        self.assertNotIn("Where truth lives", page)
        self.assertNotIn("What now looks like infrastructure", page)
        self.assertIn("Follow a lineage", page)

    def test_studio_does_not_explain_bs_before_the_player(self):
        page = self.read("art.html")
        bs_start = page.index('<h2 id="sound-flow-title">B_S.</h2>')
        player = page.index('<audio controls preload="metadata">', bs_start)
        self.assertNotIn("pressure", page[bs_start:player].lower())
        self.assertNotIn("ritual", page[bs_start:player].lower())

    def test_studio_intro_is_only_an_invitation(self):
        page = self.read("art.html")
        intro = page[page.index('<section class="page-intro">'):page.index('</section>', page.index('<section class="page-intro">'))]
        self.assertIn("Start with a recording, a moving image, or an object.", intro)
        self.assertNotIn('class="cta"', intro)

    def test_audio_and_embedded_player_fill_narrow_containers(self):
        css = self.read("css/site.css")
        self.assertIn(".sound-flow-copy audio,", css)
        self.assertIn(".bs-home-player iframe", css)
        self.assertIn("width: 100%;", css)

    def test_mobile_header_wraps_navigation_before_it_overflows(self):
        css = self.read("css/site.css")
        self.assertIn("@media (max-width: 640px)", css)
        self.assertIn(".header-inner", css)
        self.assertIn("flex-wrap: wrap;", css)
        self.assertIn(".primary-nav ul", css)

    def test_homepage_uses_choose_a_doorway_once(self):
        self.assertEqual(self.read("index.html").count("Choose a doorway"), 1)

    def test_legacy_records_do_not_repeat_reference_routes_as_a_section_title(self):
        for page in (ROOT / "docs" / "legacy").glob("*.md"):
            self.assertNotIn("## Reference routes", page.read_text(encoding="utf-8"), page)

    def test_legacy_record_link_lists_are_labeled_navigation(self):
        for name in (
            "a-hundred-years-falling",
            "after-another-empty-empire",
            "everything-was-beautiful",
            "iykywhgi",
            "my-mouth-is-open-from-end-to-end",
            "remade",
            "there-was-blood-on-my-hands",
            "we-know-this-body",
        ):
            page = self.read(f"docs/legacy/{name}.md")
            self.assertIn('<nav aria-label="Related links">', page)

    def test_mn42_project_includes_a_bench_bringup_still(self):
        project = self.read("_projects/mn42.md")
        self.assertIn("/img/studio/mn42_hero.jpg", project)
        self.assertTrue((ROOT / "img/studio/mn42_hero.jpg").is_file())

    def test_press_studio_portrait_is_present(self):
        portrait = ROOT / "img/press/studio-portrait.jpg"
        self.assertTrue(portrait.is_file())
        self.assertIn("/img/press/studio-portrait.jpg", self.read("about.md"))

    def test_two_lefts_has_a_public_sensor_trace(self):
        asset = "img/lineage/two-lefts/two-lefts-trace.png"
        self.assertTrue((ROOT / asset).is_file())
        self.assertIn("/" + asset, self.read("docs/legacy/two-lefts-and-another-right-out-the-door.md"))
        catalog = json.loads(self.read("catalog/items/two-lefts-and-another-right-out-the-door.json"))
        self.assertEqual(
            catalog["media"]["images"],
            ["/3d/full3d/Fly2.jpg", "/" + asset],
        )

    def test_after_another_empty_empire_has_a_silent_video_excerpt(self):
        page = self.read("docs/legacy/after-another-empty-empire.md")
        video = "assets/video/after-another-empty-empire_excerpt-2021.mp4"
        poster = "img/lineage/after-another-empty-empire/after-another-empty-empire_01.jpg"
        self.assertIn("<video controls preload=\"metadata\"", page)
        for asset in (video, poster):
            self.assertTrue((ROOT / asset).is_file(), asset)
            self.assertIn("/" + asset, page)
        catalog = json.loads(self.read("catalog/items/after-another-empty-empire.json"))
        self.assertEqual(catalog["media"]["video"], ["/" + video])

    def test_recovered_2008_to_2010_objects_have_public_records(self):
        works = {
            "we-know-this-body": "we-know-this-body/we-know-this-body_01.jpg",
            "a-hundred-years-falling": "a-hundred-years-falling/a-hundred-years-falling_01.jpg",
            "my-mouth-is-open-from-end-to-end": "my-mouth-is-open-from-end-to-end/my-mouth-is-open-from-end-to-end_01.jpg",
            "remade": "remade/remade_01.jpg",
        }
        legacy = self.read("_data/legacy_works.yml")
        for slug, asset_suffix in works.items():
            asset = "img/lineage/" + asset_suffix
            self.assertTrue((ROOT / asset).is_file(), asset)
            self.assertIn(f"- id: {slug}", legacy)
            self.assertIn("/" + asset, self.read(f"docs/legacy/{slug}.md"))
            catalog = json.loads(self.read(f"catalog/items/{slug}.json"))
            self.assertEqual(catalog["media"]["images"], ["/" + asset])


if __name__ == "__main__":
    unittest.main()
