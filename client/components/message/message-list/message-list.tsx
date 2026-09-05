import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageItem } from './message-item/message-item';
import { MessageListProps } from './message-list.interface';
import { StyledScrollArea, EmptyState, ListSpace } from './message-list.styles';

export function MessageList({ messages, isLoading, currentUserId, onRead }: MessageListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваши сообщения</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && messages.length === 0 ? (
          <ListSpace>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </ListSpace>
        ) : messages.length === 0 ? (
          <EmptyState>
            Нет сообщений
          </EmptyState>
        ) : (
          <StyledScrollArea>
            <ListSpace>
              {messages.map((message) => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  currentUserId={currentUserId}
                  onRead={onRead}
                />
              ))}
            </ListSpace>
          </StyledScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
