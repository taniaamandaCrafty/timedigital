// ============================================
// KONFIGURASI DISPLAY MASJID
// Ubah nilai di bawah sesuai kebutuhan masjid Anda
// ============================================

const CONFIG = {
  // Identitas Masjid
  namaMasjid: "MASJID AL-IKHLAS",
  alamat: "Jl. Contoh No. 123, Palembang, Sumatera Selatan",
  logoUrl: "", // isi URL/nama file logo jika ada, kosongkan jika tidak

  // Lokasi untuk perhitungan jadwal sholat (via API Aladhan)
  // Cari kota/kode di https://aladhan.com/
  kota: "Palembang",
  negara: "Indonesia",
  metodePerhitungan: 20, // 20 = Kemenag RI (Indonesia)

  // Zona waktu untuk jam digital
  timeZone: "Asia/Jakarta",
  locale: "id-ID",

  // Teks berjalan (running text) — bisa diisi banyak baris,
  // akan ditampilkan bergantian dipisah " • "
  pengumuman: [
    "Selamat datang di Masjid Al-Ikhlas — mari makmurkan masjid dengan sholat berjamaah",
    "Kajian rutin setiap Ahad ba'da Subuh",
    "Infaq dan sedekah dapat disalurkan melalui kotak amal atau rekening masjid",
    "Mohon menjaga kebersihan dan ketertiban masjid"
  ],

  // Durasi iqomah (menit) setelah adzan, ditampilkan sebagai info countdown
  iqomahMenit: {
    Fajr: 15,
    Dhuhr: 10,
    Asr: 10,
    Maghrib: 5,
    Isha: 10
  },

  // Refresh otomatis jadwal setiap X jam
  refreshJadwalJam: 12
};
