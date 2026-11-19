# OurSpace

A closed, invite-only social network for a small circle: David, his close
friends, his family, and the few people they let in. At most about 50
people, ever. No public anything, no groups, no classifieds, no ads, no
algorithm. Just profiles, a shared feed, and each other.

Every member gets a profile built from ONE standard template, modeled
box for box on the classic MySpace profile (2005 to 2008): photo block
with headline and mood, Contacting box, Interests and Details tables,
blurbs, photo gallery, featured video, a profile song, Top Friends, and
a comments wall. Personalization is a theme layer over those same
boxes: colors, fonts, background, motifs, and a song. Nobody starts
from a blank page.

Live form: a static site, meant to sit at the root of a GitHub Pages
repo. Demo build: David and his friends are stress testing it to decide
what the real version needs.

## What is in here

- `index.html` - everything: markup, CSS (base classic theme plus the
  member themes), and all the JavaScript. One file on purpose, so the
  demo is easy to tweak and re-deploy.
- `music/` - three placeholder profile song loops, synthesized with
  ffmpeg: `david-loop.mp3` (Mexican hip hop slot), `glenn-loop.mp3`
  (old school disco slot), `susan-loop.mp3` (pop slot). They prove the
  player plumbing and get replaced with real tracks later.

## Demo invite code

`ourspace2026`

It is printed on the gate screen on purpose, same pattern as the family
demo password. The gate is a friendly door for the demo, not security.
The real version gets real member accounts and server-side auth.

## How it works

- Pure static files. No build step, no server, no database. Open
  `index.html` or serve the folder and it runs.
- The gate asks for the invite code, then the app opens on the Feed.
- Feed (home): every member's posts, newest first, with author and
  time. Post types: text, photo (image link, or an upload that gets
  shrunk in the browser and stored as a data URI), video (YouTube link
  or a direct .mp4 link, embedded), and poll (question plus 2 to 4
  options, members vote, live result bars, vote can be changed). Every
  post takes comments.
- Act as: a switcher in the top bar lets you post, comment and vote as
  any member. That is the stress test tool: be David, be Glenn, be
  Susan, see what breaks.
- Profiles: click any name or avatar. The profile song tries to start
  when a profile opens; if the browser blocks autoplay, the song box
  shows a Play button and a note. Pause control lives in the song box.
- Members page: the whole circle, plus Open Seat cards. An open seat
  opens the standard template with starter text, so a new member can
  see exactly what they start from before they make it theirs.
- Edit my page: when you are acting as the member whose profile you are
  viewing, an edit panel appears (headline, mood, mood face, About me,
  Who I'd like to meet). Edits persist.
- Persistence: everything lives in localStorage under the versioned
  key `ourspace.v2.state`, seeded on first run (seed timestamps are
  relative, so the demo always looks fresh). "Reset demo data" in the
  top bar wipes this browser back to the seeds.

## Members and themes (seeded)

- David: Matrix theme. Black background, neon green and bright orange,
  mono and display fonts. Song slot labeled Mexican hip hop.
- Glenn: Harley theme. Black and chrome, bright orange, sugar skull
  motif in the section bars. Song slot labeled old school disco.
- Susan: Glitter theme. Pastel pink and lavender, sparkle motif in the
  section bars, friendly rounded type. Song slot labeled pop.
- Three Open Seats on the classic default theme, waiting for people.

## How to add a member

1. Add an entry to the `MEMBERS` array near the top of the script in
   `index.html`: id, name, theme class, avatar color, headline, mood,
   basics lines, interests, details, about, meet, gallery image links,
   a featured video (or null), and a song ({file, title, label}) or
   null. Copy an existing member and change the words.
2. Drop their song file in `music/` and point `song.file` at it.
3. Optionally seed their wall in `seedState()` under `walls`.
4. Note: existing browsers keep their saved state, so a new member
   shows up for them after a Reset demo data. Fresh visitors get the
   new seeds right away.

## How to add a theme

1. Add a `.theme-yourname` block in the CSS next to the other themes
   and set the same variables: page and content backgrounds, section
   bar colors, table label and cell colors, border, link, accent,
   text, muted, button background, body font, name font, avatar color.
2. Optional: a motif line like the existing ones (a character appended
   to section bars), for example `.theme-yourname .bar::after`.
3. Set the member's `theme` field to `theme-yourname`.
   The boxes never change. Only the layer does. That is the rule.

## Layout accuracy notes

The base template follows the era's own stylesheet values, dug up from
archived copies of myspace.css and profile.css and from faithful
recreations of Tom's profile: Verdana at 8pt base size, 800px page,
page background #e5e5e5, section header bars #b1d0f0 with dark blue
text, Interests and Details label cells #b1d0f0 (label text #336699),
value cells #d5e8fb, blurb heads ("About me:", "Who I'd like to
meet:") in #ff6600 bold, buttons in #d5e8fb with a groove border, the
pipe separated nav, and the extended network banner (rewritten here as
"in your circle", because this network is closed).

## Known limits

- localStorage is per browser, so the demo is one-device for now:
  posts made on David's phone do not appear on Glenn's phone. A shared
  backend (real accounts, a real database, real photo storage) is the
  later version's job, once the stress test settles what we actually
  need.
- Storage will fill up eventually, photos first. David knows and is
  dealing with it later, on purpose.
- The invite gate and the act-as switcher are demo tools, not
  security. Anyone with the demo link and the printed code can act as
  anyone. Fine for a stress test among friends, not fine for launch.
- Seeded photos are placeholder images from picsum.photos, and seeded
  videos are a public sample clip and a well known YouTube video. Real
  member media replaces them.
- Profile photos are initial blocks for now, same as v1.

## Decisions log

- 2026-11-18: v1 shipped as "davidspace", one profile page for David
  in the classic style, with a Top 8 and a comments wall. David's
  verdict: pretty cool, but rough, and not what MySpace actually
  looked like. He also reframed the whole idea: not a tribute page,
  a closed social network for his people.
- 2026-11-18: Renamed to OurSpace (David's pick: "it is OUR space").
  The name is product-wide: title, gate, header, URL lines.
- 2026-11-18: v2 rebuilt around the accurate layout system (values
  above) and the template rule: one standard profile template for
  everyone, personalization as a theme layer only. David's Matrix
  page, Glenn's Harley page and Susan's glitter page are the proof.
- 2026-11-18: Dropped from v1's framing: public network language,
  groups and classifieds dressing, the single-profile focus. Added:
  the shared feed, polls, photo upload, member switching (Act as),
  per-member themes, and the Open Seat template preview.
- 2026-11-18: Kept from v1 and the family demo: data as plain arrays,
  string-built rendering, the demo gate with the code printed on it,
  localStorage persistence (now one versioned state key instead of
  three separate keys).
- 2026-11-18 (deployment note): GitHub Pages serves this from the repo root. The push tooling moves text files only, so in the deployed copy the three placeholder songs are inlined into index.html as data URIs; the music/ folder in the source workspace remains the canonical audio for a future host.
- 2026-11-18: v3 adds the Themes button and the code boxes, at David's
  order, informed by the MySpace revival scene (SpaceHey, Neocities):
  a one-tap theme gallery in the profile editor (Classic, Matrix,
  Harley, Glitter, Celestial for planets and moons, Ocean Life,
  Flowers, Birds and Sky, Vapor Sunset, Retro PC, Baja Desert,
  Midnight), plus per-member Custom CSS, a Custom HTML section box,
  and a Custom JavaScript box, the old MySpace paste-in code model
  cleaned up. Themes and code live in the member's saved edits, so a
  theme picked once sticks. Custom code runs only in this browser
  demo; a hosted version would sanitize it the way SpaceHey does.
- 2026-11-18: v4 is the space reskin, at David's order ("make it
  beautiful, make it sexy, start with the outer space thing"): the
  whole site shell now lives in deep space. A generated galaxy vista
  (spiral galaxy, ringed planet, two moons, nebula clouds) sits fixed
  behind everything; the invite gate is one big frosted glass tile
  floating in it; header, nav and the feed/members chrome are dark
  glass with rounded edges, glass buttons and sci fi type (Orbitron
  display, Space Grotesk body). The MySpace layout system and all v3
  features stay underneath, and member profiles keep their own
  themes: the space shell is the site's skin, not theirs.
- 2026-11-18: v5 is the modernization pass, at David's order after
  he looked at the real MySpace on the Wayback Machine and called
  it ghetto and ugly (his words): keep the functionality and the
  customizability, lose the 2005 chrome. Big clean glass cards with
  soft shadows, section bars as quiet uppercase headers, info
  tables as clean rows with soft dividers instead of painted
  cells, larger type and tap targets everywhere, and parallax:
  two star layers plus the vista itself drift at different rates
  over the scroll. The word David was reaching for is intuitive.
