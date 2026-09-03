import { Quote } from 'lucide-react';

export default function QuoteBand() {
  return (
    <section className="relative bg-blood text-white py-12 md:py-16 overflow-hidden flex items-center justify-center">
      
      {/* Subtle Texture & Giant Watermark Quote */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03]">
        <Quote size={200} fill="currentColor" className="rotate-180 md:w-[300px] md:h-[300px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Small Golden Quote Icon */}
        <Quote className="mx-auto text-gold mb-4" size={28} fill="currentColor" />
        
        {/* The Emotional Quote */}
        <h2 className="font-serif text-xl md:text-3xl font-bold leading-relaxed md:leading-[1.6] mb-5 md:mb-6">
          "আমার রাজনীতি কেবল ক্ষমতার জন্য নয়, চিথলিয়ার অবহেলিত মানুষের অধিকার আদায়ের জন্য। জেল-জুলুম কিংবা মিথ্যা মামলা আমাকে কখনোই জনগণের পাশ থেকে সরাতে পারেনি।"
        </h2>
        
        {/* Author Name */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-6 bg-gold" />
          <span className="font-sans font-bold text-gold-light text-sm md:text-base tracking-wide">
            তাজ উদ্দিন রাসেদ
          </span>
          <span className="h-[2px] w-6 bg-gold" />
        </div>

      </div>
    </section>
  );
}