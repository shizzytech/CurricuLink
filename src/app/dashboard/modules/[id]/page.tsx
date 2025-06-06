import Image from 'next/image';
import { mockModules } from '@/lib/mock-data';
import type { Module } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, DollarSign, Clock, Users, Target, MessageSquare, Star, GitFork, FileText, Wrench, CalendarDays } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Helper function to simulate fetching a module by ID
async function getModule(id: string): Promise<Module | undefined> {
  return mockModules.find(m => m.id === id);
}

export default async function ModuleDetailPage({ params }: { params: { id: string } }) {
  const module = await getModule(params.id);

  if (!module) {
    return <div className="container mx-auto py-10 text-center">Module not found.</div>;
  }

  const fundingProgress = module.backers > 0 ? (module.backers / (module.votes * 0.1 + 10)) * 100 : 0; // Example calculation


  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <section className="relative">
        {module.coverImage && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={module.coverImage}
              alt={module.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="education online course"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        )}
        <div className={` ${module.coverImage ? 'absolute bottom-0 left-0 p-8 text-white' : 'mb-6'}`}>
          <Badge variant={module.status === 'live' ? 'default' : 'secondary'} className="capitalize mb-2 text-sm px-3 py-1">
            {module.status}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-headline mb-2">{module.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground ${module.coverImage ? 'text-gray-200' : ''}">
            A deep dive into {module.title.toLowerCase()}.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Module Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {/* Placeholder for a longer description */}
                This module, &quot;{module.title}&quot;, is designed to equip learners with practical skills and theoretical understanding in its domain. 
                It covers key concepts through engaging content and hands-on exercises. Join a community of learners and experts to master this subject.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center"><Clock className="h-5 w-5 mr-2 text-primary" /> Estimated Duration: {module.estimatedDuration}</div>
                <div className="flex items-center"><Wrench className="h-5 w-5 mr-2 text-primary" /> Required Tools: {module.requiredTools.join(', ') || 'None'}</div>
                <div className="flex items-center"><Users className="h-5 w-5 mr-2 text-primary" /> Proposed By: {module.proposer}</div>
                <div className="flex items-center"><CalendarDays className="h-5 w-5 mr-2 text-primary" /> Last Updated: {/* Placeholder */} Oct 26, 2023</div>
              </div>

              {module.tags && module.tags.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-semibold mb-1">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><Target className="mr-2 h-6 w-6 text-primary" />Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {module.outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><GitFork className="mr-2 h-6 w-6 text-primary" />Community Co-Creation</CardTitle>
              <CardDescription>This module is developed with community support.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Experts, practitioners, and reviewers are invited to contribute. Content is iterated via collaborative tools.
              </p>
              {/* Placeholder for contributors list */}
              <div className="flex -space-x-2 overflow-hidden">
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://placehold.co/40x40.png" alt="Contributor 1" width={40} height={40} data-ai-hint="person avatar"/>
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://placehold.co/40x40.png" alt="Contributor 2" width={40} height={40} data-ai-hint="person avatar"/>
                <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://placehold.co/40x40.png" alt="Contributor 3" width={40} height={40} data-ai-hint="person avatar"/>
                <div className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-background bg-muted text-muted-foreground text-xs">
                  +5 more
                </div>
              </div>
              <Button variant="outline" className="mt-4">View Contributors / Join Co-creation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" />Feedback & Ratings</CardTitle>
              <CardDescription>Help us improve this module!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < Math.round(module.rating || 0) ? "fill-current h-6 w-6" : "h-6 w-6"} />
                  ))}
                </div>
                <span className="text-muted-foreground">({module.rating?.toFixed(1) || 'N/A'} from {module.feedbackCount || 0} ratings)</span>
              </div>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="rating">Your Rating (1-5)</Label>
                  {/* Basic star rating input placeholder */}
                  <div className="flex space-x-1 mt-1">
                    {[1,2,3,4,5].map(starValue => (
                      <Button key={starValue} variant="outline" size="icon" type="button" aria-label={`Rate ${starValue} stars`}>
                        <Star className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Your Feedback</Label>
                  <Textarea id="comment" placeholder="Share your thoughts on this module..." className="mt-1" />
                </div>
                <Button type="submit">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Support This Module</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Votes:</span>
                  <span className="font-semibold">{module.votes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Backers:</span>
                  <span className="font-semibold">{module.backers}</span>
                </div>
              </div>
              {/* Example funding goal, replace with actual logic */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Funding Progress (Example)</span>
                  <span>{Math.min(100, Math.round(fundingProgress))}%</span>
                </div>
                <Progress value={Math.min(100, fundingProgress)} aria-label={`${Math.round(fundingProgress)}% funded`} />
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button size="lg" className="w-full">
                  <ThumbsUp className="mr-2 h-5 w-5" /> Upvote Module
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <DollarSign className="mr-2 h-5 w-5" /> Back This Module ($1-5)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Module Content</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for module content/sections */}
              <ul className="space-y-2">
                {['Introduction', 'Core Concepts', 'Practical Exercise 1', 'Advanced Topics', 'Conclusion & Next Steps'].map(item => (
                  <li key={item} className="flex items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" /> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
