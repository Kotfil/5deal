'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useMessagesStore } from '@/store/useMessagesStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const { messages, isLoading, fetchMessages, sendMessage, markAsRead } = useMessagesStore();
  
  const [recipientId, setRecipientId] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (user) {
      fetchMessages(user.id);
    }
  }, [user, fetchMessages]);

  if (!user) {
    return <div className="text-center py-10">Пожалуйста, войдите, чтобы просматривать сообщения.</div>;
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientId || !body) return toast.error('Заполните все поля');

    try {
      await sendMessage({
        senderId: user.id,
        recipientId,
        body
      });
      toast.success('Сообщение отправлено!');
      setBody('');
    } catch (error) {
      toast.error('Ошибка отправки');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Ваши сообщения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && messages.length === 0 ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">У вас пока нет сообщений.</p>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {messages.map(msg => {
                const isReceived = msg.recipient.id === user.id;
                return (
                  <div 
                    key={msg.id} 
                    className={`p-3 rounded-lg text-sm ${isReceived ? 'bg-secondary' : 'border'}`}
                    onClick={() => {
                      if (isReceived && msg.status !== 'read') markAsRead(msg.id);
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-xs opacity-70">
                        {isReceived ? `От: ${msg.sender.email}` : `Кому: ${msg.recipient.email}`}
                      </span>
                      <span className="text-[10px] uppercase opacity-50">{msg.status}</span>
                    </div>
                    <p>{msg.body}</p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Написать сообщение</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label>UUID Получателя</Label>
              <Input 
                value={recipientId}
                onChange={e => setRecipientId(e.target.value)}
                placeholder="UUID пользователя..."
              />
            </div>
            <div className="space-y-2">
              <Label>Сообщение</Label>
              <Input 
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Текст сообщения..."
              />
            </div>
            <Button type="submit" className="w-full">Отправить</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
