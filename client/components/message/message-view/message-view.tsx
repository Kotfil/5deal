import { MessageList } from '../message-list/message-list';
import { MessageForm } from '../message-form/message-form';

interface MessageViewProps {
  messages: any[];
  isLoading: boolean;
  currentUserId: string;
  onRead: (id: string) => void;
  onSend: (recipientId: string, body: string) => void;
}

export function MessageView({ messages, isLoading, currentUserId, onRead, onSend }: MessageViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <MessageList 
        messages={messages}
        isLoading={isLoading}
        currentUserId={currentUserId}
        onRead={onRead}
      />
      <MessageForm onSend={onSend} />
    </div>
  );
}
