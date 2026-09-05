export interface MessageItemProps {
  message: any;
  currentUserId: string;
  onRead: (id: string) => void;
}
