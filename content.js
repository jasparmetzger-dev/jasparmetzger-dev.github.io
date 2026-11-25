/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — this is the only file you need to edit.
 * ─────────────────────────────────────────────────────────────
 *
 *  • Add a project:      copy an object in `projects` and edit it.
 *  • Add a job/program:  add an entry at the TOP of the right section
 *                        in `sections` (newest first).
 *  • Add a new section:  add another { id, title, entries } object.
 *  • Dates:              "YYYY-MM" or "YYYY". Use "present" for ongoing.
 *  • Optional fields can simply be left out.
 *
 *  LANGUAGES
 *  Any text can be either a plain string (same in both languages):
 *      org: "SAP SE"
 *  or an object with one text per language:
 *      title: { en: "Tutor", de: "Nachhilfelehrer" }
 *  If the German text is missing, the English one is shown.
 *
 *  Text wrapped in *asterisks* is rendered in italics, `backticks` as code.
 */

window.SITE = {
  name: "Jaspar Metzger",
  role: {
    en: "Mathematics student · Research assistant at Fraunhofer ITWM",
    de: "Mathematikstudent · Wissenschaftliche Hilfskraft am Fraunhofer ITWM",
  },
  location: { en: "Bonn, Germany", de: "Bonn" },

  // Large hero line. Keep it short.
  headline: {
    en: "Mathematics, code, and the models in between.",
    de: "Mathematik, Code und die Modelle dazwischen.",
  },
  intro: {
    en:
      "I study mathematics with a minor in computer science at the University of Bonn " +
      "and work on financial mathematics at Fraunhofer ITWM. I like building things " +
      "from first principles — tensor libraries, backends, and statistical models.",
    de:
      "Ich studiere Mathematik mit Nebenfach Informatik an der Universität Bonn " +
      "und arbeite in der Finanzmathematik am Fraunhofer ITWM. Am liebsten baue ich " +
      "Dinge von Grund auf — Tensor-Bibliotheken, Backends und statistische Modelle.",
  },

  links: [
    { label: "GitHub", url: "https://github.com/jasparmetzger-dev" },
    { label: { en: "Email", de: "E-Mail" }, url: "mailto:jaspar.metzger@web.de" },
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/..." },
  ],

  // Path or URL to a PDF of your CV (e.g. "cv.pdf"). null hides the button.
  // Can also be per language: { en: "cv-en.pdf", de: "lebenslauf.pdf" }
  // Tip: use a version without your phone number — this site is public.
  cv: null,

  /* ── GitHub auto-list ──────────────────────────────────────
   *  Your public repos are fetched from GitHub on page load and shown
   *  at the end of the Projects list — except ones already in `projects` below,
   *  forks, archived repos, and anything in `exclude`.
   *  Set `user: null` to turn this off.
   */
  github: {
    user: "jasparmetzger-dev",
    exclude: ["jasparmetzger-dev.github.io"],
    limit: 8, // max. number of repos in the list
  },

  /* ── Projects ──────────────────────────────────────────────
   *  name         required
   *  description  required, one or two sentences
   *  tags         list of short labels (languages, frameworks)
   *  repo         GitHub URL (optional)
   *  demo         live URL (optional)
   *  (listed in this order, above the auto-loaded GitHub repos)
   */
  projects: [
    {
      name: "ml_lib_2",
      description: {
        en:
          "Classical machine learning from scratch using only the Python standard library — " +
          "including its own N-dimensional tensor class, layers, optimizers and containers.",
        de:
          "Klassisches maschinelles Lernen von Grund auf, nur mit der Python-Standardbibliothek — " +
          "inklusive eigener N-dimensionaler Tensor-Klasse, Layern, Optimierern und Containern.",
      },
      tags: ["Python", { en: "Linear algebra", de: "Lineare Algebra" }, "Unit tests"],
      repo: "https://github.com/jasparmetzger-dev/ml_lib_2",
    },
    {
      name: "Stock Price Ticker",
      description: {
        en:
          "Full-stack portfolio tracker with real-time prices, user auth and SMS alerts " +
          "when a portfolio hits a target price.",
        de:
          "Full-Stack-Portfolio-Tracker mit Echtzeitkursen, Nutzer-Login und SMS-Benachrichtigung, " +
          "sobald ein Portfolio einen Zielkurs erreicht.",
      },
      tags: ["FastAPI", "PostgreSQL", "Docker"],
      repo: "https://github.com/jasparmetzger-dev/stock_price_ticker",
    },
    {
      name: "Agora",
      description: {
        en: "Backend MVP for a short-video social platform — an infrastructure-first HTTP API.",
        de: "Backend-MVP für eine Kurzvideo-Plattform — eine HTTP-API mit Fokus auf Infrastruktur.",
      },
      tags: ["Go", "Gin"],
      repo: "https://github.com/jasparmetzger-dev/agora",
    },
    {
      name: "TMDb Movie Recommender",
      description: {
        en: "Movie recommendations built on top of The Movie Database API.",
        de: "Filmempfehlungen auf Basis der API von The Movie Database.",
      },
      tags: ["Java", "REST"],
      repo: "https://github.com/jasparmetzger-dev/TMBdRecommendMovie",
    },
    {
      name: "WeatherAPI",
      description: {
        en: "A small Java client for fetching and presenting weather data.",
        de: "Ein kleiner Java-Client zum Abrufen und Darstellen von Wetterdaten.",
      },
      tags: ["Java", "REST"],
      repo: "https://github.com/jasparmetzger-dev/WeatherAPI",
    },
  ],

  /* ── Timeline sections ─────────────────────────────────────
   *  Each entry:
   *    org        organisation (required)
   *    url        organisation website (optional)
   *    location   optional
   *    roles      one or more roles at this organisation, newest first
   *      title    required
   *      from/to  "YYYY-MM" | "YYYY" | "present"
   *      points   bullet points (optional)
   */
  sections: [
    {
      id: "experience",
      title: { en: "Experience", de: "Berufserfahrung" },
      entries: [
        {
          org: {
            en: "Fraunhofer Institute for Industrial Mathematics ITWM",
            de: "Fraunhofer-Institut für Techno- und Wirtschaftsmathematik ITWM",
          },
          url: "https://www.itwm.fraunhofer.de",
          location: "Kaiserslautern",
          roles: [
            {
              title: {
                en: "Student Research Assistant, Financial Mathematics",
                de: "Wissenschaftliche Hilfskraft, Finanzmathematik",
              },
              from: "2026-09",
              to: "present",
              points: [
                { en: "Validation of a RAG pipeline", de: "Validierung einer RAG-Pipeline" },
                {
                  en: "Generation of synthetic bank transfer data for an anti-money-laundering project",
                  de: "Generierung synthetischer Überweisungsdaten für ein Projekt zur Aufdeckung von Geldwäsche",
                },
              ],
            },
            {
              title: { en: "Intern, Financial Mathematics", de: "Praktikant, Finanzmathematik" },
              from: "2026-07",
              to: "2026-09",
              points: [
                {
                  en: "Developed, categorised and analysed metrics for the payout phase of private pension products",
                  de: "Entwicklung, Kategorisierung und Analyse von Kennzahlen zur Rentenphase privater Altersvorsorge",
                },
                {
                  en: "Contributed to a proposal for a Federal Ministry of Finance tender on the German pension reform act",
                  de: "Mitarbeit an einem Antrag für eine Ausschreibung des BMF zur Umsetzung des Altersvorsorgereformgesetzes",
                },
                {
                  en: "Built an annuity and mortality model in Python; reported and presented the results",
                  de: "Renten- und Sterblichkeitsmodell in Python; Berichte und Präsentation der Ergebnisse",
                },
              ],
            },
          ],
        },
        {
          org: "WIEDEMANN GmbH & Co. KG",
          location: "Sarstedt",
          roles: [
            {
              title: { en: "Part-time, Order Picking", de: "Minijob, Kommissionierung" },
              from: "2025-12",
              to: "2026-06",
              points: [
                {
                  en: "Independent picking, packing and distribution of bathroom and heating products in wholesale",
                  de: "Selbstständiges Kommissionieren, Verpacken und Verteilen von Bad- und Heizungsartikeln im Großhandel",
                },
              ],
            },
          ],
        },
        {
          org: { en: "Schüler helfen Schülern & self-employed", de: "Schüler helfen Schülern & selbstständig" },
          location: "Hannover",
          roles: [
            {
              title: { en: "Tutor", de: "Nachhilfelehrer" },
              from: "2024-10",
              to: "2025-11",
              points: [
                {
                  en: "Mathematics, Chemistry and Latin for four students in grades 7–11",
                  de: "Mathematik, Chemie und Latein für vier Schüler*innen der Jahrgänge 7–11",
                },
              ],
            },
          ],
        },
        {
          org: "SAP SE",
          url: "https://www.sap.com",
          location: "Dresden",
          roles: [
            {
              title: {
                en: "School Internship, Business Informatics",
                de: "Schülerpraktikum, Wirtschaftsinformatik",
              },
              from: "2025-02",
              to: "2025-02",
              points: [
                {
                  en: "Team project work, seminars and workshops on agile methods and computer science",
                  de: "Projektarbeit im Team sowie Seminare und Workshops zu agilem Arbeiten und Informatik",
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "education",
      title: { en: "Education", de: "Ausbildung" },
      entries: [
        {
          org: { en: "University of Bonn", de: "Universität Bonn" },
          url: "https://www.uni-bonn.de",
          location: "Bonn",
          roles: [
            {
              title: {
                en: "B.Sc. Mathematics, minor in Computer Science",
                de: "B.Sc. Mathematik, Nebenfach Informatik",
              },
              from: "2026-09",
              to: "present",
            },
          ],
        },
        {
          org: "Kaiser-Wilhelms- und Ratsgymnasium",
          location: "Hannover",
          roles: [
            {
              title: { en: "Abitur, grade 1.0", de: "Abitur mit 1,0" },
              from: "2020-08",
              to: "2026-07",
              points: [
                {
                  en: "Latinum and Graecum; awards in Latin and Physics",
                  de: "Großes Latinum und Graecum; Preise in Latein und Physik",
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: "programmes",
      title: { en: "Programmes", de: "Programme" },
      entries: [
        {
          org: "business@school (Boston Consulting Group)",
          location: "Hannover",
          roles: [
            {
              title: { en: "Student Coach", de: "Schülercoach" },
              from: "2025-10",
              to: "2026-06",
              points: [
                {
                  en: "Coached a team developing *SafeStraw*, a drinking straw that detects knockout drops",
                  de: "Betreuung eines Teams bei *SafeStraw*, einem Trinkhalm, der K.-o.-Tropfen erkennt",
                },
              ],
            },
            {
              title: { en: "Participant", de: "Teilnehmer" },
              from: "2024-10",
              to: "2025-06",
              points: [
                {
                  en: "Developed and presented *EcoSphere*, a platform that rewards sustainable behaviour",
                  de: "Entwicklung und Präsentation von *EcoSphere*, einer Plattform, die nachhaltiges Handeln belohnt",
                },
              ],
            },
          ],
        },
        {
          org: "Deutsche SchülerAkademie",
          location: "Torgelow",
          roles: [
            {
              title: { en: "Introduction to Statistics", de: "Einführung in die Statistik" },
              from: "2025-08",
              to: "2025-08",
              points: [
                {
                  en: "Estimators, covariances, distributions; analysis of a WNBA dataset in Python, report in LaTeX",
                  de: "Schätzer, Kovarianzen, Verteilungen; Analyse eines WNBA-Datensatzes in Python, Bericht in LaTeX",
                },
              ],
            },
          ],
        },
        {
          org: { en: "JuniorSTUDIUM, Leibniz University Hannover", de: "JuniorSTUDIUM, Leibniz Universität Hannover" },
          location: "Hannover",
          roles: [{ title: "Analysis II", from: "2024-04", to: "2024-10" }],
        },
      ],
    },

    {
      id: "volunteering",
      title: { en: "Volunteering", de: "Engagement" },
      entries: [
        {
          org: "BÜNDNIS 90/DIE GRÜNEN",
          location: "Sarstedt, Bonn",
          roles: [
            {
              title: { en: "Member", de: "Mitglied" },
              from: "2025-12",
              to: "present",
              points: [
                {
                  en: "Contributed to the local election manifesto and campaign strategy, organised events",
                  de: "Mitarbeit am Kommunalwahlprogramm und an der Wahlkampfstrategie, Organisation von Veranstaltungen",
                },
              ],
            },
          ],
        },
        {
          org: "Balu & Du",
          location: "Hannover",
          roles: [
            {
              title: "Mentor",
              from: "2025-09",
              to: "2026-07",
              points: [
                {
                  en: "Mentored a primary school child with a language barrier at school and in everyday life",
                  de: "Begleitung eines Grundschulkindes mit Sprachbarriere in Schule und Alltag",
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  /* ── Skills ─────────────────────────────────────────────── */
  skills: [
    {
      label: { en: "Programming", de: "Programmierung" },
      items: ["Python", "NumPy", "pandas", "Matplotlib", "C", "C++", "Go", "Java"],
    },
    { label: "Tools", items: ["Git", "LaTeX", "Docker", "PostgreSQL", "FastAPI"] },
    {
      label: { en: "Languages", de: "Sprachen" },
      items: [
        { en: "German (native)", de: "Deutsch (Muttersprache)" },
        { en: "English (fluent)", de: "Englisch (fließend)" },
        "Latinum",
        "Graecum",
      ],
    },
    {
      label: { en: "Outside work", de: "Freizeit" },
      items: [
        { en: "Running", de: "Laufen" },
        "Muay Thai",
        { en: "Beach volleyball", de: "Beachvolleyball" },
      ],
    },
  ],
};
