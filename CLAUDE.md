# awfoto-website — notes for Claude

## Future idea: separate admin login on a subdomain to edit site content

> Captured 2026-06-13 from a conversation about another project. The user wants
> this considered for **awfoto-website** later — do not act on it now unless asked.

The user's idea, in their words: edit this site's content through a **separate
admin application hosted on a subdomain** (e.g. `admin.awfoto.com`) with its own
**login authentication**, where saving changes in that admin updates the content
shown on the main public site.

What this maps to technically (for when we pick it up):

- The content would live in structured files written in a "special language" —
  most likely a **git-backed CMS such as Keystatic** using **Markdoc (`.mdoc`)**
  and **YAML** files. The user noted this "special language" is intended for the
  awfoto project specifically.
- The standard architecture: the public site stays **static** (fast/cheap to
  host), and a login-protected admin (on a subdomain) commits content changes to
  a **GitHub repo**, which triggers an automatic rebuild + redeploy (Cloudflare).
- Two common ways to do the separate login:
  - **Keystatic GitHub mode** — admin at a subdomain, editors log in with GitHub.
  - **Keystatic Cloud** — one central login that can manage content across
    multiple sites (good if awfoto becomes one of several client sites).

When the user is ready to build this, confirm the CMS choice and the
hosting/login model before implementing.
