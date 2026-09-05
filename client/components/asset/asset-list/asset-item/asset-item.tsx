import Link from 'next/link';
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssetItemProps } from './asset-item.interface';
import { StyledCard, StyledDescription, StyledPriceRow, StyledPrice, StyledCategory } from './asset-item.styles';

export function AssetItem({ asset, user, onDelete }: AssetItemProps) {
  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>{asset.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <StyledDescription>
          {asset.description}
        </StyledDescription>
        <StyledPriceRow>
          <StyledPrice>
            {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'Цена по запросу'}
          </StyledPrice>
          <StyledCategory>
            {asset.category}
          </StyledCategory>
        </StyledPriceRow>
      </CardContent>
      <CardFooter className="gap-2">
        <Link href={`/assets/${asset.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            Подробнее
          </Button>
        </Link>
        {user && user.id === asset.seller.id && (
          <Button variant="destructive" onClick={() => onDelete(asset.id)}>
            Удалить
          </Button>
        )}
      </CardFooter>
    </StyledCard>
  );
}
