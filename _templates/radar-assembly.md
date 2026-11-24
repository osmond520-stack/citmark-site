# Radar publish prep — path scheme, canonical, sitemap, assembly field table

Status: PREP ONLY (2026-11-24). Nothing in this prep is published. The publish
action itself is the owner's hand, taken together with first-run data assembly.
Base: `_templates/` three files (leaderboard 0feb6918 / open-questions ab5480c7 /
brand 98e953d6), 定格 `1c6654fd` (H1 line-height 1.04 as filled in by TD).
Run form: SETTLED — grounded (boss, 2026-11-24). Dual-form markers in the base
templates are converted to grounded single-form in this prep.

## 1. Formal paths (scheme)

Namespace: `/ai-visibility-leaderboard/{category-slug}/`

| Page type | Publish destination | Prep file |
|---|---|---|
| Category leaderboard | `/ai-visibility-leaderboard/{category-slug}/index.html` | `_templates/publish/leaderboard.html` |
| Open-questions report | `/ai-visibility-leaderboard/{category-slug}/open-questions/index.html` | `_templates/publish/open-questions.html` |
| Brand page (×N per run) | `/ai-visibility-leaderboard/{category-slug}/{brand-slug}/index.html` | `_templates/publish/brand.html` (instantiated per brand at assembly) |

First category (⑥ cross-border / export consumer brands): working slug
`cross-border-consumer-brands`; display string comes from the 定格 {品类} token
at assembly. Rationale: one namespace keeps the trio a single crawl cluster and
mirrors the /compare/ hub-and-spoke shape; brand pages nest under their board
because the board is the claim unit and the brand page's eyebrow links back to
it. A flat `/brands/{brand}/` scheme was considered and not taken for the prep:
it severs the board context the pages are designed around.

The prep files stay under `_templates/publish/` (Jekyll-unserved) so the prep
branch carries zero servable new pages even if merged early. At publish, the
files move to the destinations above (brand file instantiated per brand slug).

## 2. Canonical

Each page self-canonicals to its formal URL (already set in the prep files):
- leaderboard: `https://citmark.com/ai-visibility-leaderboard/cross-border-consumer-brands/`
- open-questions: `…/cross-border-consumer-brands/open-questions/`
- brand: `…/cross-border-consumer-brands/{brand-slug}/` (token resolved per brand)

Internal links in prep are relative and resolve under the scheme:
leaderboard brand cells → `{brand-slug}/`; leaderboard closing cross-link →
`open-questions/`; open-questions closing cross-link → `../`; brand eyebrow →
`../`. Claim links stay `#` in prep — the claim flow route is fixed at publish
time, not in this prep.

## 3. Sitemap

At publish, append `radar-sitemap-fragment.xml` (this prep) to sitemap.xml:
the two category-level URLs. One `<url>` per brand page is generated at
assembly from the brand register (82 brands, register fingerprint 55410c92) —
never hand-listed in prep.

## 4. Assembly field table (placeholder → data field → source)

Sources: RUN = first-run record (grounded form); REG = brand register
(82 brands, 55410c92); SPEC = 定格 1c6654fd constant/wording.

### Leaderboard
| Token | Field | Source |
|---|---|---|
| 〈Category〉 / 〈category〉 | category display name / slug | SPEC + §1 scheme |
| 〈One sentence: what this board measures…〉 | board lede | SPEC wording at assembly |
| 〈run date〉 | run date of the grounded run | RUN |
| 〈n〉 (as-of line) | question-set size | RUN |
| 〈engine set〉 | engines measured (grounded) | RUN |
| 〈rank〉 | rank by mention rate (n ≥ 30 rows only ranked) | RUN |
| 〈Brand name〉 / 〈domain〉 | brand display name / primary domain | REG |
| 〈mention %〉 + 〈Wilson 95% CI〉 | mention rate + Wilson interval | RUN |
| 〈citation %〉 | citation rate | RUN |
| 〈n〉 (row) | valid answers behind the row | RUN |
| 〈raw count only〉 + 〈n < 30〉 | insufficient-sample row: raw counts, no rates | RUN |
| 〈x brands〉 | aggregate zero-mention count (names never listed) | RUN |
| 〈Measurement-limitation sentence…〉 | limitation sentence, grounded wording | SPEC/RUN |
| Method note el. 1–2 | question-set + scoring declarations | RUN |
| Method note el. 3 | grounded run-form marker (converted in prep) | RUN |
| Method note el. 4 | sample-size / CI rule | SPEC |
| Claim line | verbatim, route fixed at publish | SPEC |

### Open questions
| Token | Field | Source |
|---|---|---|
| 〈buyer question, verbatim〉 | question text as buyers wrote it | RUN |
| 〈per-brand mention marks〉 | per-question brand mention marks | RUN |
| Type A X% | **RED — first-run distribution + product sign-off; n ≥ 30 floor is settled** | pending |
| Type B | strict zero across target group (settled) | RUN |
| 〈one of: media review / list aggregator / brand site / e-commerce platform / social / forum Q&A / other〉 | citation-source type (7-type taxonomy; flagship store on a marketplace = e-commerce platform; brand's own domain = brand site) | RUN/SPEC |
| 〈domain〉 / 〈count · share〉 / 〈total〉 | cited domain, its count and share, section total | RUN |
| 〈wording as buyers wrote it〉 | naming-variant wording | RUN |
| 〈x〉 | count of brands using a variant | RUN |

### Brand page
| Token | Field | Source |
|---|---|---|
| 〈Brand name〉 / 〈brand domain〉 | brand display name / domain | REG |
| 〈x%〉 + 〈CI〉 | overall mention rate + Wilson interval | RUN |
| 〈Engine〉 / 〈mention %〉 / 〈citation %〉 / 〈n〉 | per-engine rows | RUN |
| Per-question detail | entry form fixed at assembly (rows or sub-page) | RUN |
| Run-history chart | ALL rounds kept; placeholder until round 2 exists | RUN |
| Update frequency | **RED — cadence only; run form settled grounded** | pending |
| Method note el. 3 | grounded run-form marker (converted in prep) | RUN |

Shell note: prep files' shell-v2 blocks are aligned to live, including the
PR #44 footer band rule (≤860px two-column footer).
