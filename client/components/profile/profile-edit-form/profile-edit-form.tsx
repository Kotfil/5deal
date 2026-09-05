import { useState } from 'react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ProfileEditFormProps } from './profile-edit-form.interface';
import { StyledCard, FormSpace, InputGroup, GridGroup } from './profile-edit-form.styles';

export function ProfileEditForm({ initialData, onSubmit }: ProfileEditFormProps) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>Редактирование профиля</CardTitle>
      </CardHeader>
      <CardContent>
        <FormSpace onSubmit={handleSubmit}>
          <GridGroup>
            <InputGroup>
              <Label>Имя</Label>
              <Input 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>Фамилия</Label>
              <Input 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </InputGroup>
          </GridGroup>
          <InputGroup>
            <Label>О себе (Bio)</Label>
            <Input 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </InputGroup>
          <GridGroup>
            <InputGroup>
              <Label>Компания</Label>
              <Input 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>Должность</Label>
              <Input 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </InputGroup>
          </GridGroup>
          <GridGroup>
            <InputGroup>
              <Label>Телефон</Label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <Label>Страна</Label>
              <Input 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              />
            </InputGroup>
          </GridGroup>
          <Button type="submit" className="w-full mt-4">Сохранить изменения</Button>
        </FormSpace>
      </CardContent>
    </StyledCard>
  );
}
