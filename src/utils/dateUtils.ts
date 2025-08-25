export function getAgeFromDob(dob: string | Date | null | undefined): string {
  if (!dob) return "-";

  const birthDate = typeof dob === "string" ? new Date(dob) : dob;
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} tahun ${months} bulan ${days} hari`;
}

export function getDobIndonesianFormat(date: string | Date): string {
  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dt = typeof date === "string" ? new Date(date) : date;
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  return `${day} ${bulanIndo[month]} ${year}`;
}

export function formatTanggal(date: string | Date): string {
  const dt = typeof date === "string" ? new Date(date) : date;
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function formatJamMenit(date: string | Date): string {
  const dt = typeof date === "string" ? new Date(date) : date;
  const hh = String(dt.getHours()).padStart(2, "0");
  const mi = String(dt.getMinutes()).padStart(2, "0");
  return `${hh}:${mi}`;
}

export function formatTanggalHari(date: string | Date): string {
  const dt = typeof date === "string" ? new Date(date) : date;

  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const hariNama = hari[dt.getDay()];

  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();

  return `${hariNama}, ${dd}-${mm}-${yyyy}`;
}
