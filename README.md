# Mahin's Digital Notebook

A personal knowledge base built with **Jekyll + Markdown** on **GitHub Pages**. No external services, no build step on your machine: push to `main` and GitHub builds the site.

Sections: **Blog, Notes, Coding, Journal, Projects, Learning** (plus Tags and Search).

## Folder map

```
_config.yml            site title, sections (collections), defaults
_data/sections.yml     names, icons, order of sections (nav + homepage)
_blog/ _notes/ _coding/ _journal/ _projects/ _learning/   <- YOUR CONTENT (Markdown)
blog/ notes/ ... index.md   one tiny listing page per section
_layouts/  _includes/       reusable HTML templates (design)
assets/css/  assets/js/     styling and scripts
assets/images/<section>/    images and screenshots
```

Content lives in the `_<section>/` folders. Design lives in `_layouts/`, `_includes/` and `assets/css/`. You should rarely need to touch the design.

## Add a new note / blog post / journal entry

1. Create a file in the right folder, e.g. `_notes/docker-basics.md` (use lowercase words and dashes; the file name becomes the URL: `/notes/docker-basics/`).
2. Put this at the top, then write Markdown below it:

```markdown
---
title: Docker basics
date: 2026-10-01
tags: [docker, devops]
summary: Optional one-line description shown on cards.
---

## First heading

Your content here.
```

3. Commit and push. The page appears in its section, on the homepage (Recently added), on the Tags page and in Search.

Only `title` is required. `date` controls ordering (newest first). `tags` and `summary` are optional. A blog post is exactly the same, just in `_blog/`. See `_blog/2026-09-30-welcome.md` for an example that uses every Markdown feature.

## Add an image or screenshot

1. Save the file in `assets/images/<section>/`, e.g. `assets/images/notes/docker-ps.png`.
2. Reference it from any Markdown file with an absolute path:

```markdown
![docker ps output](/assets/images/notes/docker-ps.png)
```

Tips: keep file names lowercase with no spaces; prefer PNG for screenshots and JPG/WebP for photos; keep files reasonably small (under ~500 KB).

## Code, tables, videos

- **Code:** use fenced blocks with a language name (` ```python `, ` ```bash `, ` ```js `...) for syntax highlighting.
- **Tables / lists / links / quotes:** standard Markdown.
- **Video:** YouTube etc. can be embedded with raw HTML. Wrap the iframe in `<div class="embed">` so it is responsive (see the welcome post). For a local video, put the file in `assets/` and use `<video controls src="/assets/videos/clip.mp4"></video>`.
- **Table of contents:** put `* TOC` then `{:toc}` on separate lines (kramdown syntax) where you want one.

## Add a new section

Example: a section called **Recipes**. Four small steps, no HTML or CSS:

1. In `_config.yml`, add a line under `collections:`
   ```yaml
   recipes:  { output: true, permalink: /recipes/:path/ }
   ```
   and a line under `defaults:`
   ```yaml
   - { scope: { path: "", type: recipes }, values: { layout: entry } }
   ```
2. In `_data/sections.yml`, add
   ```yaml
   - id: recipes
     title: Recipes
     icon: "🍳"
     description: Things I cook.
   ```
3. Create the listing page `recipes/index.md`:
   ```yaml
   ---
   layout: section
   title: Recipes
   collection: recipes
   permalink: /recipes/
   ---
   ```
4. Create the content folder `_recipes/` and add Markdown files to it (optionally `assets/images/recipes/`).

The navigation bar, homepage card, tags and search pick it up automatically.

## Writing in Bangla + English

Just write Bangla and English mixed in the same file, in headings, lists, tables, tags and even `title:`. Save files as **UTF-8** (the default in VS Code).

```markdown
---
title: "আজকের নোট: Docker basics"
tags: [docker, বাংলা]
---

## কন্টেইনার কী?

Container হলো একটি lightweight environment, যেটা app চালাতে সাহায্য করে।
```

- Fonts: the site uses the Bangla fonts already on the reader's device (Nirmala UI, Noto Sans Bengali, Kohinoor/Bangla Sangam), so there is nothing to download. Line spacing is set generous for Bangla.
- **File names:** keep them in English/ASCII (`_notes/docker-basics.md`), because the file name becomes the URL. Put the Bangla in `title:`.
- Bangla titles containing a colon must be quoted, as above.
- Search and tags work with Bangla text too.

## Tags and search

- Tags come from `tags: [a, b]` in front matter. Each tag links to the **Tags** page.
- **Search** (`/search/`) filters titles, tags and content in the browser using a generated `search.json`. Nothing external is involved.

## Dark / light mode

Follows the system setting by default; the 🌓 button in the header overrides it and remembers the choice. Colours are the CSS variables at the top of `assets/css/main.css`. Change `--accent` to re-theme the whole site.

## Changing the site name, tagline

Edit `title` and `tagline` in `_config.yml`. (`index.md` also has the homepage title.)

## Deploying on GitHub Pages

Repo settings, then **Pages**, then deploy from branch `main` / root. The repo is named `sazidmahin.github.io`, so the site is at <https://sazidmahin.github.io>. GitHub builds Jekyll automatically. Only GitHub-Pages-supported features are used.

## Optional: preview locally

Needs Ruby. Then:

```bash
bundle install
bundle exec jekyll serve
```

and open <http://localhost:4000>. If you skip this, just push and check the live site.

## Troubleshooting

- **Page doesn't show up:** the file must be inside a `_<section>/` folder, end in `.md`, and start with the `---` front matter block.
- **Front matter error / build failed:** check the Actions tab on GitHub; usually a missing `---` or a `title:` containing a colon (wrap it in quotes: `title: "Note: Docker"`).
- **Image missing:** the path must start with `/assets/images/` and match the file name exactly (case-sensitive).
- **Drafts:** anything inside a `_<section>/` folder is published. To keep a draft private, store it in a `_drafts_local/` folder and add that folder to `exclude:` in `_config.yml`, or don't commit it yet.
