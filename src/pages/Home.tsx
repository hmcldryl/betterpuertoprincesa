import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import AtAGlanceSection from '../components/home/AtAGlanceSection';
import HotlinesSection from '../components/home/HotlinesSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import HomeNewsSection from '../components/home/HomeNewsSection';
import DirectoryBanner from '../components/home/DirectoryBanner';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Official website of your local government. Access government services, information, and resources."
        keywords="government, local government, services, public services, civic services"
      />
      <main className="flex-grow">
        <Hero />
        <ServicesSection limit={3} />
        <GovernmentActivitySection limit={3} />
        <AtAGlanceSection />
        <HotlinesSection />
        <WeatherMapSection />
        <HomeNewsSection />
        <DirectoryBanner />
      </main>
    </>
  );
};

export default Home;
