"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsTicker() {
  const [tickerText, setTickerText] = useState("স্বাগতম! ওয়েবসাইট লোড হচ্ছে...");

  // Supabase সেটিংস টেবিল থেকে ডায়নামিক টেক্সট ফেচ করা
  useEffect(() => {
    const fetchTicker = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'ticker')
        .single();

      if (!error && data) {
        setTickerText(data.value);
      }
    };

    fetchTicker();
  }, []);

  return (
    <div className="bg-brand-deep border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-stretch h-10 md:h-12">
        
        {/* Red Label */}
        <div className="bg-blood text-white px-3 md:px-6 text-xs md:text-sm font-bold flex items-center whitespace-nowrap shadow-[5px_0_10px_rgba(0,0,0,0.2)] z-10">
          সাম্প্রতিক আপডেট
        </div>
        
        {/* Marquee Area */}
        <div className="overflow-hidden relative w-full flex items-center h-full bg-brand-dark/50">
          
          <div className="animate-marquee flex gap-10 px-4 h-full">
            
            {/* First Set of Text */}
            <div className="flex gap-10 items-center min-w-max">
              <span className="flex items-center gap-1.5 text-[12px] md:text-sm font-sans font-medium text-cream/90">
                ✅ {tickerText}
              </span>
            </div>

            {/* Second Set of Text (For infinite loop smooth effect) */}
            <div className="flex gap-10 items-center min-w-max" aria-hidden="true">
              <span className="flex items-center gap-1.5 text-[12px] md:text-sm font-sans font-medium text-cream/90">
                ✅ {tickerText}
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}