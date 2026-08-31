// ============================================
// LOGIKA DISPLAY MASJID
// ============================================

const PRAYER_LABELS = {
  Fajr: "Subuh",
  Sunrise: "Terbit",
  Dhuhr: "Dzuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya"
};

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

let jadwalHariIni = null;
let tanggalHijriah = "-";

// -------- Inisialisasi tampilan identitas masjid --------
function initIdentitas() {
  document.getElementById("namaMasjid").textContent = CONFIG.namaMasjid;
  document.getElementById("alamatMasjid").textContent = CONFIG.alamat;

  if (CONFIG.logoUrl) {
    const logo = document.getElementById("logo");
    logo.src = CONFIG.logoUrl;
    logo.classList.remove("hidden");
  }

  // Running text
  const marquee = document.getElementById("marquee");
  marquee.textContent = CONFIG.pengumuman.join("   •   ");
}

// -------- Jam digital & tanggal Masehi --------
function updateJam() {
  const now = new Date();

  const jamStr = now.toLocaleTimeString(CONFIG.locale, {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: CONFIG.timeZone
  });
  document.getElementById("jamDigital").textContent = jamStr;

  const tanggalStr = now.toLocaleDateString(CONFIG.locale, {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: CONFIG.timeZone
  });
  document.getElementById("tanggalMasehi").textContent = tanggalStr;

  document.getElementById("tanggalHijriah").textContent = tanggalHijriah;

  if (jadwalHariIni) updateNextPrayer(now);
}

// -------- Ambil jadwal sholat dari API Aladhan --------
async function ambilJadwalSholat() {
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(CONFIG.kota)}&country=${encodeURIComponent(CONFIG.negara)}&method=${CONFIG.metodePerhitungan}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.code === 200) {
      jadwalHariIni = data.data.timings;
      tanggalHijriah = formatHijriah(data.data.date.hijri);

      PRAYER_ORDER.forEach(p => {
        const el = document.getElementById("time-" + p);
        if (el && jadwalHariIni[p]) {
          el.textContent = jadwalHariIni[p].substring(0, 5);
        }
      });
    } else {
      throw new Error("Respon API tidak valid");
    }
  } catch (err) {
    document.getElementById("nextPrayerInfo").textContent =
      "Gagal memuat jadwal sholat (periksa koneksi internet)";
    console.error(err);
  }
}

function formatHijriah(hijri) {
  const bulanHijriah = {
    "Muharram": "Muharram", "Safar": "Safar", "Rabi al-awwal": "Rabiul Awal",
    "Rabi al-thani": "Rabiul Akhir", "Jumada al-awwal": "Jumadil Awal",
    "Jumada al-thani": "Jumadil Akhir", "Rajab": "Rajab", "Shaban": "Sya'ban",
    "Ramadan": "Ramadhan", "Shawwal": "Syawal", "Dhu al-Qadah": "Dzulqaidah",
    "Dhu al-Hijjah": "Dzulhijjah"
  };
  const namaBulan = bulanHijriah[hijri.month.en] || hijri.month.en;
  return `${hijri.day} ${namaBulan} ${hijri.year} H`;
}

// -------- Tentukan sholat berikutnya & highlight kartu --------
function updateNextPrayer(now) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  let nextPrayer = null;
  let nextMinutes = Infinity;

  document.querySelectorAll(".prayer-card").forEach(c => c.classList.remove("active"));

  PRAYER_ORDER.filter(p => p !== "Sunrise").forEach(p => {
    const [h, m] = jadwalHariIni[p].split(":").map(Number);
    const totalMin = h * 60 + m;
    let diff = totalMin - nowMinutes;
    if (diff < 0) diff += 24 * 60; // waktu sudah lewat hari ini -> hitung ke besok
    if (diff < nextMinutes) {
      nextMinutes = diff;
      nextPrayer = p;
    }
  });

  if (nextPrayer) {
    const card = document.querySelector(`.prayer-card[data-prayer="${nextPrayer}"]`);
    if (card) card.classList.add("active");

    const info = document.getElementById("nextPrayerInfo");
    const jam = Math.floor(nextMinutes / 60);
    const menit = nextMinutes % 60;

    if (nextMinutes <= 0) {
      info.textContent = `Waktu ${PRAYER_LABELS[nextPrayer]} telah tiba`;
      info.classList.add("azan-time");
    } else {
      info.classList.remove("azan-time");
      let sisa = jam > 0 ? `${jam} jam ${menit} menit` : `${menit} menit`;
      info.textContent = `Menuju ${PRAYER_LABELS[nextPrayer]} — ${sisa} lagi`;
    }
  }
}

// -------- Jalankan aplikasi --------
function mulai() {
  initIdentitas();
  ambilJadwalSholat();
  updateJam();

  setInterval(updateJam, 1000);
  setInterval(ambilJadwalSholat, CONFIG.refreshJadwalJam * 60 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", mulai);
