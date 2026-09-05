import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AssetDetailViewProps {
  asset: any;
  isOwner: boolean;
  onEdit: () => void;
  onContactSeller: () => void;
}

export function AssetDetailView({ asset, isOwner, onEdit, onContactSeller }: AssetDetailViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{asset.title}</h1>
          <p className="text-muted-foreground mt-2 uppercase text-sm tracking-wider">{asset.category}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'По запросу'}
          </p>
          {isOwner && (
            <Button variant="outline" className="mt-4" onClick={onEdit}>
              Редактировать
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Описание</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{asset.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация о продавце</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{asset.seller.sellerProfile?.firstName} {asset.seller.sellerProfile?.lastName}</p>
            <p className="text-sm text-muted-foreground">{asset.seller.email}</p>
            {asset.seller.sellerProfile?.bio && <p className="text-sm mt-2">{asset.seller.sellerProfile.bio}</p>}
          </div>
          {!isOwner && (
            <Button onClick={onContactSeller}>
              Связаться с продавцом
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
