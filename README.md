# Institut Mahaputra — LMS Akademik (Frontend)

Antarmuka web LMS untuk Mahasiswa, Dosen, dan Admin/BAAK. Frontend ini statis
(HTML, CSS, JavaScript) dan berjalan di GitHub Pages. Data dan logika berada di
backend Google Apps Script (berkas `Kode.gs`) yang dipanggil sebagai REST API.

## Struktur
```
index.html          halaman utama (satu halaman)
css/style.css       seluruh gaya tampilan
js/config.js        alamat backend (GAS_URL) — satu-satunya berkas yang perlu diisi
js/app.js           seluruh logika aplikasi dan pemanggilan API
```

## Sebelum deploy
Isi `GAS_URL` di `js/config.js` dengan URL Web App Apps Script (berakhiran `/exec`).

## Catatan
- Tidak ada rahasia di frontend. Token sesi hanya disimpan di browser pengguna.
- Pustaka pihak ketiga dimuat dari CDN: Chart.js, Bootstrap Icons, Inter (Google Fonts),
  SheetJS (saat mengunduh Excel), Google Identity Services (login Google, opsional).

Panduan lengkap instalasi: lihat `PANDUAN-INSTALASI.md`.
