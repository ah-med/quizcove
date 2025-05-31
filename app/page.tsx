import Layout from '@/components/layout';
import { HeroSection } from '@/components/home/hero-section';
import { QuizConfigForm } from '@/components/home/quiz-config-form';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <HeroSection />
        <QuizConfigForm />
      </div>
    </Layout>
  );
}
