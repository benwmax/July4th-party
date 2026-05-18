# Westwell 4th of July Pool Party Website

A single-page party invite + RSVP site backed by Google Sheets.

## Setup

### 1. Google Apps Script

1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Replace the default code with the contents of `apps-script/Code.gs`.
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID (from the sheet's URL).
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorize the script and copy the **Web app URL**.

### 2. Wire up the website

In `script.js`, replace `YOUR_APPS_SCRIPT_URL_HERE` with the Web app URL from step 6.

### 3. Host the site

Enable **GitHub Pages** on this repo (Settings → Pages → branch: `main`, folder: `/`) and the site will be live at `https://benwmax.github.io/july4th-party/`.
