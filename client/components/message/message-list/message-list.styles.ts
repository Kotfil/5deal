import { styled } from '@linaria/react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const StyledScrollArea = styled(ScrollArea)`
  height: 24rem;
  padding-right: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: var(--muted-foreground);
`;

export const ListSpace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
