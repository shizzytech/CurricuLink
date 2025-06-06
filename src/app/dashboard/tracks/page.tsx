
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LearningTrackCard } from '@/components/tracks/LearningTrackCard';
import { mockLearningTracks, mockModules } from '@/lib/mock-data';
import type { LearningTrack, Module } from '@/types';
import { PlusCircle, Search, ListChecks, Edit3, Save, Trash2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const initialNewTrack: LearningTrack = {
  id: '', // Will be generated on save
  title: 'My New Track',
  description: 'A custom learning path.',
  modules: [],
  creator: 'User', // Or get from auth context
  isMentorLed: false,
  coverImage: 'https://placehold.co/600x400.png',
};

export default function TracksPage() {
  const [learningTracks, setLearningTracks] = useState<LearningTrack[]>(mockLearningTracks);
  const [availableModules, setAvailableModules] = useState<Module[]>(mockModules);
  const [editingTrack, setEditingTrack] = useState<LearningTrack | null>(null);
  const [editingTrackTitle, setEditingTrackTitle] = useState('');
  const { toast } = useToast();

  // Effect to initialize title when editingTrack changes
  useEffect(() => {
    if (editingTrack) {
      setEditingTrackTitle(editingTrack.title);
    }
  }, [editingTrack]);

  const handleCreateNewTrack = () => {
    const newTrack = { 
      ...initialNewTrack, 
      id: `new-${Date.now().toString()}` // Temporary ID for editing
    };
    setEditingTrack(newTrack);
  };

  const handleEditTrack = (track: LearningTrack) => {
    setEditingTrack({...track}); // Create a copy to avoid direct mutation
  }

  const handleAddModuleToTrack = (moduleToAdd: Module) => {
    if (editingTrack) {
      // Prevent adding duplicate modules
      if (editingTrack.modules.find(m => m.id === moduleToAdd.id)) {
        toast({
          title: "Module Already Added",
          description: `${moduleToAdd.title} is already in this track.`,
          variant: "default",
        });
        return;
      }
      setEditingTrack(prev => prev ? { ...prev, modules: [...prev.modules, moduleToAdd] } : null);
    }
  };

  const handleRemoveModuleFromTrack = (moduleIdToRemove: string) => {
    if (editingTrack) {
      setEditingTrack(prev => prev ? { ...prev, modules: prev.modules.filter(m => m.id !== moduleIdToRemove) } : null);
    }
  };

  const handleSaveTrack = () => {
    if (editingTrack) {
      const trackToSave = { ...editingTrack, title: editingTrackTitle };
      
      // Check if it's a new track (using the temporary ID logic) or an existing one
      const existingTrackIndex = learningTracks.findIndex(t => t.id === trackToSave.id);

      if (existingTrackIndex !== -1 && !trackToSave.id.startsWith('new-')) {
        // Update existing track
        const updatedTracks = [...learningTracks];
        updatedTracks[existingTrackIndex] = trackToSave;
        setLearningTracks(updatedTracks);
        toast({ title: "Track Updated!", description: `${trackToSave.title} has been saved.` });
      } else {
        // Add new track (generate a more "permanent" mock ID)
        const newTrackWithPermanentId = { ...trackToSave, id: `track-${Date.now().toString()}` };
        setLearningTracks(prevTracks => [newTrackWithPermanentId, ...prevTracks]);
        toast({ title: "Track Created!", description: `${newTrackWithPermanentId.title} has been added.` });
      }
      setEditingTrack(null); // Clear editing state
    }
  };

  const handleCancelEdit = () => {
    setEditingTrack(null);
  };


  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Learning Tracks</h1>
          <p className="text-muted-foreground">Curate your custom learning paths or explore existing tracks.</p>
        </div>
        <Button onClick={handleCreateNewTrack} disabled={!!editingTrack}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Track
        </Button>
      </section>
      
      {learningTracks.length > 0 && !editingTrack && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Your Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTracks.map((track) => (
              <div key={track.id} className="relative">
                <LearningTrackCard track={track} />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditTrack(track)}
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Curriculum Builder Section */}
      {editingTrack && (
        <section>
          <Card className="border-primary border-2 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline flex items-center">
                  <ListChecks className="mr-2 h-6 w-6 text-primary" /> 
                  {editingTrack.id.startsWith('new-') ? "Create New Learning Track" : `Editing: ${editingTrack.title}`}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={handleCancelEdit} className="text-muted-foreground hover:text-destructive">
                  <XCircle />
                  <span className="sr-only">Cancel Edit</span>
                </Button>
              </div>
              <CardDescription>
                Build your learning track by adding modules.
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
                    <Card 
                      key={module.id} 
                      className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleAddModuleToTrack(module)}
                    >
                      <p className="font-medium text-sm">{module.title}</p>
                      <p className="text-xs text-muted-foreground">{module.category} - {module.estimatedDuration}</p>
                    </Card>
                  ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>

              {/* Column for Current Track */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="trackTitle" className="font-semibold text-lg font-headline">Track Title</label>
                  <Input 
                    id="trackTitle"
                    value={editingTrackTitle}
                    onChange={(e) => setEditingTrackTitle(e.target.value)}
                    placeholder="Enter track title"
                    className="text-lg"
                  />
                </div>
                
                <h3 className="font-semibold text-lg font-headline pt-2">Modules in this Track ({editingTrack.modules.length})</h3>
                <ScrollArea className="h-[280px] p-1 border rounded-md bg-muted/20">
                  <div className="p-4 space-y-3 min-h-[150px]">
                    {editingTrack.modules.map((module, index) => (
                       <Card key={module.id} className="p-3 bg-background shadow-sm">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-sm"><span className="text-muted-foreground mr-2">{index + 1}.</span> {module.title}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                              onClick={() => handleRemoveModuleFromTrack(module.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Badge variant="outline" className="mt-1 ml-5">{module.estimatedDuration}</Badge>
                        </Card>
                    ))}
                     {editingTrack.modules.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                        <p>Click on modules from the "Available Modules" list to add them here.</p>
                      </div>
                    )}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleSaveTrack} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save Track
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outline" className="w-full">
                     Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}


      {learningTracks.length === 0 && !editingTrack && (
        <p className="text-center text-muted-foreground py-10">
          You haven&apos;t created or joined any learning tracks yet. Click "Create New Track" to start.
        </p>
      )}
    </div>
  );
}

    