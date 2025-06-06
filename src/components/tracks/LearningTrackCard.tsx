import Image from 'next/image';
import Link from 'next/link';
import type { LearningTrack } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layers, User, DollarSignSign, ArrowRight } from 'lucide-react';

interface LearningTrackCardProps {
  track: LearningTrack;
}

export function LearningTrackCard({ track }: LearningTrackProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        {track.coverImage && (
          <div className="relative w-full h-48">
            <Image
              src={track.coverImage}
              alt={track.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="learning path"
            />
          </div>
        )}
        <div className="p-6">
          {track.isMentorLed && (
            <Badge className="mb-2 bg-accent text-accent-foreground">Mentor-Led</Badge>
          )}
          <CardTitle className="text-xl mb-1 font-headline">{track.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {track.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Layers className="h-4 w-4 mr-2 text-primary" />
          <span>{track.modules.length} Modules</span>
        </div>
        {track.isMentorLed && track.mentor && (
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2 text-primary" />
            <span>Mentor: {track.mentor}</span>
          </div>
        )}
        {track.price && (
          <div className="flex items-center text-sm font-semibold">
            <DollarSignSign className="h-4 w-4 mr-2 text-green-600" />
            <span>${track.price.toFixed(2)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full">
          <Link href={`/dashboard/tracks/${track.id}`}>
            View Track <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
