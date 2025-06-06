import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-background">
        <AuthForm type="login" />
      </main>
      <Footer />
    </div>
  );
}
