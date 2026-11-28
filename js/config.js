// ============================================================
//  KONFIGURASI — satu-satunya berkas yang perlu diubah sebelum deploy
// ============================================================
// Tempel URL Web App Google Apps Script di bawah (berakhiran /exec).
// Cara mendapatkannya: Apps Script → Deploy → Kelola deployment → URL Web App.
// URL ini bersifat publik; rahasia (PEPPER, SESSION_SECRET, ID spreadsheet)
// tidak pernah ditaruh di berkas ini.
window.CS_CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxno33aTCNoER5myRiRb5cEHvdccRt75HVjo_4yL5_y3UDabSJdD0zn49eJCAoPWlJD/exec'
};
