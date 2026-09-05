export interface MessageListProps {
  messages: any[];
  isLoading: boolean;
  currentUserId: string;
  onRead: (id: string) => void;
}
