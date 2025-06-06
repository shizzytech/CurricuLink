import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LearningTrackCard } from '@/components/tracks/LearningTrackCard';
import { mockLearningTracks, mockModules } from '@/lib/mock-data';
import { PlusCircle, Search, ListChecks, Edit3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function TracksPage() {
  const learningTracks = mockLearningTracks;
  // In a real app, availableModules would be fetched or filtered.
  const availableModules = mockModules.slice(0,5); 

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Learning Tracks</h1>
          <p className="text-muted-foreground">Curate your custom learning paths or explore existing tracks.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Track
        </Button>
      </section>
      
      {/* Display Existing Tracks */}
      {learningTracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Your Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTracks.map((track) => (
              <LearningTrackCard key={track.id} track={track} />
            ))}
          </div>
        </section>
      )}

      {/* Curriculum Builder Section - Simplified */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center"><ListChecks className="mr-2 h-6 w-6 text-primary" /> Curriculum Builder</CardTitle>
            <CardDescription>
              Drag and drop available modules to create or edit your learning tracks.
              (Drag-and-drop functionality is a future enhancement. Below is a conceptual representation.)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column for Available Modules */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-semibold text-lg font-headline">Available Modules</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search modules..." className="pl-9" />
              </div>
              <ScrollArea className="h-96 p-1 border rounded-md">
                <div className="space-y-2 p-3">
                {availableModules.map(module => (
                  <Card key={module.id} className="p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-medium text-sm">{module.title}</p>
                    <p className="text-xs text-muted-foreground">{module.category} - {module.estimatedDuration}</p>
                  </Card>
                ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>

            {/* Column for Current Track (Example) */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg font-headline">Editing: My Custom Data Science Track</h3>
                <Button variant="outline" size="sm"><Edit3 className="mr-2 h-4 w-4" /> Rename</Button>
              </div>
              <ScrollArea className="h-96 p-1 border rounded-md bg-muted/20">
                <div className="p-4 space-y-3 min-h-[200px]">
                  {/* Placeholder for modules in the track */}
                  {learningTracks.length > 0 && learningTracks[0].modules.map((module, index) => (
                     <Card key={module.id} className="p-3 bg-background shadow-sm">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm">{index + 1}. {module.title}</p>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">Remove</Button>
                        </div>
                        <Badge variant="outline" className="mt-1">{module.estimatedDuration}</Badge>
                      </Card>
                  ))}
                   {learningTracks.length === 0 || learningTracks[0].modules.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <p>Drag modules here to build your track.</p>
                    </div>
                  )}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <Button className="w-full">Save Track</Button>
            </div>
          </CardContent>
        </Card>
      </section>


      {learningTracks.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          You haven&apos;t created or joined any learning tracks yet.
        </p>
      )}
    </div>
  );
}
