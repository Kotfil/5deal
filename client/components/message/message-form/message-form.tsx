import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MessageFormProps {
  onSend: (recipientId: string, body: string) => void;
}

export function MessageForm({ onSend }: MessageFormProps) {
  const [recipientId, setRecipientId] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(recipientId, body);
    setBody(''); // We clear the body on successful submit ideally, but we'll do it here for simplicity
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Написать сообщение</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
  );
}
