/**
 * Portfolio contact form -> Google Sheet + email notification.
 *
 * Setup (once):
 *   1. Create a Google Sheet, then open Extensions > Apps Script.
 *   2. Replace the default code with this file and save.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as: Me        Who has access: Anyone
 *   4. Approve the permissions, copy the Web app URL (ends in /exec)
 *      and put it in src/data/projects.js as site.contactEndpoint.
 *
 * After editing this script, use Deploy > Manage deployments > Edit > New version,
 * otherwise the live URL keeps running the old code.
 */

// Where notifications go. Leave empty to use the Google account that deployed the script.
const NOTIFY_EMAIL = ''

const SHEET_NAME = 'Messages'
const HEADERS = ['Received at', 'Name', 'Email', 'Message', 'Page', 'Came from', 'Device', 'Browser', 'Language', 'Time zone', 'Screen']
const LIMITS = { name: 100, email: 200, message: 5000, other: 300 }

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // Honeypot: real visitors never see this field, bots fill it in. Pretend it worked.
    if (data.company) return json({ ok: true })

    const name = clean(data.name, LIMITS.name)
    const email = clean(data.email, LIMITS.email)
    const message = clean(data.message, LIMITS.message)
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      return json({ ok: false, error: 'Invalid form data.' })
    }

    const now = new Date()
    const row = [
      now, name, email, message,
      clean(data.page, LIMITS.other),
      clean(data.referrer, LIMITS.other) || 'Direct',
      clean(data.device, LIMITS.other),
      clean(data.browser, LIMITS.other),
      clean(data.language, LIMITS.other),
      clean(data.timeZone, LIMITS.other),
      clean(data.screen, LIMITS.other),
    ]

    // Lock so two messages arriving together cannot land on the same row.
    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      getSheet().appendRow(row.map(safeCell))
    } finally {
      lock.releaseLock()
    }

    // The row is already saved, so a mail failure (e.g. daily quota) must not fail the request.
    try {
      sendNotification({ now, name, email, message, row })
    } catch (mailError) {
      console.error('Saved to sheet but email failed: ' + mailError)
    }

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Server error.' })
  }
}

// Opening the URL in a browser shows this, which confirms the deployment is live.
function doGet() {
  return json({ ok: true, message: 'Contact form endpoint is running.' })
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.getRange('A:A').setNumberFormat('dd mmm yyyy, hh:mm:ss')
    sheet.setColumnWidth(1, 170)
    sheet.setColumnWidth(4, 420)
  }
  return sheet
}

function sendNotification({ now, name, email, message, row }) {
  const to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail()
  const book = SpreadsheetApp.getActiveSpreadsheet()
  const when = Utilities.formatDate(now, book.getSpreadsheetTimeZone(), 'dd MMM yyyy, hh:mm a')
  const details = HEADERS.slice(4).map((h, i) => h + ': ' + (row[i + 4] || '-')).join('\n')
  MailApp.sendEmail({
    to: to,
    replyTo: email,
    subject: 'New portfolio message from ' + name,
    body:
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Received: ' + when + '\n\n' +
      message + '\n\n' +
      '--- Details ---\n' + details + '\n\n' +
      'All messages: ' + book.getUrl() + '\n' +
      'Reply to this email to answer ' + name + ' directly.',
  })
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max)
}

// Sheets runs any text starting with = + - @ as a formula. Prefix it so it stays plain text.
function safeCell(value) {
  return typeof value === 'string' && /^[=+\-@]/.test(value) ? "'" + value : value
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
