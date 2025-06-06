
'use client'; // Mark as client component if using hooks like useParams or managing state

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // For accessing route parameters
import { mockLearningTracks, mockModules } from '@/lib/mock-data';
import type { LearningTrack, Module } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Layers, User, DollarSign, Clock, Users, Target, CheckCircle, Edit3, Share2, CalendarDays } from 'lucide-react';
import { Progress } from '@/components/ui/progress'; // If you want to show progress for the track

// Helper function to simulate fetching a track by ID
async function getTrack(id: string): Promise<LearningTrack | undefined> {
  // In a real app, this would be an API call
  return mockLearningTracks.find(t => t.id === id);
}

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = typeof params.id === 'string' ? params.id : '';
  const [track, setTrack] = useState<LearningTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (trackId) {
      setIsLoading(true);
      getTrack(trackId).then(data => {
        setTrack(data || null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [trackId]);

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Loading track details...</div>;
  }

  if (!track) {
    return <div className="container mx-auto py-10 text-center">Track not found.</div>;
  }

  // Example progress calculation (e.g., 2 out of X modules completed)
  const completedModules = 1; // Replace with actual user progress
  const trackProgress = track.modules.length > 0 ? (completedModules / track.modules.length) * 100 : 0;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Button variant="outline" asChild>
        <Link href="/dashboard/tracks">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tracks
        </Link>
      </Button>

      {/* Header Section */}
      <section className="relative">
        {track.coverImage && (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={track.coverImage}
              alt={track.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="learning online course"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute top-4 right-4 space-x-2">
                <Button variant="secondary" size="sm" className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Track
                </Button>
                <Button variant="secondary" size="sm" className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
            </div>
          </div>
        )}
        <div className={` ${track.coverImage ? 'absolute bottom-0 left-0 p-6 md:p-8 text-white' : 'py-6'}`}>
          {track.isMentorLed && (
            <Badge className="mb-2 bg-accent text-accent-foreground capitalize text-sm px-3 py-1">
              Mentor-Led
            </Badge>
          )}
          <h1 className="text-3xl md:text-5xl font-bold font-headline mb-2">{track.title}</h1>
          <p className={`text-lg md:text-xl ${track.coverImage ? 'text-gray-200' : 'text-muted-foreground'}`}>
            {track.description}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Modules List */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Layers className="mr-2 h-6 w-6 text-primary" />Modules in this Track ({track.modules.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {track.modules.length > 0 ? (
                track.modules.map((module, index) => (
                  <Card key={module.id} className="hover:shadow-md transition-shadow">
                    <Link href={`/dashboard/modules/${module.id}`} className="block">
                      <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                           <CardTitle className="text-lg font-semibold">
                            {index + 1}. {module.title}
                           </CardTitle>
                           <CardDescription className="text-xs text-muted-foreground">
                            {module.category} - {module.estimatedDuration}
                           </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">View Module</Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          Key outcomes: {module.outcomes.join(', ')}
                        </p>
                        {module.tags && module.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {module.tags.slice(0,3).map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                          </div>
                        )}
                      </CardContent>
                    </Link>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">No modules have been added to this track yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Track Info & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Track Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center"><CalendarDays className="h-5 w-5 mr-2 text-primary" /> Created by: {track.creator}</div>
              {track.isMentorLed && track.mentor && (
                <div className="flex items-center"><User className="h-5 w-5 mr-2 text-primary" /> Mentor: {track.mentor}</div>
              )}
              {track.price !== undefined && (
                <div className="flex items-center font-semibold"><DollarSign className="h-5 w-5 mr-2 text-green-600" /> Price: ${track.price.toFixed(2)}</div>
              )}
              <Separator className="my-3" />
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Track Progress (Example)</span>
                  <span>{Math.round(trackProgress)}%</span>
                </div>
                <Progress value={trackProgress} aria-label={`${Math.round(trackProgress)}% completed`} />
              </div>
            </CardContent>
            <CardFooter>
                <Button size="lg" className="w-full">
                    <CheckCircle className="mr-2 h-5 w-5" /> Start Learning / Resume Track
                </Button>
            </CardFooter>
          </Card>

          {track.isMentorLed && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Mentor Support</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Get guidance and support from your mentor, {track.mentor}.</p>
                    <Button variant="outline" className="w-full">Contact Mentor</Button>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

    