"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ResidenteDashboard from '@/components/ResidenteDashboard';

export default function ResidentePage() {
  const router = useRouter();

  return (
    <ResidenteDashboard onBack={() => router.push('/')} />
  );
}
