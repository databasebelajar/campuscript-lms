# Catatan Perubahan v1.5 — Institut Mahaputra LMS

Berkas ini menjelaskan pembaruan dari v1.4. Data di Google Sheets, akun, token, dan sesi login **tidak berubah**.

## Yang diperbaiki

1. **Impor pengguna dari CSV** (sebelumnya gagal tanpa keterangan).
   - Header `NIM/NIP` dan `Peran` kini dikenali (juga `nim_nip`, `role`, huruf besar/kecil diabaikan).
   - Setiap baris yang dilewati disertai alasan: kolom kosong, email tidak valid, peran tidak dikenal, NIM/email sudah terdaftar, atau duplikat dalam berkas.
   - Jika kolom wajib (Nama, NIM/NIP, Email) tidak ditemukan, pesan menyebut kolom yang hilang dan kolom yang terbaca.
   - Hasil impor menampilkan jumlah berhasil, daftar token (sekali tampil), dan tabel baris yang dilewati.

2. **Kecepatan tampilan**
   - Data beranda di-cache per pengguna dan dibuang otomatis setiap ada perubahan data.
   - Halaman hanya digambar ulang bila data server benar-benar berubah.
   - Sinkronisasi latar belakang mengikuti aktivitas: aktif tiap 60 dtk, diam tiap 5 mnt.
   - Chart.js dan skrip aplikasi tidak lagi menunda tampilan awal.
   - Respons server membawa `ms` (waktu kerja server) dan `v` (versi).

3. **Kerahasiaan**
   - ID spreadsheet dan folder Drive tidak lagi dikirim ke browser.
   - Pesan login tidak lagi menjelaskan struktur internal.
   - Pepper wajib ada sebelum token bisa dibuat atau diperiksa.
   - Fungsi `cekRahasia()` menampilkan status setiap rahasia (ADA/KOSONG) tanpa menampilkan nilainya.

## Urutan pembaruan

Lakukan **backend dulu**, lalu frontend.

- Backend lama + frontend baru: impor akan menampilkan alasan "NIM/NIP kosong" untuk setiap baris. Ini menandakan backend belum diperbarui.
- Backend baru + frontend lama: tetap berjalan. Impor CSV tetap bermasalah pada frontend lama, jadi perbarui keduanya.

## Langkah 1 — Backend (Kode.gs)

1. Buka editor Apps Script, lalu salin isi `Kode.gs` yang lama sebagai cadangan.
2. Ganti seluruh isi dengan `Kode.gs` v1.5, lalu **Simpan** (Ctrl+S).
3. Jalankan `cekRahasia()` dari editor. Pastikan `SPREADSHEET_ID`, `DRIVE_ROOT_FOLDER_ID`, `SESSION_SECRET`, dan `PEPPER` berstatus **ADA**.
4. **Deploy → Kelola deployment → ✏️ Edit → Versi: Versi baru → Deploy.**
   URL `/exec` tidak berubah. Jangan pilih "Deployment baru".

Opsional: `aktifkanPemanas()` menjaga cache tetap hangat setiap 10 menit. Ini memakai kuota trigger harian. Matikan dengan `matikanPemanas()`.

## Langkah 2 — Frontend (GitHub Pages)

Salin seluruh isi folder ini ke folder repository Anda (jangan unggah lewat web GitHub), lalu:

```
git add .
git commit -m "v1.5: impor pengguna, kecepatan, kerahasiaan"
git push
```

Tunggu 1–2 menit, lalu tekan **Ctrl+Shift+R** di browser.

## Cara menguji impor

1. Admin → **Kelola Pengguna & Token** → **Impor CSV**.
2. Pilih berkas CSV atau tempel isinya.
3. Jika ada kesalahan header, pesan muncul seketika tanpa menghubungi server.
4. Setelah impor, periksa jumlah berhasil dan daftar baris yang dilewati. Unduh CSV token sebelum menutup jendela.

## Perubahan perilaku yang perlu diketahui

- Tombol **Buka Sheet** dan **Buka Folder Drive** di halaman admin tidak tampil lagi, karena tautannya memuat ID. Buka Google Drive secara manual, lalu cari folder `Institut_Mahaputra_Akademik`.
- Data beranda bisa tertinggal hingga 60 dtk saat Anda aktif, dan hingga 5 mnt saat tidak ada aktivitas. Tekan tombol **Segarkan** atau pindah halaman untuk memuat data terbaru.
- Sesi login tetap berlaku. Pengguna tidak perlu masuk ulang.

## Batas yang masih ada

- Setiap penulisan di Sheets masih menulis ulang seluruh sheet. Ini wajar untuk data saat ini, tetapi perlu ditingkatkan bila data sudah puluhan ribu baris.
- Beranda masih mengambil seluruh data dalam satu permintaan. Bila data membesar, perlu endpoint per halaman.
- Token mahasiswa (dalam bentuk hash) masih tersimpan di sheet `Users`. Hash ini tidak dapat dibalik tanpa `PEPPER`, yang hanya ada di Script Properties.
- Fungsi `resetKredensial()` dan pembuatan data contoh mencetak token ke Execution log. Jalankan hanya saat diperlukan, lalu bersihkan log.

## Rollback

1. Jika backend bermasalah: tempel kembali `Kode.gs` v1.4, lalu deploy versi baru.
2. Jika frontend bermasalah: `git revert` commit terakhir, lalu `git push`.
