import { MessageList } from '../message-list/message-list';
import { MessageForm } from '../message-form/message-form';
import { MessageViewProps } from './message-view.interface';
import { GridContainer } from './message-view.styles';

export function MessageView({ messages, isLoading, currentUserId, onRead, onSend }: MessageViewProps) {
  return (
    <GridContainer>
      <MessageList 
        messages={messages}
        isLoading={isLoading}
        currentUserId={currentUserId}
        onRead={onRead}
      />
      <MessageForm onSend={onSend} />
    </GridContainer>
  );
}
