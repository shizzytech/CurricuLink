import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Users, Lightbulb, Zap, Users2, GitBranchPlus, BookUser, MessageSquareHeart } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Module Marketplace',
    description: 'Propose micro-modules like "Real-World Regex" or "Ethical AI". Shape what you learn.',
  },
  {
    icon: <GitBranchPlus className="h-8 w-8 text-primary" />,
    title: 'Upvote & Back Modules',
    description: 'Vote or back modules. High-demand content gets fast-tracked into development.',
  },
  {
    icon: <Users2 className="h-8 w-8 text-primary" />,
    title: 'Community Co-Creation',
    description: 'Experts, practitioners, and reviewers collaboratively build and iterate on content.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Dynamic Curriculum Builder',
    description: 'Drag-and-drop modules into custom learning tracks tailored to your goals.',
  },
  {
    icon: <BookUser className="h-8 w-8 text-primary" />,
    title: 'Mentor-Led Learning Paths',
    description: 'Guided cohorts, live sessions, and Discord support from experienced mentors.',
  },
  {
    icon: <MessageSquareHeart className="h-8 w-8 text-primary" />,
    title: 'Feedback Loops',
    description: 'Rate modules to drive continuous improvement and ensure content relevance.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-headline">
              Co-Design Your Learning Journey with <span className="text-primary">CurricuLink</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A platform where students, professionals, and instructors dynamically shape education.
              Propose, vote, and build the skills you need, when you need them.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/modules">Explore Modules</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why It's Needed Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Why CurricuLink?</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Traditional online courses often miss the mark. It&apos;s time for a change.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Lightbulb className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Relevance Gap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Traditional courses can feel misaligned with current job market needs.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Practical Skills Now</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Learners demand faster access to applicable skills, not just abstract theory.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-accent mb-2" />
                  <CardTitle>Demand-Driven Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Upskilling should be shaped by learner needs and industry demand, not top-down mandates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">How CurricuLink Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Example User Flow Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">See It In Action: Sarah&apos;s Story</h2>
            <Card className="max-w-3xl mx-auto shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image src="https://placehold.co/80x80.png" alt="Sarah - Aspiring Data Analyst" width={80} height={80} className="rounded-full" data-ai-hint="person profile" />
                  <div>
                    <CardTitle>Sarah, Aspiring Data Analyst</CardTitle>
                    <CardDescription>Follow Sarah&apos;s journey on CurricuLink.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>1. Sarah signs up, searching for &quot;Data Cleaning with Pandas&quot;.</p>
                <p>2. Finds a proposed module: “Wrangling Messy Datasets in Pandas”. She backs it with $2 and votes.</p>
                <p>3. The module gets Fast-Tracked! 50 others vote, and 3 mentors apply to help build it.</p>
                <p>4. Sarah joins the first cohort with live mentor Q&As and completes a capstone project.</p>
                <p>5. She earns a certificate, lands a freelance gig, and proposes her own module: “Quick-and-Dirty Dashboards in Streamlit”.</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
