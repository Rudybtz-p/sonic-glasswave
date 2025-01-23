import React from 'react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { ColorPicker } from '../ui/color-picker';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Settings } from 'lucide-react';

interface CubeCustomizationProps {
  onRotationSpeedChange: (speed: number) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

export const CubeCustomization: React.FC<CubeCustomizationProps> = ({
  onRotationSpeedChange,
  onColorChange,
  onSizeChange,
}) => {
  return (
    <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-neon-purple" />
          Cube Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rotation-speed">Rotation Speed</Label>
          <Slider
            id="rotation-speed"
            min={0}
            max={10}
            step={0.1}
            defaultValue={[1]}
            onValueChange={(value) => onRotationSpeedChange(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cube-size">Cube Size</Label>
          <Slider
            id="cube-size"
            min={0.5}
            max={3}
            step={0.1}
            defaultValue={[1]}
            onValueChange={(value) => onSizeChange(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Cube Color</Label>
          <div className="grid grid-cols-5 gap-2">
            {['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#ffffff'].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/50 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};