import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AssetItemProps {
  asset: any;
  user: any;
  onDelete: (id: string) => void;
}

export function AssetItem({ asset, user, onDelete }: AssetItemProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{asset.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {asset.description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-primary">
            {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'Цена по запросу'}
          </span>
          <span className="bg-muted px-2 py-1 rounded-md text-xs uppercase tracking-wider">
            {asset.category}
          </span>
        </div>
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
    </Card>
  );
}
