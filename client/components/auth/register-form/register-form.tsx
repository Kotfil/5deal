import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REGISTER_INITIAL_VALUES, REGISTER_ROLES } from './register-form.initial';

interface RegisterFormProps {
  onSubmit: (data: typeof REGISTER_INITIAL_VALUES) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState(REGISTER_INITIAL_VALUES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input 
              id="password" 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Роль</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                {REGISTER_ROLES.map(role => (
                  <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-4">Зарегистрироваться</Button>
        </form>
      </CardContent>
    </Card>
  );
}
