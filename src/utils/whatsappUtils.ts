export function formatWhatsappLink(number: string): string {
  if (!number) return "";
  // hapus semua karakter non-digit
  const cleaned = number.replace(/\D/g, "");
  // ganti 0 di awal menjadi 62
  const formatted = cleaned.startsWith("0") ? "62" + cleaned.slice(1) : cleaned;
  return `https://wa.me/${formatted}`;
}
