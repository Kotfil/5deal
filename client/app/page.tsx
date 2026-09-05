'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAssetsStore } from '@/store/useAssetsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AssetList } from '@/components/asset/asset-list/asset-list';

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

      <AssetList 
        assets={assets} 
        isLoading={isLoading} 
        user={user} 
        onDelete={handleDelete} 
      />
    </div>
  );
}
