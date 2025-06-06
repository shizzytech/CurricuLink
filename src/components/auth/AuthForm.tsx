'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


interface AuthFormProps {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    setIsLoading(false);

    if (type === 'login') {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${email || 'user'}!`,
      });
      router.push('/dashboard'); // Redirect to dashboard after login
    } else {
      toast({
        title: "Signup Successful!",
        description: `Account created for ${email || 'user'}. Please check your email to verify.`,
      });
      router.push('/login'); // Redirect to login after signup
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <BookOpenCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-headline">
          {type === 'login' ? 'Welcome Back to CurricuLink' : 'Join CurricuLink Today'}
        </CardTitle>
        <CardDescription>
          {type === 'login' ? 'Sign in to continue your learning journey.' : 'Create an account to start co-designing education.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" required />
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          {type === 'signup' && (
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" placeholder="••••••••" required />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              type === 'login' ? 'Log In' : 'Create Account'
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Link href={type === 'login' ? '/signup' : '/login'} className="font-medium text-primary hover:underline">
              {type === 'login' ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
