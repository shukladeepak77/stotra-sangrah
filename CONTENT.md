# Where the content comes from

This is a category-page site: `src/content/stotras.ts` is a hand-written
TypeScript file holding all stotras, grouped into categories (no build-time
content-generation script, unlike the sibling Bhagwad Gita / Ashtavakra
Gita sites).

Verse text only — no meaning/translation. Sourced from stotranidhi.com's
Devanagari (Sanskrit) edition, restricted to stotras with no attached
copyrighted commentary: ancient/traditional compositions (attributed to
Adi Shankaracharya, Pushpadanta, Ravana, Ramayana/Puranic verses, etc.),
all public-domain devotional text. The category taxonomy (गणेश, शिव, विष्णु,
राम, कृष्ण, देवी, सूर्य/नवग्रह, गुरु, हनुमान) is this site's own, not copied
from stotranidhi's structure.

## Adding a new stotra

1. Add a new entry to the relevant category's `stotras` array in
   `src/content/stotras.ts` (`slug`, `title`, optional `subtitle`, `verses`,
   optional `colophon`).
2. To add a new category, add an entry to `stotraCategories` — the home
   page (`src/app/page.tsx`) and category page (`src/app/[category]/page.tsx`)
   both read from that array automatically.

## Audio

Not included, matching the rest of this family of sites.
