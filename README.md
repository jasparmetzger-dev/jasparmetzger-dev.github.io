# jasparmetzger-dev.github.io

Personal website — plain HTML/CSS/JS, no build step, served by GitHub Pages.

## Editing content

**Everything lives in [`content.js`](content.js).** You never need to touch the HTML.

| I want to…                     | Do this in `content.js`                                              |
| ------------------------------ | -------------------------------------------------------------------- |
| Showcase a new repository      | Copy an object in `projects`, change `name`, `description`, `tags`, `repo`. Set `featured: true` to make it the wide card on top. |
| Add a job / programme / award  | Add an entry at the **top** of the matching section in `sections`.   |
| Add a second role at one place | Add another object to that entry's `roles` (newest first).           |
| Add a whole new section        | Add `{ id: "awards", title: "Awards", entries: [...] }` to `sections` — it appears in the nav automatically. |
| Link a CV PDF                  | Drop the PDF in the repo and set `cv: "cv.pdf"`.                     |

### GitHub repos appear automatically

Under the project cards, a **More on GitHub** list is loaded live from the GitHub API. It shows your public repos that are *not* already a project card, skipping forks, archived repos and anything in `github.exclude`. So: push a new public repo and it appears on its own; promote it to a card by adding it to `projects`; hide it by adding its name to `exclude` (or archiving it on GitHub). The list is cached in the visitor's browser for an hour and hides itself if GitHub can't be reached.

Dates are `"YYYY-MM"`, `"YYYY"` or `"present"`. In any text, `*word*` becomes italic and `` `word` `` becomes code.

### English / German

The site has an EN/DE switch (it defaults to the visitor's browser language and remembers the choice). Any text field can be:

```js
org: "SAP SE",                                   // same in both languages
title: { en: "Tutor", de: "Nachhilfelehrer" },   // per language
```

If `de` is missing, the English text is shown. Interface labels ("Projects", "Download CV", month names, …) live in the `UI` table at the top of `app.js`.

## Preview locally

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.

## Files

- `content.js` — your data
- `app.js` — renders the data (no need to edit)
- `styles.css` — design tokens at the top (colours, spacing, radius); light & dark mode
- `index.html` — page skeleton

Printing the page (Ctrl/Cmd + P) produces a clean one-column version.
