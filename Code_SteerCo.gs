// ═══════════════════════════════════════════════════════════════════
// AI STEERCO FORM — Google Apps Script Backend
// 1. Open https://script.google.com and create a new project
// 2. Paste this entire file, replacing the default Code.gs content
// 3. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the deployed URL into ai_steerco_form.html → APPS_SCRIPT_URL
// ═══════════════════════════════════════════════════════════════════

const SPREADSHEET_ID_SC = '11rgqus6oN1E8Xd5ekmG_RZVdxctFlYXI_YjJqmGd7YQ';
const SHEET_NAME_SC     = 'SteerCo';

const HEADERS_SC = [
  'Timestamp',
  'Submitter Name',
  'Submitter Role',
  'Title',
  'Type',
  'Description',
  'Problem',
  'Departments',
  'Entities',
  'Benefits',
  'Scale',
  'Priority',
];

// ─── ENTRY POINT ────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheetSC();

    if (!data.ideas || data.ideas.length === 0) {
      return jsonResponseSC({ status: 'ok', message: 'No ideas to write.' });
    }

    data.ideas.forEach(function(idea) {
      sheet.appendRow([
        data.timestamp     || new Date().toISOString(),
        data.submitterName || '',
        data.submitterRole || '',
        idea.title         || '',
        idea.type          || '',
        idea.description   || '',
        idea.problem       || '',
        idea.departments   || '',
        idea.entities      || '',
        idea.benefits      || '',
        idea.scale         || '',
        idea.priority      || '',
      ]);
    });

    return jsonResponseSC({ status: 'ok', rows: data.ideas.length });
  } catch (err) {
    return jsonResponseSC({ status: 'error', message: err.message });
  }
}

// Health-check endpoint
function doGet(e) {
  return jsonResponseSC({ status: 'ok', message: 'SteerCo form endpoint is live.' });
}

// ─── HELPERS ────────────────────────────────────────────────────────
function getOrCreateSheetSC() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID_SC);
  let   sheet = ss.getSheetByName(SHEET_NAME_SC);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_SC);
  }

  // Write headers only if the sheet is completely empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS_SC);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS_SC.length);
    headerRange.setBackground('#2C2C2A');
    headerRange.setFontColor('#FAC775');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(10);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS_SC.length);
  }

  return sheet;
}

function jsonResponseSC(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
