# Hafsa Sadkaoui Portfolio

## Add a project

1. Copy `content/projects/credit-risk-analytics.md` into the same folder and rename it with a short, lowercase project name.
2. Replace the front-matter fields and the description below them. `title`, `category`, and `methods` are required; links and images are optional.
3. For a cover image, place the file in `public/projects/`, then set `image: "/projects/your-image.jpg"` and write useful `imageAlt` text.
4. Push the Markdown file. The site builds a project card from every project file automatically.

## Before publishing publicly

1. Add only confirmed GitHub, demo, technology, and image information to future project files.

## Deploy with Vercel

1. In Vercel, add a new project and import `sadkaouihafsa/hafsa-sadkaoui-portfolio`.
2. Leave the root directory as `./`. Vercel reads `vercel.json` and builds the static site into `dist/client`.
3. Deploy. Future pushes to `main` automatically create production deployments.
4. In Vercel's Domains settings, add `hafsasadkaoui.com` and follow the DNS records Vercel provides for Spaceship.
