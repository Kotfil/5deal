'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAssetsStore } from '@/store/useAssetsStore';
import { toast } from 'sonner';
import { AssetCreateForm } from '@/components/asset/asset-create-form/asset-create-form';

export default function CreateAssetPage() {
  const { user } = useAuthStore();
  const { createAsset } = useAssetsStore();
  const router = useRouter();

  if (!user) {
    return <div className="text-center py-10">Пожалуйста, войдите в систему, чтобы добавить бизнес.</div>;
  }

  const handleSubmit = async (formData: any) => {
    if (!formData.title || !formData.description) {
      return toast.error('Заполните обязательные поля');
    }

    try {
      await createAsset({
        ...formData,
        price: Number(formData.price),
        sellerId: user.id
      });
      toast.success('Бизнес успешно добавлен!');
      router.push('/');
    } catch (error) {
      toast.error('Ошибка при создании бизнеса');
    }
  };

  return <AssetCreateForm onSubmit={handleSubmit} />;
}
