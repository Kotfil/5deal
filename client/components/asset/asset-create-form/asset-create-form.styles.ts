import { styled } from '@linaria/react';
import { Card } from '@/components/ui/card';

export const StyledCard = styled(Card)`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
`;

export const FormSpace = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GridGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;
