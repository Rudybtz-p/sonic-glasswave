import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const Events = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-muted-foreground">
          Stay tuned for upcoming beat battles and producer meetups
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neon-purple" />
              Featured Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};