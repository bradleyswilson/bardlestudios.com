# bardlestudios.com

Source for [bardlestudios.com](https://bardlestudios.com), the website of Bardle Studios, a small independent game studio in Little Rock, Arkansas.

It's a Jekyll site hosted on GitHub Pages. Every push to `main` rebuilds and deploys it automatically, usually within a minute.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home page: studio and game copy |
| `_posts/` | Devlog posts |
| `devlog/` | Devlog index page |
| `_layouts/`, `_includes/` | Page templates and shared partials |
| `assets/site.css` | Styles; colors and fonts are at the top |
| `_config.yml` | Site settings |

## Writing a devlog post

Add a file to `_posts/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
layout: post
title: Your post title
---

Write in Markdown. Images go in assets/:
![Alt text](/assets/my-screenshot.png)
```

The newest three posts appear on the home page, and the full list is at `/devlog/`. An RSS feed is generated at `/feed.xml`.

## Email signup

The signup form is an [EmailOctopus](https://emailoctopus.com) inline form. Its ID (the `data-form` value from the embed code) is set as `emailoctopus_form` in `_config.yml`. Change the form's fields and messages in EmailOctopus; the site picks them up automatically. The site's CSS (`assets/site.css`, "EmailOctopus embed") restyles it to match, and hides the form's own title and description. If `emailoctopus_form` is blank, the site shows a "coming soon" line instead.

## Running locally

```sh
gem install bundler jekyll jekyll-feed
jekyll serve
```

Then open http://localhost:4000.
