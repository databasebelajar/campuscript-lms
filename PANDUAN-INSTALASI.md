# PANDUAN INSTALASI — Institut Mahaputra LMS Akademik

Panduan ini terdiri dari dua bagian yang dikerjakan berurutan:
- **Bagian A** — Backend di Google Apps Script (Kode.gs)
- **Bagian B** — Frontend di GitHub Pages (ZIP ini)

Dokumen ini hanya dikerjakan sekali saat pemasangan awal. Perubahan selanjutnya dijelaskan di bagian C.

---

## Bagian A — Backend (Google Apps Script)

Anda hanya memerlukan satu berkas: `Kode.gs` (dikirim terpisah dari ZIP).

1. Buka https://script.google.com → **Proyek baru**. Beri nama `Institut Mahaputra LMS`.
2. Hapus isi `Code.gs` bawaan, lalu tempel seluruh isi **Kode.gs**. Simpan (Ctrl+S).
   Tidak perlu membuat berkas HTML apa pun. Aplikasi ini sekarang hanya melayani data (JSON).
3. Di editor, pilih fungsi **`setupAppEnvironment`** dari dropdown → **Jalankan** → izinkan akses (Drive, Sheets, Gmail, Trigger).
   Jalankan **hanya sekali**. Setup membuat folder `Institut_Mahaputra_Akademik`, spreadsheet `DB_Institut_Mahaputra_LMS`, dan data contoh.
   (Nama folder dan spreadsheet di Google Drive mengikuti nama Institut Mahaputra.)
4. Buka **Eksekusi / Execution log**. Salin daftar **ID + Token awal** (admin, dosen, mahasiswa). Token hanya tampil sekali.
5. **Deploy → Deployment baru → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Klik **Deploy**, lalu salin **URL Web App** yang berakhiran `/exec`.

Uji cepat: buka `URL/exec?action=auth.config` di browser. Jika muncul teks JSON yang berisi `"success":true`, backend siap.

---

## Bagian B — Frontend (GitHub Pages)

### B1. Siapkan akun dan alat
1. Daftar di https://github.com jika belum punya akun. Username akan menjadi bagian alamat situs (`username.github.io`).
2. Install **Git**: https://git-scm.com/download/win (Windows) atau `sudo apt install git` (Linux).
   Buka Terminal (Mac/Linux) atau PowerShell (Windows).
3. Atur identitas Git sekali saja:
   ```
   git config --global user.name "Nama Anda"
   git config --global user.email "email-akun-github@contoh.com"
   ```

### B2. Isi alamat backend
1. Ekstrak ZIP frontend. Anda akan melihat `index.html`, `css/`, `js/`, `README.md`, `PANDUAN-INSTALASI.md`.
2. Buka `js/config.js` dengan Notepad/VS Code. Ganti `GANTI_DENGAN_ID_DEPLOYMENT/exec` dengan URL Web App dari Bagian A (ambil bagian `https://script.google.com/macros/s/.../exec`). Simpan.

### B3. Buat repository di GitHub
1. Di github.com: tombol **+** → **New repository**.
2. Repository name: **`campuscript-lms`** (boleh diganti, tapi catat namanya).
3. Pilih **Public** (wajib untuk GitHub Pages gratis).
4. **Jangan** centang README, .gitignore, atau license. Biarkan halaman ini terbuka.

### B4. Masuk ke folder yang BENAR
Folder yang dipakai adalah folder hasil ekstraksi ZIP — folder tempat `index.html` berada. Jangan masuk satu level lebih dalam, jangan naik satu level.

Cara cepat di Windows: buka folder tersebut di File Explorer, klik address bar, ketik `powershell`, Enter.

Verifikasi (wajib sebelum lanjut):
```
dir
```
(Mac/Linux: `ls -la`). Harus terlihat `index.html`, `css`, dan `js` di baris teratas. Jika yang terlihat hanya folder lain, Anda berada di folder yang salah.

### B5. Kirim ke GitHub (satu perintah per langkah)
```
git init
git add .
git commit -m "Rilis pertama LMS Akademik"
git branch -M main
git remote add origin https://github.com/USERNAME/campuscript-lms.git
git push -u origin main
```
Ganti `USERNAME` dengan username GitHub Anda, dan `campuscript-lms` jika nama repository berbeda.

Saat `git push` meminta login:
- **Username**: username GitHub.
- **Password**: **Personal Access Token**, bukan password akun. Saat mengetik token, layar tidak menampilkan apa pun. Itu normal.

Membuat token: github.com/settings/tokens → **Generate new token (classic)** → centang **repo** → Generate → salin token (`ghp_...`). Token hanya tampil sekali.

Jika memilih cara visual: install **GitHub Desktop** (https://desktop.github.com), login, lalu **Add local repository** → pilih folder ini → **Publish repository**.

### B6. Aktifkan GitHub Pages
1. Buka repository di github.com → **Settings** → **Pages** (menu kiri).
2. Source: **Deploy from a branch**. Branch: **main**, folder: **/ (root)**. Klik **Save**.
3. Tunggu 1–2 menit, lalu refresh. Alamat situs muncul: `https://USERNAME.github.io/campuscript-lms/`.
4. Buka alamat itu. Halaman login harus tampil lengkap dengan warna dan ikon.

### B7. Login Google (opsional)
Jika ingin tombol "Masuk dengan Google" berfungsi:
1. Buat OAuth Client ID (Web) di Google Cloud Console.
2. Tambahkan **Authorized JavaScript origin**: `https://USERNAME.github.io`.
3. Tempel Client ID di menu Admin → Laporan & Backup → Login Google.
Tanpa langkah ini, login dengan ID dan token tetap berfungsi.

---

## C. Perubahan di kemudian hari

**Backend (Kode.gs) berubah:** tempel ulang Kode.gs di editor Apps Script → **Deploy → Kelola deployment → ✏️ Edit → Versi: Versi baru → Deploy**. URL `/exec` tidak berubah.

**Frontend berubah:** di folder proyek jalankan:
```
git add .
git commit -m "Deskripsi perubahan"
git push
```
Tunggu 1–2 menit. Jika halaman masih lama, tekan **Ctrl+Shift+R**.

---

## D. Pemecahan masalah

| Gejala | Penyebab & solusi |
|---|---|
| "Alamat server belum diatur" | `GAS_URL` di `js/config.js` belum diisi, atau masih placeholder. Isi dengan URL `/exec` lalu push ulang. |
| "Respons server tidak valid" | URL bukan URL Web App (misalnya salah salin), atau deployment belum "Anyone". Cek Bagian A langkah 5. |
| Halaman 404 di GitHub Pages | `index.html` tidak berada di root repository. Ulangi B4: pastikan `dir` menampilkan `index.html` sebelum `git init`. |
| Halaman tampil tanpa warna | Cache browser. Tekan Ctrl+Shift+R. |
| "Tidak dapat terhubung ke server" | Periksa koneksi internet. Pastikan deployment Apps Script masih aktif. |
| `Password authentication is not supported` | Gunakan Personal Access Token, bukan password akun (lihat B5). |
| `remote origin already exists` | Remote sudah pernah ditambahkan. Lewati langkah `git remote add`. |
| Tombol Google tidak berfungsi | Origin GitHub Pages belum ditambahkan (lihat B7). |
| Unggah berkas besar gagal | Batas Apps Script untuk permintaan besar. Gunakan berkas yang lebih kecil (di bawah 10 MB). |

---

## E. Fitur baru: login, foto profil, dan remedial

**Tampilan login.** Panel kiri berisi logo, nama institut, judul "Welcome Back", kolom *Student ID* dan *Password*, tombol *Sign In*, serta tautan *Forgot Password?*. Panel kanan menampilkan foto kampus.
- Mengganti foto panel kanan: login sebagai admin → **Pengaturan** → *Gambar login (sisi kanan)* → **Pilih gambar…** → **Simpan Perubahan**.
- Judul utama dan sub-judul login juga diubah di bagian yang sama.
- Logo bawaan adalah logo Institut Mahaputra. Ganti dengan logo sendiri di *Identitas & Logo*.

**Foto profil (dosen dan mahasiswa).** Login → **Profil** → **Unggah foto**. Foto otomatis dipotong persegi dan diperkecil. Foto tersimpan di folder Drive `Foto_Profil` dan tampil di pojok kanan atas.

**Remedial (dosen).** Menu **Remedial** menampilkan mahasiswa dengan nilai akhir di bawah 55 dan mahasiswa yang sudah remedial.
- Isi **Nilai Remedial** (0–100) dan catatan, lalu **Simpan**. Nilai akhir berubah, nilai asal tetap tercatat.
- **Reset** mengembalikan nilai ke nilai asal.
- Perubahan tercatat di Log Audit.

**Instalasi lama.** Setelah mengganti `Kode.gs`, deploy versi baru (bagian C). Sheet `Remedial` dan folder `Foto_Profil` dibuat otomatis saat pertama dipakai, tanpa perlu menjalankan setup ulang. Untuk frontend, lakukan `git add .`, `git commit`, dan `git push` seperti biasa.
