import Hero from '@/components/sections/Hero';
import NewsTicker from '@/components/sections/NewsTicker';
import Statistics from '@/components/sections/Statistics';
import About from '@/components/sections/About';
import Journey from '@/components/sections/Journey';
import Manifesto from '@/components/sections/Manifesto';
import Activities from '@/components/sections/Activities';
import MediaGallery from '@/components/sections/MediaGallery';
import Contact from '@/components/sections/Contact';
import QuoteBand from '@/components/sections/QuoteBand'; // নতুন ইম্পোর্ট

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsTicker />
      <Statistics />
      <About />
      <Journey />
      <Manifesto />
      <Activities />
      <MediaGallery />
    <Contact />
      {/* এখানে যুক্ত হলো */}
      
      {/* স্ক্রল চেক করার জন্য ফাঁকা জায়গা */}
      <div className="h-[20vh] bg-cream"></div> 
    </>
  );
}