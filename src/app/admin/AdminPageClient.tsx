"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPageClient() {
  const router = useRouter();
  return <AdminDashboard onBack={() => router.push('/')} />;
}
