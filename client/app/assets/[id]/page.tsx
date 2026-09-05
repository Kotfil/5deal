'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { AssetDetailView } from '@/components/asset/asset-detail-view/asset-detail-view';

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      apiService.getAssetById(params.id as string)
        .then(data => {
          setAsset(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error('Не удалось загрузить данные ассета');
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return <Skeleton className="w-full max-w-3xl mx-auto h-[400px] mt-10" />;
  }

  if (!asset) {
    return <div className="text-center py-10">Ассет не найден</div>;
  }

  const isOwner = user?.id === asset.seller.id;

  const handleContactSeller = () => {
    if (!user) {
      return toast.info('Сначала войдите в систему');
    }
    // Simple mock logic: normally we'd route to a specific chat, but here we just copy the ID or route to messages
    toast.success('Скопируйте UUID продавца: ' + asset.seller.id);
    router.push('/messages');
  };

  return (
    <AssetDetailView 
      asset={asset}
      isOwner={isOwner}
      onEdit={() => router.push(`/assets/${asset.id}/edit`)}
      onContactSeller={handleContactSeller}
    />
  );
}
