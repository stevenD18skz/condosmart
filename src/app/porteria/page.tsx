import type { Metadata } from 'next';
import PorteriaPageClient from './PorteriaPageClient';

export const metadata: Metadata = {
  title: "Control de Acceso (Portería) — CondoSmart",
  description: "Registro rápido de visitantes, verificación de autorizaciones y control de acceso en CondoSmart.",
};

export default function PorteriaPage() {
  return <PorteriaPageClient />;
}
