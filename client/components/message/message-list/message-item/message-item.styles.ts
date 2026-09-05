import { styled } from '@linaria/react';

export const ItemWrapper = styled.div<{ $isReceived: boolean }>`
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: ${props => props.$isReceived ? 'var(--secondary)' : 'transparent'};
  border: ${props => props.$isReceived ? 'none' : '1px solid var(--border)'};
  cursor: pointer;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const SenderLabel = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
  opacity: 0.7;
`;

export const StatusLabel = styled.span`
  font-size: 0.625rem;
  text-transform: uppercase;
  opacity: 0.5;
`;
