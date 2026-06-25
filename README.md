# 11 - HUMMS (TAÑADA) · SY 2026-2027 Class Website

Built with Next.js (React) so the project has both a **frontend** (pages/
and components/ — all the UI, buttons, animations) and a **backend**
(pages/api/ — the actual logic, like counting), in one repo, ready to
push to GitHub and deploy on Vercel.

## What's already inside

- Home page with a sliding photo hero, quick stats, and an adviser spotlight
- Officers page (9 cards), Students page (23 cards), Gallery page (5 items,
  mixed photos + 1 video)
- A heart/like button whose count is saved on the server (Upstash Redis),
  so it does **not** reset on refresh, and goes up only once per visitor
- Looping background music that starts automatically once the browser
  allows it, pauses automatically while a gallery video is playing, and
  resumes right after
- Basic abuse/spam protection on the API (see "About the security
  features" below — read this part, it explains what this can and can't do)
- Material-style cards (rounded corners, soft border, elevation/shadow),
  fully responsive from desktop down to small phones

Every photo currently shown is an auto-generated placeholder so the site
runs out of the box. Swap them out and edit one data file to make it yours.

## 1. Put in your own content

### Names and section info
Open `data/classData.js`. Everything text-based on the site (your adviser's
name, the 9 officers + their roles, the 23 students, the gallery captions,
school year, motto) is in that one file. Edit the strings, save, done —
no need to touch any other file.

### Photos
Replace the placeholder PNGs with real photos, **keeping the exact same
file names**:

| Who | Folder | File names |
|---|---|---|
| Adviser | `public/adviser/` | `1.png` |
| Officers (9) | `public/officer/` | `1.png` to `9.png` |
| Students (23) | `public/student/` | `1.png` to `23.png` |
| Gallery (5) | `public/assets/` | `1.png`, `2.png`, `3.mp4`, `4.png`, `5.png` |

If you change which gallery slot is a photo vs. a video, also update the
matching `type` and `src` in the `GALLERY` array inside `data/classData.js`.

### Background music
`public/music/bgm-placeholder.mp3` is a short generated tone, not real
music — it's only there so autoplay has something to play while you test.
Replace that file with a track you actually have the rights to use (your
own recording, or something royalty-free), keeping the same file name. If
you rename it, update `BGM_SRC` in `contexts/MusicContext.js` to match.

## 2. Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer installed.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The like button will still work locally
even without a database connected (see below) — it just won't be
permanent yet.

## 3. Make the like counter permanent (Upstash Redis via Vercel)

Vercel itself doesn't host a database directly anymore — you connect one
from the **Vercel Marketplace**, and the easiest, free option for a
single counter like this is **Upstash (Redis)**:

1. Push this project to GitHub and import it on [vercel.com](https://vercel.com).
2. In your Vercel project, go to **Storage → Create Database → Upstash → Redis**.
3. Connect it to this project. Vercel will automatically add two
   environment variables to your project: `KV_REST_API_URL` and
   `KV_REST_API_TOKEN` — that's exactly what `lib/redis.js` reads, so you
   don't need to change any code.
4. Redeploy. The heart count is now stored for real and will keep
   growing as different visitors like the page.

If you skip this step, the site still works, but the like count resets
whenever the server restarts — it's not a real persistent counter yet.

## 4. Push to GitHub and deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com): **Add New Project → Import**
your GitHub repo → Deploy. Vercel detects Next.js automatically, no
extra config needed. Add the Upstash environment variables (step 3
above) either before or after the first deploy — just redeploy
afterward if you add them later.

## 5. About the security features — please read this part

You asked for "Anti-DDoS" and source-code protection, so here's exactly
what was built, and an honest note on what's realistic so you're not
caught off guard later:

**Rate limiting (what's actually included):** `middleware.js` and
`lib/rateLimit.js` block a single visitor/IP from firing an unusually
large number of requests at the `/api/like` endpoint in a short window.
This stops casual spam/abuse of that one endpoint.

**Real DDoS protection** (large-scale, distributed flooding) is handled
at the infrastructure level, by Vercel's network itself, automatically,
for every project hosted there — that part isn't something application
code can fully provide on its own. If you want extra controls later
(custom firewall rules, bot challenges, stricter limits), Vercel's
dashboard has a Firewall/WAF section under your project's Security tab
worth exploring as you grow.

**About "hindi makukuha ang source code":** this is the one request I
have to be upfront about — any website's HTML, CSS, and JavaScript that
runs in a visitor's browser can always be viewed through that browser's
built-in "View Source" / DevTools. This is true for every website on the
internet, not a limitation specific to this build, and no front-end code
can fully prevent it. What you can actually control:
- Keep your **GitHub repository private** if you don't want others
  browsing your source there.
- Next.js already minifies your code in production, which makes it
  harder to casually read (not impossible, just inconvenient).
- Never commit your `.env` file or Redis credentials — `.gitignore`
  already excludes it for you.

## Project structure

```
pages/            -> frontend pages (Home, Officers, Students, Gallery)
pages/api/like.js -> backend logic for the like counter
components/       -> all UI pieces (Navbar, Hero, cards, gallery, etc.)
contexts/         -> background music state shared across the site
data/classData.js -> all your editable names/sections/gallery captions
lib/              -> backend helper functions (Redis client, rate limiter)
public/           -> your photos, video, music, favicon
styles/           -> design tokens and page-level CSS
middleware.js     -> edge-level request throttling
```
