import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, Layers, BrainCircuit, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4 font-headline">Welcome to CurricuLink!</h1>
        <p className="text-muted-foreground text-lg">
          This is your hub to discover, create, and manage your learning journey.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <LayoutGrid className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Module Marketplace</CardTitle>
            <CardDescription>Explore existing modules or propose new ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/modules">Go to Modules</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Layers className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Learning Tracks</CardTitle>
            <CardDescription>Build custom learning paths or follow curated tracks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/tracks">Manage Tracks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BrainCircuit className="h-8 w-8 text-primary mb-2" />
            <CardTitle>AI Path Suggestions</CardTitle>
            <CardDescription>Get personalized learning path recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/ai-paths">Generate AI Path</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Ready to contribute?</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Share your expertise by proposing a new module or helping co-create existing ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/modules#propose"> {/* Link to propose section/dialog */}
                <PlusCircle className="mr-2 h-4 w-4" /> Propose a Module
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
