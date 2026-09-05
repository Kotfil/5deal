import { PROFILE_EDIT_INITIAL_VALUES } from './profile-edit-form.initial';

export interface ProfileEditFormProps {
  initialData: typeof PROFILE_EDIT_INITIAL_VALUES;
  onSubmit: (data: typeof PROFILE_EDIT_INITIAL_VALUES) => void;
}
