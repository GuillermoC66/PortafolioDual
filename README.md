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

## Browser compatibility

The JavaScript build targets ES2020. Tailwind CSS 4 requires modern CSS support;
the supported minimums are Chrome/Edge 111, Firefox 128, and Safari 16.4. Keep
browsers updated to receive the intended layout and styles. The page also
continues to render if browser privacy settings block local storage.
