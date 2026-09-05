import { styled } from '@linaria/react';


export const Wrapper = styled.div`
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleBox = styled.div`
  display: block;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
`;

export const Category = styled.p`
  margin-top: 0.5rem;
  text-transform: uppercase;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  color: var(--muted-foreground);
`;

export const ActionBox = styled.div`
  text-align: right;
`;

export const Price = styled.p`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--primary);
`;

export const DescriptionText = styled.p`
  white-space: pre-wrap;
`;

export const SellerInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SellerName = styled.p`
  font-weight: 600;
`;

export const SellerEmail = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--muted-foreground);
`;

export const SellerBio = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.5rem;
`;
