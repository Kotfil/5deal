'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAssetsStore } from '@/store/useAssetsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Home() {
  const { assets, isLoading, fetchAssets, deleteAsset } = useAssetsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id);
      toast.success('Ассет успешно удален');
    } catch (error) {
      toast.error('Ошибка при удалении ассета');
    }
  };

  if (isLoading && assets.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Доступные бизнесы</h1>
        {user && (
          <Link href="/assets/create">
            <Button>Добавить бизнес</Button>
          </Link>
        )}
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Нет доступных ассетов
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <Card key={asset.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{asset.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {asset.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-primary">
                    {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'Цена по запросу'}
                  </span>
                  <span className="bg-muted px-2 py-1 rounded-md text-xs uppercase tracking-wider">
                    {asset.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Link href={`/assets/${asset.id}`} className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Подробнее
                  </Button>
                </Link>
                {user && user.id === asset.seller.id && (
                  <Button variant="destructive" onClick={() => handleDelete(asset.id)}>
                    Удалить
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
