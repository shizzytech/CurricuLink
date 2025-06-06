import Image from 'next/image';
import Link from 'next/link';
import type { Module } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, DollarSign, Clock, Users, Target, Eye } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        {module.coverImage && (
          <div className="relative w-full h-48">
            <Image
              src={module.coverImage}
              alt={module.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="course topic"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <Badge variant={module.status === 'live' ? 'default' : 'secondary'} className="capitalize">
              {module.status}
            </Badge>
            {module.category && <Badge variant="outline">{module.category}</Badge>}
          </div>
          <CardTitle className="text-xl mb-1 font-headline">{module.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {module.outcomes.join(', ').substring(0,100) + (module.outcomes.join(', ').length > 100 ? '...' : '')}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span>{module.estimatedDuration}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Target className="h-4 w-4 mr-2 text-primary" />
          <span>{module.outcomes.length} Key Outcomes</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2 text-primary" />
          <span>Proposed by: {module.proposer}</span>
        </div>
         {module.tags && module.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {module.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t flex flex-col space-y-3">
        <div className="flex justify-between w-full text-sm">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1 text-green-500" /> {module.votes} Votes
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-blue-500" /> {module.backers} Backers
          </div>
        </div>
        <div className="flex space-x-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <ThumbsUp className="mr-2 h-4 w-4" /> Upvote
          </Button>
           <Button variant="outline" size="sm" className="flex-1">
            <DollarSign className="mr-2 h-4 w-4" /> Back ($1-5)
          </Button>
        </div>
        <Button asChild className="w-full mt-2">
          <Link href={`/dashboard/modules/${module.id}`}>
             <Eye className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
