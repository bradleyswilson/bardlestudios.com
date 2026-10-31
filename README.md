# bardlestudios.com

The Bardle Studios website. It's a Jekyll site that GitHub Pages builds automatically, so there's nothing to install.

## Go live (one time)

1. **Create a GitHub repo.** On github.com, click New repository, name it `bardlestudios.com`, make it Public and create it. Click "uploading an existing file", drag in everything from this folder (including the `_layouts`, `_includes`, `_posts`, `assets` and `devlog` folders), then click Commit.
2. **Turn on Pages.** In the repo, go to Settings > Pages. Under Source, choose "Deploy from a branch", pick `main` and `/ (root)`, and click Save.
3. **Point the domain at it (Porkbun).** In Porkbun, open Domain Management, click **DNS** next to bardlestudios.com and delete any default parking records (the ALIAS/CNAME to `pixie.porkbun.com`). Then add:
   - Four `A` records, host blank: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record, host `www`, answer `YOURGITHUBUSERNAME.github.io`
   
   Porkbun's DNS page also has a "Quick DNS Config" dropdown with a **GitHub** option that adds these records for you.
4. **Finish in GitHub.** Back in Settings > Pages, Custom domain should already say `bardlestudios.com` (from the `CNAME` file). When the DNS check passes, which can take a few minutes up to an hour, tick **Enforce HTTPS**.

## Email signup

1. Create a free account at buttondown.com and pick a username.
2. In `_config.yml`, set `buttondown_user: "yourusername"` and commit.

The signup form appears on the home page and under every devlog post. Until then, it shows a "coming soon" line.

## Writing a devlog post

Add a file to `_posts/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
layout: post
title: Your post title
---

Write in Markdown. To add images, put them in assets/ and use:
![Alt text](/assets/my-screenshot.png)
```

Commit it (GitHub's web editor works fine from your phone). The site rebuilds in about a minute. The newest three posts show up on the home page automatically, and RSS readers get them from `/feed.xml`.

## Editing the rest

- Studio and game copy: `index.html`
- Colors and fonts: the top of `assets/site.css`
- The field-line hero animation: `assets/field.js`
