// src/ai/flows/ai-learning-path-suggestions.ts
'use server';
/**
 * @fileOverview AI-powered learning path suggestions flow.
 *
 * - aiLearningPathSuggestions - A function that suggests learning paths based on user goals and trending skills.
 * - AiLearningPathSuggestionsInput - The input type for the aiLearningPathSuggestions function.
 * - AiLearningPathSuggestionsOutput - The return type for the aiLearningPathSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiLearningPathSuggestionsInputSchema = z.object({
  userGoals: z
    .string()
    .describe('The learning goals of the user, e.g., "become a data scientist".'),
  trendingSkills: z
    .string()
    .describe('The trending skills in the job market, e.g., "Python, data analysis, machine learning".'),
});
export type AiLearningPathSuggestionsInput = z.infer<
  typeof AiLearningPathSuggestionsInputSchema
>;

const AiLearningPathSuggestionsOutputSchema = z.object({
  suggestedLearningPaths: z
    .array(z.string())
    .describe('A list of suggested learning paths based on the user goals and trending skills.'),
});
export type AiLearningPathSuggestionsOutput = z.infer<
  typeof AiLearningPathSuggestionsOutputSchema
>;

export async function aiLearningPathSuggestions(
  input: AiLearningPathSuggestionsInput
): Promise<AiLearningPathSuggestionsOutput> {
  return aiLearningPathSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLearningPathSuggestionsPrompt',
  input: {schema: AiLearningPathSuggestionsInputSchema},
  output: {schema: AiLearningPathSuggestionsOutputSchema},
  prompt: `You are an AI learning path suggestion expert.

  Based on the user's goals and trending skills, suggest a list of learning paths.

  User Goals: {{{userGoals}}}
  Trending Skills: {{{trendingSkills}}}

  Suggest learning paths that are efficient and focus on the most relevant content.

  The suggested learning paths should be a list of strings.
  `, // Ensure the prompt asks for a list of learning paths
});

const aiLearningPathSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiLearningPathSuggestionsFlow',
    inputSchema: AiLearningPathSuggestionsInputSchema,
    outputSchema: AiLearningPathSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
