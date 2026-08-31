# Masjid Display

Aplikasi web sederhana untuk ditampilkan di TV/monitor masjid, berisi:

- 🕌 Nama & alamat masjid
- 🕐 Jam digital real-time
- 📅 Tanggal Masehi & Hijriah (otomatis dari API)
- 🕋 Jadwal 5 waktu sholat + waktu terbit, dengan highlight sholat berikutnya
- 📢 Running text pengumuman

## Struktur File

```
masjid-display/
├── index.html   → halaman utama
├── style.css    → tampilan (tema hijau-emas, cocok untuk TV)
├── script.js    → logika jam, jadwal sholat, dan running text
├── config.js    → PENGATURAN (nama masjid, kota, pengumuman, dll)
└── README.md    → panduan ini
```

## Cara Pakai

1. **Edit `config.js`** — cukup ubah bagian ini sesuai masjid Anda:
   - `namaMasjid`, `alamat`, `logoUrl`
   - `kota` dan `negara` (untuk perhitungan jadwal sholat via API Aladhan)
   - `pengumuman` — daftar teks yang berjalan di bagian bawah layar
   - `metodePerhitungan` — biarkan `20` (Kemenag RI) untuk Indonesia

2. **Buka `index.html`** langsung di browser (double click), atau upload seluruh folder ke:
   - Hosting statis apa pun (Netlify, Vercel, GitHub Pages, cPanel, dll)
   - Atau jalankan lokal dengan server sederhana, contoh:
     ```
     npx serve .
     ```

3. **Tampilkan di TV**: buka halaman di browser TV/Smart TV/mini PC yang terhubung ke layar, lalu tekan F11 untuk mode fullscreen.

## Sumber Data Jadwal Sholat

Jadwal sholat diambil otomatis dari API publik [Aladhan.com](https://aladhan.com/) berdasarkan kota yang diatur di `config.js`. Membutuhkan koneksi internet aktif di perangkat yang menampilkan layar.

Jika ingin jadwal manual/tetap tanpa internet, jadwal bisa diisi langsung di `script.js` pada fungsi `ambilJadwalSholat()` — silakan tanya jika butuh bantuan versi offline.

## Kustomisasi Tampilan

Warna, ukuran font, dan tata letak bisa diubah di `style.css` — variabel warna ada di bagian atas file (`:root`), contoh:

```css
:root{
  --bg-dark: #062e2a;   /* warna latar gelap */
  --gold: #d4af37;      /* warna aksen emas */
  --green: #0e7a5f;     /* warna hijau kartu aktif */
}
```

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan masjid/musholla.
