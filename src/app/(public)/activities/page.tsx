import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ActivitiesGridClient from '@/components/shared/ActivitiesGridClient';

export const revalidate = 0;

export default async function ActivitiesPage() {
  // সার্ভার সাইড ডাটা ফেচিং
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });

  const activities = data || [];

  return (
    <div className="bg-cream min-h-screen pb-20">
      
      {/* Page Header */}
      <section className="bg-brand-deep text-white pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-dark rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">সকল কার্যক্রম ও উদ্যোগ</h1>
          <p className="font-sans text-cream/80 text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed px-2">
            চিথলিয়া ইউনিয়নের উন্নয়ন, সামাজিক নিরাপত্তা এবং সাধারণ মানুষের কল্যাণে গৃহীত সকল মাঠ পর্যায়ের কার্যক্রম।
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-8 md:h-16 text-cream" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,64 L48,69.3 C96,75 192,85 288,80 C384,75 480,53 576,48 C672,43 768,53 864,69.3 C960,85 1056,107 1152,106.7 C1248,107 1344,85 1392,74.7 L1440,64 L1440,120 L0,120 Z"/>
        </svg>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-20">
        
        {/* Back Button */}
        <div className="mb-8 md:mb-10">
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-brand-ink hover:text-brand font-bold px-5 py-2 md:px-6 md:py-2.5 rounded-full shadow-sm hover:shadow-md border border-black/5 transition-all group text-sm md:text-base">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" /> ফিরে যান
          </Link>
        </div>

        {/* Client Component-এ ডাটা পাস করা */}
        <ActivitiesGridClient activities={activities} />
        
      </div>
    </div>
  );
}