import { ASSET_CREATE_INITIAL_VALUES } from './asset-create-form.initial';

export interface AssetCreateFormProps {
  onSubmit: (data: typeof ASSET_CREATE_INITIAL_VALUES) => void;
}
