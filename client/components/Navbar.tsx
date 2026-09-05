'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">5Deal</Link>
        <div className="flex gap-4 items-center">
          <Link href="/">
            <Button variant="ghost">Ассеты</Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost">Сообщения</Button>
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile/edit" className="text-sm font-medium hover:underline">
                {user.email}
              </Link>
              <Button variant="outline" onClick={logout}>Выйти</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="outline">Войти</Button>
              </Link>
              <Link href="/register">
                <Button>Регистрация</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
