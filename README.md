# Dual Portfolio

This portfolio reflects the two sides of my creative practice: artist and engineer. It brings together the ways I imagine, make, and build, showing how art and technology shape one another.

## The Artist

Explore my visual work, including watercolor paintings, fan art, and animations.

## The Engineer

Discover my engineering projects, from video game development to web development.

## GitHub Pages

This repository is configured for the GitHub Pages project site at
`https://guillermoc66.github.io/PortafolioDual/`. The workflow in
`.github/workflows/deploy.yml` builds and deploys the site whenever changes are
pushed to `main`. In the repository settings, set **Pages → Build and
deployment → Source** to **GitHub Actions**. Vite includes the repository path
in the asset URLs so the app loads correctly under the project URL.

Do not select **Deploy from a branch**: that publishes the unbuilt source
`index.html` instead of the Vite output and leaves the page blank. After
switching the source to GitHub Actions, push to `main` and verify the latest
**Deploy to GitHub Pages** workflow succeeds. The published HTML should load
JavaScript and CSS from `/PortafolioDual/assets/`, not `/src/main.tsx`.

## Supabase guestbook

The guestbook uses the public `guestbook_messages` table. To set it up:

1. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY` for your Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor
   to create the table and its row-level security policies.
3. For GitHub Pages deployments, create the **github-pages** environment under
   **Settings → Environments** and add environment secrets named
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` with the same values.
   The workflow reads them during the build; `.env` is intentionally not committed.

If the production guestbook says its Supabase URL or publishable key is missing,
one or both `github-pages` environment secrets were not available to the build.
Add them under **Settings → Environments → github-pages → Environment secrets**,
then rerun the **Deploy to GitHub Pages** workflow. The guestbook's
missing-configuration message refers to these build-time values; a missing
database table causes a separate load error. The workflow checks both values
and fails before publishing if either is absent.

The schema allows anyone to read and post short public guestbook messages. It
does not permit public edits or deletes. Because posting is unauthenticated,
add CAPTCHA or server-side rate limiting if spam becomes an issue. The
publishable key is intended for browser use; never use a Supabase secret or
service-role key in the client.

## Browser compatibility

The JavaScript build targets ES2020. Tailwind CSS 4 requires modern CSS support;
the supported minimums are Chrome/Edge 111, Firefox 128, and Safari 16.4. Keep
browsers updated to receive the intended layout and styles. The page also
continues to render if browser privacy settings block local storage.
