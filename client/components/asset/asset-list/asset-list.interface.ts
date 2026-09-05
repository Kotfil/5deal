export interface AssetListProps {
  assets: any[];
  isLoading: boolean;
  user: any;
  onDelete: (id: string) => void;
}
