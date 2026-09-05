'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { RegisterForm } from '@/components/auth/register-form/register-form';
import { REGISTER_INITIAL_VALUES } from '@/components/auth/register-form/register-form.initial';

export default function RegisterPage() {
  const { registerUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (formData: typeof REGISTER_INITIAL_VALUES) => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      return toast.error('Заполните все поля');
    }

    try {
      await registerUser(formData);
      toast.success('Регистрация прошла успешно!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}
