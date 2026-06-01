import type { Metadata } from 'next';
import AdminPageClient from './AdminPageClient';

export const metadata: Metadata = {
  title: "Administrador — CondoSmart",
  description: "Panel de control centralizado, reportes, comunicados y gestión integral de CondoSmart.",
};

export default function AdminPage() {
  return <AdminPageClient />;
}
