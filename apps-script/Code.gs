// -------------------------------------------------------
// Google Apps Script — RSVP Handler
// Deploy as: Web App > Execute as: Me > Who has access: Anyone
// -------------------------------------------------------

var SHEET_ID = 'https://docs.google.com/spreadsheets/d/10bSefKsO4NuyVZJMDYNQAKQ5LwXv-U8l8ahpPzorX-I/edit?gid=0#gid=0'; // <-- paste your Sheet ID here

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getActiveSheet();

    // Write header row on first use
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp', 'Name', 'Address', 'Plus One'];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight('bold')
           .setBackground('#004e92')
           .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    var data    = JSON.parse(e.postData.contents);
    var ts      = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MM/dd/yyyy HH:mm:ss');
    var row     = [ts, data.name || '', data.address || '', data.plusOneName || ''];

    sheet.appendRow(row);

    return respond({ status: 'success' });

  } catch (err) {
    return respond({ status: 'error', message: err.toString() });

  } finally {
    lock.releaseLock();
  }
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
