# Content and asset audit

Reviewed: **14 October 2026**. Primary authority: <https://fwegb.gov.pk/>.

## Review method

Official pages and selected PDF contents were retrieved and inspected with the page retrieval tool. Direct outbound requests to this host are restricted in the development sandbox, so a blanket automated HTTP crawler was not used. Browser tests check local assets, in-page anchors, navigation behavior, and the expected source URLs. They do not guarantee future availability of external servers.

## Official page destinations reviewed

All paths below are relative to `https://fwegb.gov.pk/`.

| Area                | Reviewed source paths                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Mandate and history | `/`, `/about-us/`                                                                              |
| About navigation    | `/minister/`, `/secretary/`, `/organogram/`                                                    |
| Departments         | `/forest/`, `/parks-and-widlife/`, `/environment/`                                             |
| Legislation         | `/acts/`, `/rules/`, `/policies/`, `/procedures/`                                              |
| Development         | `/adp/`, `/psdp/`, `/tbttp/`, `/glof-ll/`, `/chilgoza/`                                        |
| Maps                | `/forest-land-use-maps/`, `/national-parks-map/`, `/plantations-nurseries/`, `/wildlife-maps/` |
| Advertisements      | `/tender/`, `/press-release/`, `/career/`                                                      |
| Publications        | `/publications/`, `/reports/`                                                                  |
| Contact             | `/contact-us-2/` (the canonical destination reached from `/contact-us/`)                       |

Dropdowns omit source navigation entries that only point to `#`. The homepage presents Forest, Parks & Wildlife and Environment as **areas of work**, not as a claim that the department has three attached departments. The official About page identifies two attached departments: Forest, Parks & Wildlife and the Environmental Protection Agency.

## Selected updates

- Solar power and surveillance at forest check posts: official homepage publication date **20 April 2026**; the actual advertisement is dated **16 April 2026**, with the bid submission date **4 May 2026**. The card uses the publication date and does not label the tender open. The link goes directly to the verified advertisement PDF rather than an article page that rendered no substantive body in retrieval.
- Forest plant procurement: **24 December 2025**, as published on the homepage and press-release archive. The link is the official article URL. The retrieved article body was sparse, so the redesign does not infer detailed terms.
- Wildlife census/surveys expression of interest: **31 December 2025**, confirmed by the official tender and press-release pages. Detailed eligibility is not invented.
- Spring tree plantation public notice: **13 February 2024**. The official article states that this notice concerns distribution of plants for the 2024 spring plantation drive.
- Jobs: the homepage explicitly says no jobs; `/career/` contains historic 2023 documents. The panel directs people to that archive without claiming an active opening.

News mirrors selected items from the official homepage news feed; some items also appear under their dedicated notice/tender category. The full official archive remains linked from navigation and the updates dialog.

## Verified PDF destinations

Paths are relative to `https://fwegb.gov.pk/wp-content/uploads/`. Each returned substantive PDF content during retrieval.

| Document                                                        | Path                                                                             |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Wetlands & Lakes of Baltistan, 2023                             | `2023/11/Wetlands-of-Baltistan.pdf`                                              |
| Forest Carbon Inventory of Gilgit-Baltistan, 2017               | `2022/01/INVENTORY-REPORT-GILGIT-BALTISTAN-FINAL.pdf`                            |
| Biomass and Carbon Tables for Major Tree Species                | `2022/01/BIOMASS-TABLES-OF-CONIFEROUS-SPECIES-OF-GILGIT-BALTISTAN-Revised-1.pdf` |
| Trophy Hunting Guidelines, English                              | `2021/12/Tropy-Hunting-Guidelines-English.pdf`                                   |
| Environmental assessment filing, review and approval            | `2021/12/Filing_review_and_approval_of_Env_Reports-.pdf`                         |
| Gilgit-Baltistan Forest Act, 2019                               | `2025/03/GB-Forest-Act-2019.pdf`                                                 |
| Northern Areas Wildlife Act, 1975                               | `2022/01/NA-Wildliffe-Act-1975.pdf`                                              |
| Environmental Protection Act, 2014, as listed by the department | `2022/01/Environmental_Act_Final_2014-1.pdf`                                     |
| Solar and surveillance invitation to bid                        | `2026/04/Advertisement.pdf`                                                      |

The environmental act is named according to the official Acts index; its hosted PDF begins with bill wording. The redesign makes no independent legal assertion that this copy is an authenticated gazette. For authoritative legal status, consult the department.

## Source defects not carried over

- `/development-portfolio/` returns a not-found page. Navigation instead exposes the real ADP, PSDP and named project pages.
- The reports page has a malformed biomass **Download** URL and multiple report-title links pointing to unrelated documents. The verified, correctly titled PDF URLs are used instead.
- `2025/12/DOC-20251222-WA0045.-1.pdf` returns a not-found page. That wildlife survey ToR download was removed, not presented as working.
- Retrieval of the Forest Fire Fighting Guidelines PDF failed. It is not offered as a verified download.
- Placeholder rules downloads, source navigation `#` links, an unrelated link at the end of the official About page, and raw Facebook plugin text are omitted.
- The old map embed is replaced by real official map-page links, not a fake interactive map or broken third-party image.
- No current official-holder claims are copied from potentially conflicting older contact pages; leadership information remains accessible through official profile links.

## Local assets and provenance

All displayed image assets are actual downloaded images, not generated logos or hotlinked placeholders. The original marks have not been redrawn.

| Local file              | Provenance                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `government-emblem.png` | Original Gilgit-Baltistan government emblem, retrieved from [Seeklogo](https://seeklogo.com/vector-logo/411519/gilgit-baltistan-government). The official header displays the same government mark at `wp-content/uploads/2021/12/pngwing.com_-268x300.png`. |
| `forest-logo.jpg`       | Original Forest Department mark, official source asset `https://fwegb.gov.pk/wp-content/uploads/2021/12/Forest-Logo-Release_opt.jpg`.                                                                                                                        |
| `fairy-meadows.jpg`     | Fairy Meadows / Nanga Parbat photograph from [Into the Wild Unknown](https://intothewildunknown.com/fairy-meadows-nanga-parbat-guide/), source asset `https://intothewildunknown.com/wp-content/uploads/2025/09/IMG_8245-1024x683.jpg`.                      |
| `markhor.jpg`           | Official [markhor species page](https://fwegb.gov.pk/markhor/), image `https://fwegb.gov.pk/wp-content/uploads/2022/01/Female-markhor.jpg`.                                                                                                                  |
| `deosai.jpg`            | Official national-parks imagery, Sheosar Lake / Deosai. The photograph bears a **Gulan Khan** credit; the original long filename has conflicting attribution, so no unsupported attribution is substituted.                                                  |

Photographic and logo ownership remains with the respective rights holders. Sourcing an image does not itself establish a reuse licence. Confirm publication rights, especially the third-party Fairy Meadows photograph, before a public production launch. The site exposes credits in the footer dialog.

Inter and Manrope are bundled through `@fontsource` packages; font licence files are included in those packages. The production page makes no Google Fonts requests.
