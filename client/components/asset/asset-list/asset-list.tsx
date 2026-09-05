import { Skeleton } from '@/components/ui/skeleton';
import { AssetItem } from './asset-item/asset-item';

interface AssetListProps {
  assets: any[];
  isLoading: boolean;
  user: any;
  onDelete: (id: string) => void;
}

export function AssetList({ assets, isLoading, user, onDelete }: AssetListProps) {
  if (isLoading && assets.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Нет доступных ассетов
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <AssetItem 
          key={asset.id} 
          asset={asset} 
          user={user} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
