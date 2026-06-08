# AI Discovery Form — Deployment Instructions

Two steps: (1) deploy the Google Apps Script backend, (2) host the HTML on GitHub Pages.
Total time: ~10 minutes.

---

## STEP 1 — Deploy the Google Apps Script

This script receives form submissions and writes them to your Google Sheet.

1. Go to **https://script.google.com** and click **New project**
2. Delete the default `myFunction()` code
3. Paste the entire contents of **`Code.gs`** into the editor
4. Click the **Save** icon (or Ctrl+S) — give the project any name (e.g. "AI Discovery Form")
5. Click **Deploy → New deployment**
6. Click the gear icon next to "Type" and select **Web app**
7. Fill in the settings:
   - Description: `AI Discovery Form v1`
   - **Execute as: Me**
   - **Who has access: Anyone** ← important, this allows the form to POST without login
8. Click **Deploy**
9. Google will ask you to **authorise** the script — click "Authorise access", choose your Google account, and click "Allow"
10. Copy the **Web app URL** — it looks like:
    `https://script.google.com/macros/s/AKfycb.../exec`

---

## STEP 2 — Add the URL to the HTML file

1. Open **`ai_discovery_form.html`** in any text editor
2. Find this line near the bottom of the `<script>` section:
   ```javascript
   const APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with your Web app URL, keeping the quotes:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Save the file

---

## STEP 3 — Host on GitHub Pages (free, permanent URL)

1. Go to **https://github.com** and sign in (or create a free account)
2. Click **New repository** (the + icon, top right)
   - Repository name: `ai-discovery-form` (or anything you like)
   - Set to **Public**
   - Click **Create repository**
3. On the next screen, click **uploading an existing file**
4. Drag and drop your updated **`ai_discovery_form.html`** file
5. Scroll down and click **Commit changes**
6. Go to **Settings → Pages** (left sidebar)
7. Under "Source", select **Deploy from a branch**
8. Branch: **main**, folder: **/ (root)** → click **Save**
9. After ~1 minute, your form will be live at:
   `https://YOUR-GITHUB-USERNAME.github.io/ai-discovery-form/ai_discovery_form.html`

GitHub will show you the exact URL in the Pages settings once it's deployed.

---

## What happens when someone submits

- The form POSTs the data to your Apps Script endpoint
- The script opens your Google Sheet (`11rgqus6oN1E8Xd5ekmG_RZVdxctFlYXI_YjJqmGd7YQ`)
- It creates a **"Responses"** sheet automatically on first submission (with styled headers)
- Each submission appears as a new row with a timestamp

---

## Sharing the form

Once live, share the GitHub Pages URL with your teams. It works on desktop and mobile.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Nothing appears in the sheet | Check the Apps Script URL is correctly pasted in the HTML (no extra spaces) |
| "Authorisation required" error | Re-deploy the Apps Script and re-authorise |
| Form shows error banner | Open browser console (F12) to see the exact error |
| Sheet not found | The script creates it automatically — make sure `SPREADSHEET_ID` in `Code.gs` matches your sheet |
