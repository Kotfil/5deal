'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAssetsStore } from '@/store/useAssetsStore';
import { apiService } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function EditAssetPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { updateAsset } = useAssetsStore();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'business'
  });

  useEffect(() => {
    if (params.id) {
      apiService.getAssetById(params.id as string)
        .then(data => {
          if (user?.id !== data.seller.id) {
            toast.error('У вас нет прав для редактирования этого ассета');
            router.push('/');
            return;
          }
          setFormData({
            title: data.title || '',
            description: data.description || '',
            price: data.price ? String(data.price) : '',
            category: data.category || 'business'
          });
          setLoading(false);
        })
        .catch(() => {
          toast.error('Не удалось загрузить данные ассета');
          router.push('/');
        });
    }
  }, [params.id, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return toast.error('Заполните обязательные поля');
    }

    try {
      await updateAsset(params.id as string, {
        ...formData,
        price: formData.price ? Number(formData.price) : undefined
      });
      toast.success('Бизнес успешно обновлен!');
      router.push(`/assets/${params.id}`);
    } catch (error) {
      toast.error('Ошибка при обновлении бизнеса');
    }
  };

  if (loading) {
    return <Skeleton className="w-full max-w-2xl mx-auto h-[400px] mt-10" />;
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Редактировать бизнес</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Input 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Цена ($)</Label>
              <Input 
                id="price" 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <select 
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="business">Бизнес</option>
                <option value="real_estate">Недвижимость</option>
                <option value="startup">Стартап</option>
                <option value="franchise">Франшиза</option>
                <option value="other">Другое</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">Сохранить изменения</Button>
        </form>
      </CardContent>
    </Card>
  );
}
