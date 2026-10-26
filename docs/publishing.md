# Publishing and releases

Canonical repository: https://github.com/Jeonkwan/swiss-atelier-design-system

Live site: https://jeonkwan.github.io/swiss-atelier-design-system/

## GitHub Pages

Pages uses GitHub Actions. The workflow builds `_site/`, validates the runtime and local links, checks generated assets are committed, then uploads only the public allowlist. Public documentation is individually listed; local `docs/research/` remains outside the artifact and is not part of the release commit. PRs validate without deploying. Pushes to `main` publish after successful checks.

For a new fork, enable **Settings → Pages → Source → GitHub Actions** and update canonical URLs in the guides, skill, `llms.txt`, and specimen snippets. Preserve relative links for site navigation so project subpaths continue to work. A first deployment may take several minutes.

## Release a new version

1. Update version references in package metadata, runtime, guides, and pinned examples. Run `npm install --package-lock-only` when changing package metadata.
2. Record changes in `CHANGELOG.md`. Run `npm ci`, `npm run build`, and `npm test`; visually check the specimen and starter.
3. Commit sources and generated `dist/` files, push `main`, and verify the Actions build and Pages deployment.
4. Create a new immutable version tag and push that specific tag. Never rewrite an existing release tag. Verify both the Pages assets and version-pinned jsDelivr URLs return usable CSS/JS.

The live site tracks `main`; tagged CDN assets remain stable. External Google Fonts may still change independently. Fully reproducible offline typography requires separately vendored fonts.

## Optional GCS hosting

The retained `deploy/deploy-gcs.sh` is an alternative to Pages. It configures public bucket access and uploads the already built `_site/` directory; it requires a configured `gcloud` account. Build and inspect `_site/` before invoking it. GCS is not used by the Pages workflow and has not been provisioned for this project.

Reference: [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
