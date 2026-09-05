import { MessageItemProps } from './message-item.interface';
import { ItemWrapper, HeaderRow, SenderLabel, StatusLabel } from './message-item.styles';

export function MessageItem({ message, currentUserId, onRead }: MessageItemProps) {
  const isReceived = message.recipient.id === currentUserId;

  return (
    <ItemWrapper 
      $isReceived={isReceived}
      onClick={() => {
        if (isReceived && message.status !== 'read') onRead(message.id);
      }}
    >
      <HeaderRow>
        <SenderLabel>
          {isReceived ? `От: ${message.sender.email}` : `Кому: ${message.recipient.email}`}
        </SenderLabel>
        <StatusLabel>{message.status}</StatusLabel>
      </HeaderRow>
      <p>{message.body}</p>
    </ItemWrapper>
  );
}
