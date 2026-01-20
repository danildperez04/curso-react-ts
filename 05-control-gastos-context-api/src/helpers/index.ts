export function formatCurrency(amount: number): string {

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: '2-digit',
  }).format(date);
}