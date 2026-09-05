import { Skeleton } from '@/components/ui/skeleton';
import { AssetItem } from './asset-item/asset-item';
import { AssetListProps } from './asset-list.interface';
import { ListGrid, EmptyState } from './asset-list.styles';

export function AssetList({ assets, isLoading, user, onDelete }: AssetListProps) {
  if (isLoading && assets.length === 0) {
    return (
      <ListGrid>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </ListGrid>
    );
  }

  if (assets.length === 0) {
    return (
      <EmptyState>
        Нет доступных ассетов
      </EmptyState>
    );
  }

  return (
    <ListGrid>
      {assets.map((asset) => (
        <AssetItem 
          key={asset.id} 
          asset={asset} 
          user={user} 
          onDelete={onDelete} 
        />
      ))}
    </ListGrid>
  );
}
