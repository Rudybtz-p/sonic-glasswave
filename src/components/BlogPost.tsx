import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export const BlogPost = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Blog Posts</h2>
        <p className="text-muted-foreground">
          Stay updated with the latest news and features
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-black/80 backdrop-blur-sm border-neon-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-neon-purple" />
              Latest Updates
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