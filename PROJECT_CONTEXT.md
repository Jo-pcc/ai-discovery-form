# AI Discovery Forms — Project Context

## What this project is

Two standalone HTML forms for Chargeurs PCC's AI automation initiative, deployed on GitHub Pages, connected to a Google Sheet via Google Apps Script.

---

## Deployed assets

| Asset | URL |
|---|---|
| Survey 1 (Team Discovery) | https://jo-pcc.github.io/ai-discovery-form/ai_discovery_form.html |
| GitHub repo | https://github.com/Jo-pcc/ai-discovery-form |
| Google Sheet (responses) | https://docs.google.com/spreadsheets/d/11rgqus6oN1E8Xd5ekmG_RZVdxctFlYXI_YjJqmGd7YQ/edit |
| Apps Script endpoint (Survey 1) | https://script.google.com/macros/s/AKfycbywxgS_bqC3bhrXhtVJe4a7QAOTxNVEGlxz9zkI5RUF6VzFtoWVxNVNgUlWnQPZqb74Cw/exec |

---

## Local file structure

```
C:\Users\jhourany\Downloads\automations_claude\
├── ai_discovery_form.html        ← Survey 1 (live on GitHub Pages)
├── ai_steerco_form.html          ← Survey 2 (built, NOT yet deployed)
├── chargeurs-pcc-logo.png        ← NOT yet added — to be placed here
├── PROJECT_CONTEXT.md            ← This file
└── SETUP_INSTRUCTIONS.md         ← Original setup notes
```

The folder is a git repo pointing to `https://github.com/Jo-pcc/ai-discovery-form.git` (branch: `main`).
To push changes: `git add <file> && git commit -m "message" && git push origin main`

---

## Survey 1 — `ai_discovery_form.html`

### Purpose
Bottom-up discovery: sent to all team members to surface repetitive tasks and pain points. Feeds the Data & AI team's understanding of day-to-day reality.

### Questions
| ID | Label | Mandatory |
|---|---|---|
| q-name | Name | No |
| q-team | Team / Department | No |
| q-entity | Entity (dropdown) | No |
| q-date | Date (auto-filled) | — |
| Q1 | Most repetitive daily task | No |
| Q2 | Low-value / time-consuming tasks | No |
| Q5 | Templated email replies | No |
| Q6 | Emails requiring manual follow-up | No |
| Q7 | Spreadsheets updated manually | No |
| Q8 | Copy data from email/PDF? (Yes/No pill) | No |
| Q8b | If Yes — details (conditional) | No |
| Q11 | Tasks that fall through the cracks | No |

> **Note:** All fields are currently non-mandatory (user's request). The progress bar tracks all 10 answerable fields proportionally.

### Team dropdown options
Purchasing · Customer Service · Logistics / Operations · Finance · Sales · Management · IT · Other

### Entity dropdown (26 entities)
CHARGEURS ENTRETELAS PORTUGAL · CHARGEURS INTERLINING HK · CHARGEURS PCC (THAILAND) CO LTD · CHARGEURS PCC BRASIL TEXTIL LTDA · CHARGEURS PCC CHINA MANUFACTURING · CHARGEURS PCC GERMANY GMBH · CHARGEURS PCC ITALY SPA · CHARGEURS PCC KOREA LTD · CHARGEURS PCC NORTH AMERICA INC · CHARGEURS PCC ROMANIA SRL · CHARGEURS PCC SINGAPORE PTE LTD · CHARGEURS PCC SPAIN · CHARGEURS PCC UNITED KINGDOM LIMITED · ETACOL BANGLADESH LTD · INTISSEL LANKA · LAINIERE DE PICARDIE BC · LANTOR LANKA · PCC ASIA LLC · PCC ASIA LTD · PCC GUANGZHOU TRADING CO LTD · PCC INTERLININGS PVT LTD · PCC VIETNAM LLC (PCC VN) · PT CHARGEURS PCC INDONESIA · PT PCC INDONESIA · SENFA · STROUD RILEY

### Google Sheet mapping (Responses tab)
`Timestamp | Name | Team / Department | Entity | Date | Q1 | Q2 | Q5 | Q6 | Q7 | Q8 | Q8b | Q11`

### Pending changes not yet applied to Survey 1
- [ ] Add Chargeurs PCC logo — save file as `chargeurs-pcc-logo.png` in project folder (HTML already wired)
- [x] Add **CHARGEURS PCC CORPORATE** to the entity dropdown
- [x] Renumber questions correctly (now Q1–Q7 sequentially)
- [x] Add a repeatable **"Ideas & Proposals"** section at the bottom
- [ ] Redeploy **Code.gs** (new `Ideas & Proposals` column added — must redeploy as new version)

---

## Survey 2 — `ai_steerco_form.html`

### Purpose
Top-down proposals: sent to the AI Steering Committee so they can submit structured ideas for new developments or automations. Each idea becomes one row in a `SteerCo_Ideas` tab.

### Status
Built locally. **Not yet deployed.** Needs:
1. ~~A new Google Apps Script~~ → **`Code_SteerCo.gs` written**, targets tab `SteerCo` in the same spreadsheet
2. Deploy `Code_SteerCo.gs` as a Web App, then replace `APPS_SCRIPT_URL` placeholder (line ~558) with the deployed URL
3. Upload to GitHub repo (same repo or new repo — TBD)

### Structure
**Once at the top:** Submitter name + role.

**Per idea (repeatable — user clicks "+ Add another idea"):**
| Field | Type |
|---|---|
| Short title | Text input |
| Type | Dropdown (7 options) |
| Description | Textarea |
| Problem it solves | Textarea |
| Departments affected | Multi-select pill checkboxes |
| Entities affected | Multi-select pill checkboxes + "🌍 Group-wide" toggle |
| Expected benefit | Multi-select pill checkboxes |
| Scale of impact | Dropdown (4 options) |
| Priority | Single-select pills (Nice-to-have / Important / Urgent) |

No mandatory fields. Empty cards are silently dropped on submit.

### Type options
Automation · AI / GenAI assistant · Analytics / dashboard / reporting · Data integration · New tool / application · Process redesign · Other

### Departments
Purchasing · Customer Service · Logistics / Operations · Finance · Sales · Management · IT · Other

### Entities (27 — same as Survey 1 + Corporate at top)
CHARGEURS PCC CORPORATE + all 26 from Survey 1

### Benefit options
Time saved · Cost reduction · Risk & compliance · Revenue growth · Quality improvement · Customer experience

### Scale options
A few people · One team · A whole department · Group-wide

### Submission payload (sent to Apps Script)
```json
{
  "formType": "SteerCo",
  "timestamp": "ISO string",
  "submitterName": "...",
  "submitterRole": "...",
  "ideas": [
    {
      "title": "...",
      "type": "...",
      "description": "...",
      "problem": "...",
      "departments": "comma-separated",
      "entities": "comma-separated (or 'Group-wide')",
      "benefits": "comma-separated",
      "scale": "...",
      "priority": "..."
    }
  ]
}
```

### Apps Script needed for Survey 2
The script must:
- Accept the POST payload above
- Loop `data.ideas` and call `sheet.appendRow(...)` once per idea
- Write to a tab named `SteerCo_Ideas` in the **same spreadsheet** (`11rgqus6oN1E8Xd5ekmG_RZVdxctFlYXI_YjJqmGd7YQ`)
- Headers: `Timestamp | Submitter Name | Submitter Role | Title | Type | Description | Problem | Departments | Entities | Benefits | Scale | Priority`
- Styled header row matching the Survey 1 style (dark background, amber text)
- Same `doGet` health-check endpoint

---

## Design system (both surveys)

Both files use the same CSS design language:
- **Font:** DM Serif Display (headings) + DM Sans (body) via Google Fonts
- **Hero:** dark gradient `#2C2C2A → #3A3530 → #3C2A1A` with amber grid overlay
- **Accent colors:** Amber (`#EF9F27`), Coral (`#D85A30`), Teal (`#1D9E75`)
- **Logo:** `<img src="chargeurs-pcc-logo.png">` with text fallback `CHARGEURS PCC`
- **No framework** — vanilla HTML/CSS/JS, no build step required

---

## What still needs to be done

### Immediate
1. **User to provide logo file** → save as `chargeurs-pcc-logo.png` in the project folder
2. **Apply pending Survey 1 changes** (Corporate entity, question renumbering, ideas section, logo)
3. **Write Survey 2 Apps Script** and deploy it
4. **Inject Survey 2 Apps Script URL** into `ai_steerco_form.html`
5. **Deploy Survey 2** to GitHub Pages (same repo or separate)

### Optional / future
- Link from Survey 2 intro: paste a summary of top pains from Survey 1 so SteerCo proposals are grounded
- Add a read-only admin view or dashboard pulling from the sheet
