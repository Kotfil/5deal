import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageItem } from './message-item/message-item';

interface MessageListProps {
  messages: any[];
  isLoading: boolean;
  currentUserId: string;
  onRead: (id: string) => void;
}

export function MessageList({ messages, isLoading, currentUserId, onRead }: MessageListProps) {
  return (
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
            {messages.map(msg => (
              <MessageItem 
                key={msg.id} 
                message={msg} 
                currentUserId={currentUserId} 
                onRead={onRead} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
