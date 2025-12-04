export function validateEmail(email: string): string | null {
  if (!email) return "Email wajib diisi";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Format email tidak valid";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // Optional field
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  if (!phoneRegex.test(phone.replace(/\s|-/g, ""))) {
    return "Format nomor telepon tidak valid";
  }
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || !value.trim()) return `${fieldName} wajib diisi`;
  return null;
}

export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (value.length < min) return `${fieldName} minimal ${min} karakter`;
  return null;
}

export function validateDate(date: string): string | null {
  if (!date) return "Tanggal wajib diisi";
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) return "Tanggal tidak boleh di masa lalu";
  return null;
}
