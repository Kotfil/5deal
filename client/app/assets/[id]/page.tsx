'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

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
    <div className="max-w-4xl mx-auto space-y-6 mt-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{asset.title}</h1>
          <p className="text-muted-foreground mt-2 uppercase text-sm tracking-wider">{asset.category}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'По запросу'}
          </p>
          {isOwner && (
            <Button variant="outline" className="mt-4" onClick={() => router.push(`/assets/${asset.id}/edit`)}>
              Редактировать
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Описание</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{asset.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация о продавце</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{asset.seller.sellerProfile?.firstName} {asset.seller.sellerProfile?.lastName}</p>
            <p className="text-sm text-muted-foreground">{asset.seller.email}</p>
            {asset.seller.sellerProfile?.bio && <p className="text-sm mt-2">{asset.seller.sellerProfile.bio}</p>}
          </div>
          {!isOwner && (
            <Button onClick={handleContactSeller}>
              Связаться с продавцом
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
