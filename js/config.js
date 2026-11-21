// ============================================================
//  KONFIGURASI — satu-satunya berkas yang perlu diubah sebelum deploy
// ============================================================
// Tempel URL Web App Google Apps Script di bawah (berakhiran /exec).
// Cara mendapatkannya: Apps Script → Deploy → Kelola deployment → URL Web App.
// URL ini bersifat publik; rahasia (PEPPER, SESSION_SECRET, ID spreadsheet)
// tidak pernah ditaruh di berkas ini.
window.CS_CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxUatQSAOm01s1ColF3dVHSg1i4ukpmfnPQqSNdEyzK4ow2QW7mYiMmHRcNrUvcEH4_/exec'
};