interface MessageItemProps {
  message: any;
  currentUserId: string;
  onRead: (id: string) => void;
}

export function MessageItem({ message, currentUserId, onRead }: MessageItemProps) {
  const isReceived = message.recipient.id === currentUserId;

  return (
    <div 
      className={`p-3 rounded-lg text-sm ${isReceived ? 'bg-secondary' : 'border'}`}
      onClick={() => {
        if (isReceived && message.status !== 'read') onRead(message.id);
      }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-xs opacity-70">
          {isReceived ? `От: ${message.sender.email}` : `Кому: ${message.recipient.email}`}
        </span>
        <span className="text-[10px] uppercase opacity-50">{message.status}</span>
      </div>
      <p>{message.body}</p>
    </div>
  );
}
