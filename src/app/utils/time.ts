
const timeAgo = (iso: string): string => {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 1) return 'justo ahora';
  if (diff < 60) return `hace ${Math.round(diff)} min`;
  return `hace ${Math.round(diff / 60)}h`;
}

export { timeAgo }