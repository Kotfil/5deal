import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ASSET_CREATE_INITIAL_VALUES, ASSET_CATEGORIES } from './asset-create-form.initial';

interface AssetCreateFormProps {
  onSubmit: (data: typeof ASSET_CREATE_INITIAL_VALUES) => void;
}

export function AssetCreateForm({ onSubmit }: AssetCreateFormProps) {
  const [formData, setFormData] = useState(ASSET_CREATE_INITIAL_VALUES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Добавить новый бизнес на продажу</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Например, Прибыльная кофейня в центре"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Input 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Подробное описание бизнеса..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Цена ($)</Label>
              <Input 
                id="price" 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="100000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {ASSET_CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">Создать объявление</Button>
        </form>
      </CardContent>
    </Card>
  );
}
