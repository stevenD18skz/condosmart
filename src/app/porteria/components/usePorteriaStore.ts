import { useState, useCallback } from 'react';
import { VisitRecord } from '@/types';
import { MOCK_VISIT_RECORDS } from '@/lib/mockData';

export type VisitorFilter = 'all' | 'inside' | 'exited';

export function usePorteriaStore() {
  const [records, setRecords] = useState<VisitRecord[]>(MOCK_VISIT_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<VisitorFilter>('all');

  const activeCount = records.filter((r) => r.status === 'inside').length;
  const exitedCount = records.filter((r) => r.status === 'exited').length;
  const totalToday = records.length;

  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = q
      ? r.visitor_name.toLowerCase().includes(q) ||
        r.apartment_destination.toLowerCase().includes(q) ||
        r.visitor_document.toLowerCase().includes(q) ||
        r.visitor_vehicle.toLowerCase().includes(q)
      : true;
    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'inside'
        ? r.status === 'inside'
        : r.status === 'exited';
    return matchSearch && matchFilter;
  });

  const registerEntry = useCallback(
    (data: {
      name: string;
      document: string;
      plate: string;
      apartment: string;
      notes: string;
      type: string;
    }) => {
      const newRecord: VisitRecord = {
        id: `v-${Date.now()}`,
        condo_id: 'c1',
        visitor_id: null,
        visitor_name: data.name,
        visitor_document: data.document,
        visitor_vehicle: data.plate,
        authorized_by: null,
        registered_by: 'p3',
        apartment_destination: data.apartment,
        entry_at: new Date().toISOString(),
        exit_at: null,
        notes: data.notes,
        status: 'inside',
        created_at: new Date().toISOString(),
      };
      setRecords((prev) => [newRecord, ...prev]);
      return newRecord;
    },
    []
  );

  const registerExit = useCallback((id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'exited', exit_at: new Date().toISOString() }
          : r
      )
    );
  }, []);

  const lastRecord = records[0] ?? null;

  return {
    records,
    filteredRecords,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    activeCount,
    exitedCount,
    totalToday,
    registerEntry,
    registerExit,
    lastRecord,
  };
}
