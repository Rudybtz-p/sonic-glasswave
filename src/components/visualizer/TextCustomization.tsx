import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Type, Sparkles, Zap, Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface TextCustomizationProps {
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onGlowToggle: (enabled: boolean) => void;
  onNeonToggle: (enabled: boolean) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onAnimationChange: (animation: string) => void;
}

export const TextCustomization: React.FC<TextCustomizationProps> = ({
  onTextChange,
  onFontChange,
  onGlowToggle,
  onNeonToggle,
  onSizeChange,
  onColorChange,
  onAnimationChange,
}) => {
  const [text, setText] = useState('');
  const { toast } = useToast();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const handlePresetSelect = (preset: string) => {
    switch(preset) {
      case 'neon':
        onGlowToggle(true);
        onNeonToggle(true);
        onColorChange('#F97316');
        onAnimationChange('pulse');
        toast({
          title: "Neon Preset Applied",
          description: "The neon text effect has been applied.",
        });
        break;
      case 'minimal':
        onGlowToggle(false);
        onNeonToggle(false);
        onColorChange('#FFFFFF');
        onAnimationChange('none');
        toast({
          title: "Minimal Preset Applied",
          description: "The minimal text effect has been applied.",
        });
        break;
      default:
        break;
    }
  };

  return (
    <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5 text-neon-purple" />
          3D Text Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text-input">3D Text</Label>
          <Input
            id="text-input"
            placeholder="Enter text to display..."
            value={text}
            onChange={handleTextChange}
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

        <div className="space-y-2">
          <Label>Text Size</Label>
          <Slider
            defaultValue={[1]}
            max={3}
            min={0.1}
            step={0.1}
            onValueChange={(value) => onSizeChange(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="grid grid-cols-5 gap-2">
            {['#F97316', '#D946EF', '#8B5CF6', '#0EA5E9', '#ffffff'].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/50 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Animation Style</Label>
          <Select onValueChange={onAnimationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="pulse">Pulse</SelectItem>
              <SelectItem value="bounce">Bounce</SelectItem>
              <SelectItem value="rotate">Rotate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neon-purple" />
            <Label htmlFor="glow-effect">Glow Effect</Label>
          </div>
          <Switch id="glow-effect" onCheckedChange={onGlowToggle} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-purple" />
            <Label htmlFor="neon-effect">Neon Effect</Label>
          </div>
          <Switch id="neon-effect" onCheckedChange={onNeonToggle} defaultChecked />
        </div>

        <div className="space-y-2">
          <Label>Quick Presets</Label>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handlePresetSelect('neon')}
            >
              Neon Style
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handlePresetSelect('minimal')}
            >
              Minimal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};