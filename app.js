/* Renders content.js into the page. You shouldn't need to edit this. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  /* ── Interface strings ──────────────────────────────── */
  var UI = {
    en: {
      projects: "Projects",
      projectsSub: "Things I've built. Most of the code is on GitHub.",
      skills: "Skills",
      contact: "Contact",
      contactTitle: "Get in touch.",
      code: "Code",
      live: "Live",
      cv: "Download CV",
      present: "Present",
      skip: "Skip to content",
      theme: "Toggle dark mode",
      lang: "Language",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      moreRepos: "More on GitHub",
      allRepos: "All repositories",
      updated: "Updated",
      stars: "stars",
      description: "mathematics student in Bonn, research assistant at Fraunhofer ITWM. Projects, experience and CV.",
    },
    de: {
      projects: "Projekte",
      projectsSub: "Dinge, die ich gebaut habe. Der Code liegt größtenteils auf GitHub.",
      skills: "Kenntnisse",
      contact: "Kontakt",
      contactTitle: "Schreib mir.",
      code: "Code",
      live: "Live",
      cv: "Lebenslauf herunterladen",
      present: "heute",
      skip: "Zum Inhalt springen",
      theme: "Dunkelmodus umschalten",
      lang: "Sprache",
      months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      moreRepos: "Weitere Repositories",
      allRepos: "Alle Repositories",
      updated: "Aktualisiert",
      stars: "Sterne",
      description: "Mathematikstudent in Bonn, wissenschaftliche Hilfskraft am Fraunhofer ITWM. Projekte, Erfahrung und Lebenslauf.",
    },
  };
  var LANGS = Object.keys(UI);

  var lang = localStorage.getItem("lang");
  if (LANGS.indexOf(lang) < 0) {
    lang = /^de\b/i.test(navigator.language || "") ? "de" : "en";
  }

  /* ── Helpers ────────────────────────────────────────── */
  // Text in content.js is either a string or { en: "...", de: "..." }.
  function t(v) {
    if (v == null) return "";
    if (typeof v === "object") return v[lang] != null ? v[lang] : (v.en != null ? v.en : "");
    return String(v);
  }
  function ui(key) { return UI[lang][key]; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // *italic* and `code`
  function inline(v) {
    return esc(t(v))
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function fmtDate(d) {
    if (!d) return "";
    if (d === "present") return ui("present");
    var p = String(d).split("-");
    return p[1] ? ui("months")[parseInt(p[1], 10) - 1] + " " + p[0] : p[0];
  }

  function fmtRange(from, to) {
    var a = fmtDate(from), b = fmtDate(to);
    if (!b || a === b) return a;
    return a + " – " + b;
  }

  function link(url, label, cls) {
    url = t(url);
    var ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
    return '<a class="' + (cls || "") + '" href="' + esc(url) + '"' + ext + ">" + label + "</a>";
  }

  var ARROW = '<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>';
  var CHEVRON = '<svg class="chev" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg>';

  /* ── Render ─────────────────────────────────────────── */
  function render() {
    root.lang = lang;
    document.title = S.name;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = S.name + " — " + ui("description");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = ui(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      el.setAttribute("aria-label", ui(el.dataset.i18nLabel));
    });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    /* Hero */
    $("brand").textContent = S.name;
    $("hero-role").textContent = t(S.role);
    $("hero-name").textContent = S.name;
    $("hero-headline").textContent = t(S.headline);
    $("hero-intro").textContent = t(S.intro);

    var actions = (S.links || []).map(function (l, i) {
      return link(l.url, esc(t(l.label)), i === 0 ? "btn btn--primary" : "btn btn--secondary");
    });
    if (t(S.cv)) actions.push(link(S.cv, esc(ui("cv")), "btn btn--secondary"));
    $("hero-actions").innerHTML = actions.join("");

    /* Projects */
    var projects = (S.projects || []).slice().sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
    $("project-grid").innerHTML = projects.map(function (p) {
      var links = [];
      if (p.repo) links.push(link(p.repo, ui("code") + " " + CHEVRON, "textlink"));
      if (p.demo) links.push(link(p.demo, ui("live") + " " + CHEVRON, "textlink"));
      var main = p.demo || p.repo;
      var name = esc(t(p.name));
      return (
        '<article class="card project' + (p.featured ? " project--featured" : "") + ' reveal">' +
          '<div class="project__top">' +
            '<h3 class="project__name">' + (main ? link(main, name + ARROW, "stretched") : name) + "</h3>" +
            (p.year ? '<span class="project__year">' + esc(p.year) + "</span>" : "") +
          "</div>" +
          '<p class="project__desc">' + inline(p.description) + "</p>" +
          '<div class="project__foot">' +
            '<ul class="tags">' + (p.tags || []).map(function (tag) {
              return '<li class="tag">' + esc(t(tag)) + "</li>";
            }).join("") + "</ul>" +
            (links.length ? '<div class="project__links">' + links.join("") + "</div>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");

    /* Timeline sections: date column on the left, details on the right */
    $("timeline-sections").innerHTML = (S.sections || []).map(function (sec) {
      var entries = (sec.entries || []).map(function (e) {
        var roles = (e.roles || []).map(function (r) {
          var pts = (r.points || []).length
            ? '<ul class="points">' + r.points.map(function (pt) { return "<li>" + inline(pt) + "</li>"; }).join("") + "</ul>"
            : "";
          return (
            '<div class="role">' +
              '<span class="role__date">' + fmtRange(r.from, r.to) + "</span>" +
              '<div class="role__body">' +
                '<h4 class="role__title">' + inline(r.title) + "</h4>" + pts +
              "</div>" +
            "</div>"
          );
        }).join("");

        var org = esc(t(e.org));
        return (
          '<li class="entry reveal">' +
            '<div class="entry__head">' +
              '<h3 class="entry__org">' + (e.url ? link(e.url, org, "") : org) + "</h3>" +
              (e.location ? '<span class="entry__loc">' + esc(t(e.location)) + "</span>" : "") +
            "</div>" + roles +
          "</li>"
        );
      }).join("");

      var id = esc(sec.id);
      return (
        '<section class="section" id="' + id + '" aria-labelledby="' + id + '-title">' +
          '<div class="wrap">' +
            '<header class="section__head"><h2 id="' + id + '-title">' + esc(t(sec.title)) + "</h2></header>" +
            '<ol class="card timeline">' + entries + "</ol>" +
          "</div>" +
        "</section>"
      );
    }).join("");

    /* Skills */
    $("skills-grid").innerHTML = (S.skills || []).map(function (g) {
      return (
        '<div class="skill reveal">' +
          '<h3 class="skill__label">' + esc(t(g.label)) + "</h3>" +
          '<ul class="tags">' + g.items.map(function (i) { return '<li class="tag">' + esc(t(i)) + "</li>"; }).join("") + "</ul>" +
        "</div>"
      );
    }).join("");

    /* Nav */
    var navItems = [{ id: "projects", title: ui("projects") }]
      .concat((S.sections || []).map(function (s) { return { id: s.id, title: t(s.title) }; }))
      .concat([{ id: "skills", title: ui("skills") }, { id: "contact", title: ui("contact") }]);
    $("nav-links").innerHTML = navItems.map(function (n) {
      return '<li><a href="#' + esc(n.id) + '" data-target="' + esc(n.id) + '">' + esc(n.title) + "</a></li>";
    }).join("");

    /* Footer */
    $("footer-links").innerHTML = (S.links || []).map(function (l) {
      return link(l.url, esc(t(l.label)) + ARROW, "footer__link");
    }).join("");
    $("footer-meta").textContent =
      "© " + new Date().getFullYear() + " " + S.name + (S.location ? " · " + t(S.location) : "");

    renderRepos();
    observe(navItems);
  }

  /* ── GitHub auto-list ───────────────────────────────── */
  var GH = S.github || {};
  var repos = null; // filled by loadRepos()
  var LANG_COLORS = {
    Python: "#3572A5", Go: "#00ADD8", Java: "#b07219", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    C: "#555555", "C++": "#f34b7d", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
    TeX: "#3D6117", Rust: "#dea584", "Jupyter Notebook": "#DA5B0B",
  };

  function renderRepos() {
    var box = $("repos");
    if (!repos || !repos.length) { box.hidden = true; return; }
    box.hidden = false;
    $("repos-all").href = "https://github.com/" + encodeURIComponent(GH.user) + "?tab=repositories";
    $("repos-all").innerHTML = esc(ui("allRepos")) + " " + CHEVRON;
    $("repo-list").innerHTML = repos.map(function (r) {
      var meta = [];
      if (r.language) {
        meta.push('<span><i class="lang-dot" style="background:' + (LANG_COLORS[r.language] || "var(--text-3)") +
          '"></i>' + esc(r.language) + "</span>");
      }
      if (r.stars) meta.push('<span title="' + ui("stars") + '">★ ' + r.stars + "</span>");
      if (r.pushed) meta.push("<span>" + ui("updated") + " " + fmtDate(r.pushed.slice(0, 7)) + "</span>");
      return (
        '<li class="repo">' +
          '<h4 class="repo__name">' + link(r.url, esc(r.name) + ARROW, "stretched") + "</h4>" +
          '<div class="repo__meta">' + meta.join("") + "</div>" +
          (r.description ? '<p class="repo__desc">' + esc(r.description) + "</p>" : "") +
        "</li>"
      );
    }).join("");
  }

  function loadRepos() {
    if (!GH.user || !window.fetch) return;
    var key = "gh-repos:" + GH.user;
    var shown = {};
    (S.projects || []).forEach(function (p) {
      [p.repo, p.demo].forEach(function (u) { if (u) shown[t(u).toLowerCase().replace(/\/$/, "")] = 1; });
    });
    var excluded = (GH.exclude || []).map(function (x) { return x.toLowerCase(); });

    function use(list) {
      repos = list.filter(function (r) {
        return !r.fork && !r.archived &&
          excluded.indexOf(r.name.toLowerCase()) < 0 &&
          !shown[r.url.toLowerCase()];
      }).slice(0, GH.limit || 8);
      renderRepos();
    }

    // Cache for an hour — GitHub allows 60 unauthenticated requests/hour per visitor.
    try {
      var cached = JSON.parse(localStorage.getItem(key) || "null");
      if (cached && Date.now() - cached.time < 36e5) return use(cached.list);
    } catch (e) { /* ignore */ }

    fetch("https://api.github.com/users/" + encodeURIComponent(GH.user) + "/repos?sort=pushed&per_page=100", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (data) {
        var list = data.map(function (r) {
          return {
            name: r.name, url: r.html_url, description: r.description, language: r.language,
            stars: r.stargazers_count, pushed: r.pushed_at, fork: r.fork, archived: r.archived,
          };
        });
        try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), list: list })); } catch (e) { /* ignore */ }
        use(list);
      })
      .catch(function () { /* offline or rate-limited: just hide the list */ });
  }

  /* ── Scroll spy + reveal (re-attached after each render) ── */
  var spy, rev, firstRender = true;
  function observe(navItems) {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    if (spy) spy.disconnect();
    if (rev) rev.disconnect();

    var links = {};
    document.querySelectorAll("[data-target]").forEach(function (a) { links[a.dataset.target] = a; });
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("is-active"); });
          links[en.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navItems.forEach(function (n) { var el = $(n.id); if (el) spy.observe(el); });

    // Animate on first load only; a language switch shouldn't replay it.
    if (!firstRender) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    firstRender = false;
    rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); rev.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { rev.observe(el); });
  }

  render();
  loadRepos();

  /* Content is rendered after load, so re-apply a #hash jump. */
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }

  /* ── Language toggle ────────────────────────────────── */
  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      localStorage.setItem("lang", lang);
      render();
    });
  });

  /* ── Theme toggle ───────────────────────────────────── */
  $("theme-toggle").addEventListener("click", function () {
    var current = root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  /* ── Nav border on scroll ───────────────────────────── */
  var nav = $("nav");
  var onScroll = function () { nav.classList.toggle("nav--scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
