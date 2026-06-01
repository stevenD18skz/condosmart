import type { Metadata } from 'next';
import ResidentePageClient from './ResidentePageClient';

export const metadata: Metadata = {
  title: "Panel del Residente — CondoSmart",
  description: "Autorizaciones de visitas, reservas de zonas comunes y soporte virtual en CondoSmart.",
};

export default function ResidentePage() {
  return <ResidentePageClient />;
}
