"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PorteriaDashboard from '@/components/PorteriaDashboard';

export default function PorteriaPage() {
  const router = useRouter();

  return (
    <PorteriaDashboard onBack={() => router.push('/')} />
  );
}
