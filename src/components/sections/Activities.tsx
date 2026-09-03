import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ActivitiesGridClient from '../shared/ActivitiesGridClient';

export default async function Activities() {
  // সার্ভার সাইডেই ডাটা ফেচ হবে (লোডিং টাইম জিরো)
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const activities = data || [];

  return (
    <section id="activities" className="bg-cream py-10 md:py-16 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">
              মাঠ পর্যায়ের কাজ
            </span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-4">
            সাম্প্রতিক কার্যক্রম ও উদ্যোগ
          </h2>
        </div>

        {/* Client Component-এ ডাটা পাস করা */}
        <ActivitiesGridClient activities={activities} />

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-10">
          <Link 
            href="/activities" 
            className="inline-flex items-center justify-center bg-brand-ink hover:bg-brand text-white font-bold px-6 py-3 md:px-8 md:py-3.5 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base gap-2"
          >
            সকল কার্যক্রম দেখুন <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}