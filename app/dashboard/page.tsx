import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  const userLinks = await getLinksByUserId(userId!);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Links</h1>
      {userLinks.length === 0 ? (
        <p className="text-muted-foreground">You have no links yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {userLinks.map((link) => (
            <Card key={link.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Link2 className="h-4 w-4" />
                  /{link.shortCode}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground truncate">{link.originalUrl}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Created {new Date(link.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
