import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Key } from 'lucide-react';

interface APIKey {
  name: string;
  key: string;
  service: string;
}

export const APIKeyManager = () => {
  const [apiKeys, setApiKeys] = React.useState<APIKey[]>([]);
  const [newKey, setNewKey] = React.useState({ name: '', key: '', service: '' });

  const handleSaveKey = () => {
    if (!newKey.name || !newKey.key || !newKey.service) {
      toast.error('Please fill in all fields');
      return;
    }

    setApiKeys([...apiKeys, newKey]);
    setNewKey({ name: '', key: '', service: '' });
    toast.success('API key saved successfully');
  };

  const handleDeleteKey = (index: number) => {
    const updatedKeys = apiKeys.filter((_, i) => i !== index);
    setApiKeys(updatedKeys);
    toast.success('API key deleted successfully');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Key Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Key Name</Label>
            <Input
              id="name"
              placeholder="e.g., AI Mastering API"
              value={newKey.name}
              onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="service">Service</Label>
            <Input
              id="service"
              placeholder="e.g., OpenAI, Licensing Service"
              value={newKey.service}
              onChange={(e) => setNewKey({ ...newKey, service: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="key">API Key</Label>
            <Input
              id="key"
              type="password"
              placeholder="Enter your API key"
              value={newKey.key}
              onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
            />
          </div>
          <Button onClick={handleSaveKey} className="w-full">
            Save API Key
          </Button>
        </div>

        {apiKeys.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Saved API Keys</h3>
            <div className="space-y-2">
              {apiKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <p className="text-sm text-muted-foreground">{key.service}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteKey(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};