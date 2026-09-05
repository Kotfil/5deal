'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAssetsStore } from '@/store/useAssetsStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateAssetPage() {
  const { user } = useAuthStore();
  const { createAsset } = useAssetsStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'business'
  });

  if (!user) {
    return <div className="text-center py-10">Пожалуйста, войдите в систему, чтобы добавить бизнес.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Добавить новый бизнес на продажу</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Например, Прибыльная кофейня в центре"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Input 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Подробное описание бизнеса..."
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
                placeholder="100000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <select 
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <Button type="submit" className="w-full mt-6">Создать объявление</Button>
        </form>
      </CardContent>
    </Card>
  );
}
