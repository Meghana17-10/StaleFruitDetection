
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import FeatureSection from '@/components/home/FeatureSection';
import HowItWorks from '@/components/home/HowItWorks';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeatureSection />
      <HowItWorks />
    </MainLayout>
  );
};

export default Index;
