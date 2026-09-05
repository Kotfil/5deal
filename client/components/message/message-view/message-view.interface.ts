export interface MessageViewProps {
  messages: any[];
  isLoading: boolean;
  currentUserId: string;
  onRead: (id: string) => void;
  onSend: (recipientId: string, body: string) => void;
}
