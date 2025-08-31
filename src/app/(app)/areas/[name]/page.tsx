import React from 'react';
import { notFound } from 'next/navigation';
import { areasOfService } from '@/lib/data';
import AreaDetailClient from '@/components/area-detail-client';

export async function generateStaticParams() {
  return areasOfService.map((area) => ({
    name: encodeURIComponent(area.name),
  }))
}

export default function AreaDetailPage({ params }: { params: { name: string } }) {
  const areaName = decodeURIComponent(params.name as string);
  const area = areasOfService.find(a => a.name === areaName);

  if (!area) {
    notFound();
  }

  return <AreaDetailClient area={area} />;
}
