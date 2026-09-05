'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [uuid, setUuid] = useState('');
  const { user, loginWithId, logout } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid) return toast.error('Введите UUID');
    
    try {
      await loginWithId(uuid);
      toast.success('Успешный вход!');
      router.push('/');
    } catch (error) {
      toast.error('Не удалось войти с этим UUID');
    }
  };

  if (user) {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Ваш профиль</CardTitle>
          <CardDescription>Вы вошли как {user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground text-xs uppercase">Ваш ID (UUID)</Label>
            <p className="font-mono text-sm break-all">{user.id}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs uppercase">Роль</Label>
            <p className="capitalize">{user.role}</p>
          </div>
          <Button onClick={logout} variant="outline" className="w-full">Выйти</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Тестовый вход</CardTitle>
        <CardDescription>
          Введите UUID существующего пользователя, чтобы выполнять запросы от его имени.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="uuid">Ваш UUID</Label>
            <Input 
              id="uuid" 
              placeholder="e.g. 42adb330-0125-4207-9466-aa9879f4fe66" 
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Войти по UUID</Button>
        </form>
      </CardContent>
    </Card>
  );
}
