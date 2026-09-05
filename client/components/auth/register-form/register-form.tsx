import { useState } from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REGISTER_INITIAL_VALUES, REGISTER_ROLES } from './register-form.initial';
import { RegisterFormProps } from './register-form.interface';
import { StyledCard, FormSpace, InputGroup, GridGroup } from './register-form.styles';

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState(REGISTER_INITIAL_VALUES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <FormSpace onSubmit={handleSubmit}>
          <GridGroup>
            <InputGroup>
              <Label htmlFor="firstName">Имя</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </InputGroup>
          </GridGroup>
          
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Пароль</Label>
            <Input 
              id="password" 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="role">Роль</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value || 'buyer'})}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                {REGISTER_ROLES.map(role => (
                  <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputGroup>

          <Button type="submit" className="w-full mt-4">Зарегистрироваться</Button>
        </FormSpace>
      </CardContent>
    </StyledCard>
  );
}
