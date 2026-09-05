'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { apiService } from '@/lib/api';
import { toast } from 'sonner';
import { ProfileEditForm } from '@/components/profile/profile-edit-form/profile-edit-form';
import { PROFILE_EDIT_INITIAL_VALUES } from '@/components/profile/profile-edit-form/profile-edit-form.initial';

export default function EditProfilePage() {
  const { user, loginWithId } = useAuthStore();
  const router = useRouter();

  const initialData = useMemo(() => {
    if (!user) return PROFILE_EDIT_INITIAL_VALUES;
    const profile = user.role === 'buyer' ? user.buyerProfile : user.sellerProfile;
    if (!profile) return PROFILE_EDIT_INITIAL_VALUES;
    return {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      company: profile.company || '',
      position: profile.position || '',
      bio: profile.bio || '',
      phone: profile.phone || '',
      country: profile.country || ''
    };
  }, [user]);

  if (!user) {
    return <div className="text-center py-10">Сначала войдите в систему</div>;
  }

  const handleSubmit = async (formData: typeof PROFILE_EDIT_INITIAL_VALUES) => {
    try {
      await apiService.updateUserProfile(user.id, formData);
      toast.success('Профиль обновлен');
      await loginWithId(user.id); // refresh user data in store
      router.push('/profile');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Ошибка обновления');
    }
  };

  return <ProfileEditForm key={user.id} initialData={initialData} onSubmit={handleSubmit} />;
}
