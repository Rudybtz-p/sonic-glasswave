import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Type } from 'lucide-react';

interface TextCustomizationProps {
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onGlowToggle: (enabled: boolean) => void;
  onNeonToggle: (enabled: boolean) => void;
}

export const TextCustomization: React.FC<TextCustomizationProps> = ({
  onTextChange,
  onFontChange,
  onGlowToggle,
  onNeonToggle,
}) => {
  console.log('Rendering TextCustomization component');
  
  return (
    <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5 text-neon-purple" />
          Text Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text-input">3D Text</Label>
          <Input
            id="text-input"
            placeholder="Enter text to display..."
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="font-select">Font Style</Label>
          <Select onValueChange={onFontChange}>
            <SelectTrigger id="font-select">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="helvetiker">Helvetiker</SelectItem>
              <SelectItem value="droid">Droid Sans</SelectItem>
              <SelectItem value="optimer">Optimer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="glow-effect">Glow Effect</Label>
          <Switch id="glow-effect" onCheckedChange={onGlowToggle} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="neon-effect">Neon Effect</Label>
          <Switch id="neon-effect" onCheckedChange={onNeonToggle} defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
};