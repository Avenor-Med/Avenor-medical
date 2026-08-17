# Atlas Medical Staffing — Hosting Guide

This guide takes you from "I have the HTML file" to "my boss and investors can view it at a real URL."

There are two reasonable routes. Pick based on whether you want the demo to be discoverable on the public internet:

| Route | Cost | Privacy | Best for |
|---|---|---|---|
| **GitHub Pages** (this guide) | Free | Public URL but password-protected by the demo's lock screen | Sharing with your boss, investors, partners. URL is technically discoverable, but the password gate keeps content private. |
| **Netlify Drop / Vercel** (alternate) | Free | Same: public URL + password gate | Same as above. Faster if you don't want a GitHub account. |
| **Netlify with password** (paid) | $19/mo | URL itself requires a password before anything loads | If you want even the lock screen invisible to non-invitees. |

For your boss meeting tomorrow and showing to investors, **GitHub Pages is the right answer** — it's free, professional (the URL is `<username>.github.io/...`), and your password gate is already protecting the content. This guide gets you live in under 10 minutes.

---

## Step 1 — Create a GitHub account (if you don't have one)

1. Go to **https://github.com/signup**
2. Sign up with your email, pick a username (this becomes part of your demo URL — pick something professional like `avenor-medical`)
3. Verify your email
4. Skip any team / plan upgrades — the **free Personal plan is all you need**

If you already have an account, log in and skip to Step 2.

---

## Step 2 — Create a new repository

1. Click the **+** icon top-right → **New repository**
2. Fill in:
   - **Repository name:** `atlas-medical-staffing-demo` (or any name you like — it becomes part of your URL)
   - **Description (optional):** "Atlas Medical Staffing — Prototype demo"
   - **Public** (Pages requires public on the free plan)
   - Check **"Add a README file"** (this avoids an empty-repo error)
3. Click **Create repository**

You're now on the repo page.

---

## Step 3 — Upload the demo file

1. Click **Add file** → **Upload files**
2. Drag in the file **`index.html`** from the workspace folder (use this file, not `healthstaff-demo.html` — `index.html` becomes the homepage of your URL automatically)
3. At the bottom, click **Commit changes**

The file is now in the repo.

---

## Step 4 — Enable GitHub Pages

1. In the repo, click **Settings** (top right of the repo tabs)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select **main** and folder **/ (root)**
5. Click **Save**

A green banner appears: "Your site is live at `https://<username>.github.io/atlas-medical-staffing-demo/`"

It may take **1–2 minutes** for the first deployment. Visit the URL — you should see the Atlas Medical Staffing lock screen.

---

## Step 5 — Share with your boss / investors

You give them three things:

1. **The URL:** `https://<username>.github.io/atlas-medical-staffing-demo/`
2. **The password:** `texas-credentials-91`
3. **A short note:**

> *Hi [name],*
> *Here's the Atlas Medical Staffing prototype. It's a working demo of the platform — public job board, practitioner credentialing, the operator pipeline, and the role-based dashboards. Password: `texas-credentials-91`. The lock screen will ask for it.*
>
> *Best viewed on a desktop browser. Roughly 10 minutes to walk through everything; my demo guide doc covers it in detail.*
>
> *— Avenor Medical*

Send the URL by email or chat. Send the password through a **separate channel** (text, WhatsApp, in person) — that's the basic protection: even if the URL leaks, no one can view without the password.

---

## Updating the demo later

When I make changes, you'll get a new `index.html` file. To update the live demo:

1. Go to your GitHub repo
2. Click **`index.html`** to open it
3. Click the **pencil icon** (top-right of the file view) → **Edit**
4. Delete everything
5. Paste in the new file contents (open the new `index.html` in a text editor, Ctrl+A to select all, Ctrl+C to copy)
6. Scroll down → **Commit changes**

Or even simpler: click **Add file → Upload files** → drop in the new `index.html` → **Commit changes** → it overwrites the old one.

Your URL stays the same. The new version is live in 60 seconds.

---

## Changing the password later

If you ever want to revoke access (e.g., the conversation with this boss ends and you don't want them to keep viewing):

1. Open `index.html` locally in a text editor
2. Search for: `var EXPECTED = "UkctMjAyNjp0ZXhhcy1jcmVkZW50aWFscy05MQ==";`
3. In any browser's developer console (F12), run:
   ```js
   btoa("RG-2026:" + "your-new-password-here")
   ```
4. Copy the result, replace the value of `EXPECTED` in `index.html`
5. Re-upload to GitHub (as above)

Everyone with the old password is now locked out.

---

## Taking the demo offline entirely

If you want it gone:

- **Quick:** Settings → Pages → change Source to "None" → **Save**. URL goes 404 immediately.
- **Permanent:** Settings → scroll to **Danger Zone** → **Delete this repository**. URL gone forever.

You can also temporarily disable by renaming `index.html` to anything else (e.g., `_disabled.html`) — the URL will show 404 until you rename it back.

---

## Optional — Custom domain

If you own a domain (e.g., `atlasmedicalstaffing.com`), you can point it at the GitHub Pages site instead of using the `<username>.github.io` URL.

1. In **Settings → Pages → Custom domain**, enter your domain
2. In your domain registrar (GoDaddy, Namecheap, etc.), add a **CNAME** record pointing your domain to `<username>.github.io`
3. Wait 10–60 minutes for DNS to propagate
4. Check **Enforce HTTPS** in GitHub Pages

This makes the demo URL: `https://atlasmedicalstaffing.com` instead of `<username>.github.io/atlas-...`. Looks far more professional to investors.

**Cost:** the domain itself is $10–15/year. GitHub Pages and HTTPS are free.

---

## What investors will see

When an investor opens your link:

1. Browser loads the lock screen (Atlas Medical Staffing branded, your name as author, "Confidential Prototype" badge)
2. They enter the password you gave them
3. The demo unlocks — they can navigate all five role dashboards, the public job board, the credentialing hub, etc.
4. Your watermark sits in the corner of every screen: *"Avenor Medical · Confidential · © 2026"*
5. The "Demo postings" disclaimer is transparent about which data is sample-only

They cannot:
- Use it without the password
- Hide the watermark (well, a developer could — but a typical investor won't)
- Modify your live demo
- See your boss's analytics / who else viewed it

If you want viewer analytics (who viewed, when, from where), you'd want to host on Vercel (free analytics) or add a tiny tracking script to `index.html`. Tell me if you want that wired in.

---

## Troubleshooting

**"Your site is live" but the URL shows a 404**
→ Wait 2–3 more minutes. GitHub Pages takes time on the first deploy.

**The URL loads but I see the README instead of the demo**
→ The file you uploaded isn't named `index.html`. Rename it (in GitHub: click the file → pencil icon → rename).

**Lock screen never appears, I see broken HTML**
→ The file is corrupted in transit. Re-download from the workspace folder and re-upload.

**"Hey, why is my GitHub URL showing my real name?"**
→ Your GitHub username is in the URL. If you want a generic username, create a new account for this project (or use Vercel/Netlify which let you pick a project-name URL without a username).

**Boss says "the password isn't working"**
→ It's case-sensitive. The password is exactly: `texas-credentials-91` — all lowercase, hyphens, no spaces.

---

## Alternative: Netlify Drop (if you don't want GitHub)

If you don't want a GitHub account:

1. Go to **https://app.netlify.com/drop**
2. Drag the `index.html` file directly onto the page
3. You get a URL like `https://wonderful-platypus-abc123.netlify.app` instantly
4. Sign up free (within 24 hours) to keep the URL permanent

Same result, no GitHub account needed.

**Vercel** is the same: **https://vercel.com/new** → import → drag-and-drop.

---

## My recommendation for tomorrow

1. Now: do GitHub Pages (5 min from this guide) so you have a URL to share
2. Tomorrow morning: rehearse opening the link from a phone or different laptop — make sure the password works
3. In the meeting: share the URL + password verbally when the boss asks. If they want to send to an investor, they can forward the URL by email and tell the investor the password by phone.
4. After tomorrow: if the meeting goes well, buy `atlasmedicalstaffing.com` for $12/year and point it at the same GitHub Pages — the URL upgrade is the first thing the investor will notice.

Good luck.
