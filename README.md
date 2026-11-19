# davidspace

David's personal MySpace, rebuilt by hand in the classic 2005-2008 style.
One profile page for David and his close friends, scattered across Mexico,
the United States and Europe. No ads, no algorithm, no strangers. Just us.

Live form: a static site, meant to sit at the root of a GitHub Pages repo.

## What is in here

- `index.html` - the profile page structure (classic two-column layout).
- `style.css` - the classic theme: dark blue top bar, light blue section
  bars, orange blurb heads, interests and details tables, tiny Verdana.
- `app.js` - all data and plumbing: friends list, profile defaults, seed
  comments and bulletins, localStorage persistence, the owner gate.

## How it works

- Pure static files. No build step, no server, no database. Open
  `index.html` or serve the folder and it runs.
- The layout follows the classic profile: left column has the photo,
  headline, mood, contact box, interests and details tables. Right column
  has the extended network banner, the blurbs (About me, Who I'd like to
  meet), bulletins, the Friend Space with the Top 8, and the comments wall.
- Comments and bulletins are stored in the visitor's browser
  (localStorage keys `davidspace.comments`, `davidspace.bulletins`).
  First visit seeds them with samples from Miles and Caleb. Anything a
  visitor posts lives only in that browser. That is fine for v1; a real
  shared wall needs a backend, which is a later version's problem.
- Headline, mood and blurbs are editable in the page and saved to
  localStorage (`davidspace.profile`).

## Owner mode

- Scroll to the bottom bar and unlock with the owner password.
  Demo password: `davidspace2026`.
- This is a client-side demo gate, the same pattern as the Moreno family
  demo. It keeps casual visitors from editing, nothing more. Production
  would use real accounts and server-side auth.
- Owner mode unlocks: Edit Profile (headline, mood, mood face, both
  blurbs), posting bulletins, and deleting comments or bulletins.

## How to edit things in code

- Friends: edit the `FRIENDS` array at the top of `app.js`. Each friend
  has a name, location, avatar color, a `top` flag for the Top 8, and a
  short note for the full friends list. Entries with
  `placeholder: true` render as open seats.
- Profile defaults (headline, mood, blurbs): `DEFAULT_PROFILE` in
  `app.js`. Note: anyone who already visited keeps their localStorage
  copy, so code changes show for new visitors.
- Interests and details tables: plain HTML in `index.html`.
- Seed comments and bulletins: `seedComments()` and `seedBulletins()` in
  `app.js`. Same localStorage caveat as above.
- To wipe your own browser back to the seeds, clear localStorage for the
  site (browser dev tools, Application, Local Storage, delete the
  `davidspace.*` keys).

## Placeholders in v1

- Miles and Caleb are real. Tom is the traditional first friend. The
  other five Top 8 slots are open seats waiting for real friends.
- The profile photo is a styled initial block, not a real photo.
- Nav links, contact box actions and "View My: Pics | Videos" are
  decorative for now; a few jump to the comments or friends sections.
- Comments are per-browser, not shared between visitors yet.

## Decisions log

- 2026-11-18: Built v1 as one static page after researching classic
  MySpace profiles (two columns, 13 standard components, Top 8, comment
  wall, bulletins that went out to all friends). Chose the default blue
  and white theme over a glitter layout: era-accurate, but clean and
  readable on a phone.
- 2026-11-18: Reused the family demo's plumbing patterns: data as plain
  JS arrays, string-built rendering, and the client-side demo password
  gate, here used as an owner-only edit lock instead of a full login.
- 2026-11-18: Added localStorage persistence (the family demo kept posts
  in memory only) so comments, bulletins and profile edits survive a
  refresh. Kept everything in three files plus this README, on purpose.
