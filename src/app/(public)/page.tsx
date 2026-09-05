import Hero from '@/components/sections/Hero';
import NewsTicker from '@/components/sections/NewsTicker';
import Statistics from '@/components/sections/Statistics';
import About from '@/components/sections/About';
import Journey from '@/components/sections/Journey';
import Manifesto from '@/components/sections/Manifesto';
import Activities from '@/components/sections/Activities';
import MediaGallery from '@/components/sections/MediaGallery';
import Contact from '@/components/sections/Contact';
import QuoteBand from '@/components/sections/QuoteBand';

// পারফরম্যান্স ফাস্ট করার জন্য 0 পরিবর্তন করে 60 করা হলো (প্রতি ৬০ সেকেন্ডে ক্যাশ আপডেট হবে)
export const revalidate = 60;

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
      
      {/* স্ক্রল চেক করার জন্য ফাঁকা জায়গা */}
      <div className="h-[20vh] bg-cream"></div> 
    </>
  );
}