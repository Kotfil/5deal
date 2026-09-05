import { styled } from '@linaria/react';

export const ListGrid = styled.div`
  display: grid;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: var(--muted-foreground);
`;
