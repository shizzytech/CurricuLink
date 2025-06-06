import { AiPathGeneratorClient } from '@/components/ai/AiPathGeneratorClient';

export default function AiPathsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI-Powered Learning Paths</h1>
        <p className="text-muted-foreground">Let AI guide your learning journey towards your goals.</p>
      </div>
      <AiPathGeneratorClient />
    </div>
  );
}
