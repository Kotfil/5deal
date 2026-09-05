import { REGISTER_INITIAL_VALUES } from './register-form.initial';

export interface RegisterFormProps {
  onSubmit: (data: typeof REGISTER_INITIAL_VALUES) => void;
}
