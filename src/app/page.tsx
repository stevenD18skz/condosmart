"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import RoleSelector from '@/components/RoleSelector';
import { Role } from '@/types';

export default function HomePage() {
  const router = useRouter();

  const handleSelectRole = (role: Role) => {
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-all duration-300">
      <RoleSelector onSelectRole={handleSelectRole} />
    </div>
  );
}
