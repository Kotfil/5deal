'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useMessagesStore } from '@/store/useMessagesStore';
import { toast } from 'sonner';
import { MessageView } from '@/components/message/message-view/message-view';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const { messages, isLoading, fetchMessages, sendMessage, markAsRead } = useMessagesStore();

  useEffect(() => {
    if (user) {
      fetchMessages(user.id);
    }
  }, [user, fetchMessages]);

  if (!user) {
    return <div className="text-center py-10">Пожалуйста, войдите, чтобы просматривать сообщения.</div>;
  }

  const handleSend = async (recipientId: string, body: string) => {
    if (!recipientId || !body) return toast.error('Заполните все поля');

    try {
      await sendMessage({
        senderId: user.id,
        recipientId,
        body
      });
      toast.success('Сообщение отправлено!');
    } catch (error) {
      toast.error('Ошибка отправки');
    }
  };

  return (
    <MessageView 
      messages={messages}
      isLoading={isLoading}
      currentUserId={user.id}
      onRead={markAsRead}
      onSend={handleSend}
    />
  );
}
