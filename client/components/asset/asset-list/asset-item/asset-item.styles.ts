import { styled } from '@linaria/react';
import { Card } from '@/components/ui/card';

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

export const StyledDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--muted-foreground);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

export const StyledPrice = styled.span`
  font-weight: 600;
  color: var(--primary);
`;

export const StyledCategory = styled.span`
  background-color: var(--muted);
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
