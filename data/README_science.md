# TETHER science data assets

These files were generated on 2026-11-14 for the boxwork AOI. The AOI is centred on lat -4.8085, lon 137.3855 and extends ±1600 m, which gives lat -4.8355..-4.7815 and lon 137.3585..137.4125.

Latitude and longitude are planetocentric, east-positive, as in the MSL waypoint file. Elevations are metres relative to the Mars geoid (`elev_geoid`).

## Files

| File | Contents | Count |
|---|---|---|
| `waypoints.json` | All MSL waypoints inside the AOI, sorted by sol. Each entry is `{rmc, site, drive, sol, lat, lon, elev, dist_total_m}`. `dist_total_m` is the odometry since landing and is an extra field. | 257 waypoints, sols 4139–5073, one per sol, all `drive_type: final` |
| `rover_images.json` | 60 waypoints, thinned evenly by index from the 257 (there is one waypoint per sol, so this is roughly even by sol). Each has up to 3 Navcam (NAV_LEFT_B) frames and, where one was found, 1 Mastcam colour frame. The output shape is `{rmc, sol, image_sol, images:[{url, instrument, sol, mast_az, mast_el, lmst, date_taken_utc, sample_type, credit, match, color?}]}`. | 60 waypoints, 180 Navcam frames, 15 Mastcam colour frames. Every waypoint has Navcam images. |
| `science_targets.json` | 9 named, scientifically interesting places from the Curiosity mission blog. Each has a description, a reason for an astronaut to visit, sol, sol range, waypoint, lat/lon/elev and source URLs. A `boxwork_context` blurb is included. | 9 targets |
| `weather.json` | REMS weather. It holds the latest 60 sols from the feed and two seasonal summaries across all Mars years. `summary_current_ls_band` is centred on the estimated Ls at rover sol 5073 (Ls ≈ 20, early southern autumn, read from the feed row one Mars year earlier, sol 4404). `summary_latest_feed_ls_band` is centred on the latest feed Ls (341). Missing values are `null`. | 60 sols. Current band Ls 5–35 has 428 sols; feed band Ls 326–356 has 403 sols. |
| `space_weather.json` | DONKI SEP events for 2024-05-01..2024-06-15 and 2026-09-15..2026-11-14. It also includes a May-2024 event summary and a RAD dose reference block with citations. | 27 SEP entries (all 2024) |
| `credits.json` | Every source, with provider, URL and licence or usage note. | 9 sources |

`elev.bin` and `ortho.jpg` in this folder were produced separately by the terrain pipeline and are not covered here.

## Science targets (sol → rover waypoint)

| Target | Sol | Waypoint |
|---|---|---|
| Mammoth Lakes drill (Gediz Vallis channel) | 4219 | 107_2496 |
| Kings Canyon drill | 4257 | 108_792 |
| Altadena: 43rd drill, edge of boxwork | 4566 | 116_1944 |
| Monte Grande hollow and "Valle de la Luna": 44th drill, hollow | 4690 | 119_1722 |
| Nevado Sajama: 45th drill, ridge top (sols 4711–4742); Nevado Sajama 2 / TMAH a few cm away (sols 4789–4811, waypoint 120_574) | 4716 | 120_82 |
| Antofagasta crater (~10 m, possibly young; rim stop) | 4865 | 121_2826 |
| Campo Marte: 47th drill, after the "Atacama" block lift-off (Atacama workspace = 122_0) | 4900 | 122_462 |
| Basque Lakes: 48th drill | 5024 | 125_558 |
| Nazca: 49th drill, crystal-shaped lumps | 5052 | 125_1326 |

## Caveats

- **Target coordinates are rover parking spots.** Each one is the waypoint with the greatest sol ≤ the target sol, not the exact rock. Drill targets are usually within about 1–3 m of it.
- **Waypoint sols can be one sol off.** A waypoint's sol can be one earlier than the arrival sol given in the blog. For example, the blog says Kings Canyon was reached on sol 4257, but the waypoint is sol 4255. Antofagasta was pinned to the stop after the weekend drive that the sols 4859–4866 post says would reach the rim (121_2826, sol 4865). The next stop, 122_0 (sol 4868), is the sol 4870 Atacama workspace, about 50 m away.
- **Where target names come from.** Every name, drill number and fact was found by text search in the fetched blog post text; none came from memory. Kid-friendly wording paraphrases those posts.
- **Image matching.** Navcam frames are matched on site and drive, taken from the API fields or from the `_F<site3><drive4>NCAM` part of the filename. They are taken from the arrival sol, with a fallback to sol+1, which was never needed. Thumbnails are excluded.
- **Horizon views are limited.** The selection prefers small |mast_el| and azimuths at least 60° apart. Only 43 of the 180 Navcam frames have |mast_el| ≤ 10°, because post-drive Navcam imaging is often aimed at the ground.
- **Request header.** The first image-fetch run sent a User-Agent naming the project; later runs used a generic one.
- **`mast_az` frame.** It is reported as given by the API and appears to be in the rover frame (it matches `camera_vector`), not compass azimuth. It has not been converted.
- **Mastcam matching is by time, not position.** Mastcam items carry no site, drive, mast_az or mast_el, so they are matched by sol plus `date_taken` at or after the first Navcam frame at that site/drive (`match` field). They are probably, but not certainly, from that position.
- **Few Mastcam colour frames.** Only `E01`/`E02` products are demosaiced colour. `C00` products are single-channel raw Bayer frames and were excluded. Within the ~200-call budget, colour frames were found for only 15 of 60 waypoints. One pick was checked by eye and shows terrain; picks are not otherwise curated, so some may show the workspace or hardware.
- **The weather feed lags.** Its latest sol is 4995 (2026-08-25), while traverse data runs to sol 5073. That is why the current-season band uses an estimated Ls.
- **Weather quality.** The data is outreach-grade, per the CAB disclaimer. A few band values look like outliers, such as min −100 °C and max −54 °C.
- **DONKI is Earth-centric.** SEPs are detected near Earth or by STEREO-A, not at Mars. DONKI has no SEP entry dated 2024-05-20, the day of the X12 flare (estimated from Solar Orbiter data) whose particles RAD measured at 8.1 mGy. Do not label the listed May 2024 DONKI entries as "the Curiosity event".
- **Recent SEP window is empty.** The 2026-09-15..2026-11-14 query returned `[]` with HTTP 200.
- **No flare data.** The FLR endpoint returned HTTP 404 twice, and the direct CCMC endpoint was unreachable.
- **RAD numbers and how they were checked:**
  - **8.1 mGy (May 2024).** Verified in the fetched NASA article text.
  - **0.64 mSv/day.** Verified in fetched CSMonitor text reporting Hassler et al. 2014.
  - **0.21 ± 0.04 mGy/day and ± 0.12 mSv/day.** Confirmed only through search-indexed text of the paper and an SWSC 2016 table citing it. science.org and swsc-journal.org returned 403 to scripts, and the PubMed abstract has no numbers.
  - **~220 µGy/day corroboration.** A fetched RAD-team preprint (Guo et al. 2015, arXiv:1507.03473) gives a surface dose rate of "around 220 µGy/day", which supports the 0.21 mGy/day figure.
