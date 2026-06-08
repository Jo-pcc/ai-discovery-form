// ═══════════════════════════════════════════════════════════════════
// AI DISCOVERY FORM — Google Apps Script Backend
// Paste this entire file into a new Google Apps Script project,
// then deploy as a Web App (see instructions below).
// ═══════════════════════════════════════════════════════════════════

const SPREADSHEET_ID = '11rgqus6oN1E8Xd5ekmG_RZVdxctFlYXI_YjJqmGd7YQ';
const SHEET_NAME     = 'Responses'; // Will be created automatically if it doesn't exist

// Column headers — matches the payload sent from the form
const HEADERS = [
  'Timestamp',
  'Name',
  'Team / Department',
  'Entity',
  'Date',
  'Q1 — Most repetitive daily task',
  'Q2 — Low-value / time-consuming tasks',
  'Q5 — Templated email replies',
  'Q6 — Emails requiring manual follow-up',
  'Q7 — Spreadsheets updated manually',
  'Q8 — Copy data from email/PDF?',
  'Q8b — Data copy details',
  'Q11 — Tasks that fall through cracks',
  'Ideas & Proposals',
];

// ─── ENTRY POINT ────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    appendRow(sheet, data);
    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message }, 500);
  }
}

// Handle preflight OPTIONS requests (CORS)
function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'AI Discovery Form endpoint is live.' });
}

// ─── HELPERS ────────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#2C2C2A');
    headerRange.setFontColor('#FAC775');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(10);
    sheet.setFrozenRows(1);

    // Auto-resize columns
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function appendRow(sheet, d) {
  sheet.appendRow([
    d.timestamp  || new Date().toISOString(),
    d.name       || '',
    d.team       || '',
    d.entity     || '',
    d.date       || '',
    d.q1         || '',
    d.q2         || '',
    d.q5         || '',
    d.q6         || '',
    d.q7         || '',
    d.q8         || '',
    d.q8b        || '',
    d.q11        || '',
    d.ideas      || '',
  ]);
}

function jsonResponse(obj, code) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
