'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { apiService } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function EditProfilePage() {
  const { user, loginWithId } = useAuthStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    bio: '',
    phone: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      const profile = user.role === 'buyer' ? user.buyerProfile : user.sellerProfile;
      if (profile) {
        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          company: profile.company || '',
          position: profile.position || '',
          bio: profile.bio || '',
          phone: profile.phone || '',
          country: profile.country || ''
        });
      }
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-10">Сначала войдите в систему</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateUserProfile(user.id, formData);
      toast.success('Профиль обновлен');
      await loginWithId(user.id); // refresh user data in store
      router.push('/profile');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Ошибка обновления');
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Редактирование профиля</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Фамилия</Label>
              <Input 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>О себе (Bio)</Label>
            <Input 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Компания</Label>
              <Input 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Должность</Label>
              <Input 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Телефон</Label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Страна</Label>
              <Input 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">Сохранить изменения</Button>
        </form>
      </CardContent>
    </Card>
  );
}
