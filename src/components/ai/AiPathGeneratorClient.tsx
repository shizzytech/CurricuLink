'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { aiLearningPathSuggestions, type AiLearningPathSuggestionsOutput } from '@/ai/flows/ai-learning-path-suggestions';
import { Loader2, Wand2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  userGoals: z.string().min(10, { message: 'Please describe your learning goals in at least 10 characters.' }),
  trendingSkills: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AiPathGeneratorClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AiLearningPathSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userGoals: '',
      trendingSkills: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await aiLearningPathSuggestions({
        userGoals: data.userGoals,
        trendingSkills: data.trendingSkills || '', // Ensure trendingSkills is not undefined
      });
      setSuggestions(result);
      toast({
        title: "Learning Paths Generated!",
        description: "AI has suggested some paths for you.",
      });
    } catch (error) {
      console.error('Error generating AI learning paths:', error);
      toast({
        title: "Error",
        description: "Failed to generate learning paths. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline flex items-center">
            <Wand2 className="mr-2 h-6 w-6 text-primary" />
            AI Learning Path Generator
          </CardTitle>
          <CardDescription>
            Tell us your goals, and our AI will suggest personalized learning paths for you.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="userGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="userGoals">Your Learning Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        id="userGoals"
                        placeholder="e.g., Become a full-stack web developer, master data analysis for finance, learn UX design principles..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendingSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="trendingSkills">Trending Skills (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        id="trendingSkills"
                        placeholder="e.g., Python, React, Machine Learning, Cloud Computing"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Help the AI by listing any specific trending skills you&apos;re interested in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Learning Paths'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {suggestions && suggestions.suggestedLearningPaths && suggestions.suggestedLearningPaths.length > 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline">Suggested Learning Paths</CardTitle>
            <CardDescription>Here are some AI-curated paths based on your input:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {suggestions.suggestedLearningPaths.map((path, index) => (
                <li key={index} className="flex items-start p-3 border rounded-md bg-muted/30">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{path}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {suggestions && suggestions.suggestedLearningPaths && suggestions.suggestedLearningPaths.length === 0 && (
         <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline">No Suggestions Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The AI couldn&apos;t generate specific paths with the provided input. Try rephrasing your goals or adding more details.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
