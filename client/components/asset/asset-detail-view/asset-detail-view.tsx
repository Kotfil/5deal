import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssetDetailViewProps } from './asset-detail-view.interface';
import { Wrapper, HeaderRow, TitleBox, Title, Category, ActionBox, Price, DescriptionText, SellerInfoRow, SellerName, SellerEmail, SellerBio } from './asset-detail-view.styles';

export function AssetDetailView({ asset, isOwner, onEdit, onContactSeller }: AssetDetailViewProps) {
  return (
    <Wrapper>
      <HeaderRow>
        <TitleBox>
          <Title>{asset.title}</Title>
          <Category>{asset.category}</Category>
        </TitleBox>
        <ActionBox>
          <Price>
            {asset.price ? `$${Number(asset.price).toLocaleString()}` : 'По запросу'}
          </Price>
          {isOwner && (
            <Button variant="outline" className="mt-4" onClick={onEdit}>
              Редактировать
            </Button>
          )}
        </ActionBox>
      </HeaderRow>

      <Card>
        <CardHeader>
          <CardTitle>Описание</CardTitle>
        </CardHeader>
        <CardContent>
          <DescriptionText>{asset.description}</DescriptionText>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация о продавце</CardTitle>
        </CardHeader>
        <CardContent>
          <SellerInfoRow>
            <div>
              <SellerName>{asset.seller.sellerProfile?.firstName} {asset.seller.sellerProfile?.lastName}</SellerName>
              <SellerEmail>{asset.seller.email}</SellerEmail>
              {asset.seller.sellerProfile?.bio && <SellerBio>{asset.seller.sellerProfile.bio}</SellerBio>}
            </div>
            {!isOwner && (
              <Button onClick={onContactSeller}>
                Связаться с продавцом
              </Button>
            )}
          </SellerInfoRow>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
