import Link from 'next/link';
import { Inbox, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-brand-deep text-white flex items-center pt-28 pb-10 lg:pt-36 lg:pb-16 overflow-hidden">
      
      {/* Background Subtle Decor */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/40 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & Content */}
          <div className="text-center lg:text-left order-1 flex flex-col items-center lg:items-start">
            
            {/* Special Complaint Notice/Badge */}
            <div className="order-3 lg:order-first mt-8 lg:mt-0 lg:mb-8 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all shadow-lg group cursor-pointer">
              <span className="w-2.5 h-2.5 rounded-full bg-blood animate-ping" />
              <span className="text-[12px] md:text-sm font-semibold text-cream">
                অভিযোগ বা পরামর্শ জানাতে চান?
              </span>
              <Link href="/complaint" className="inline-flex items-center gap-1 text-gold group-hover:text-gold-light font-bold text-[12px] md:text-sm ml-1">
                এখানে ক্লিক করুন <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Main Title & Subtitle */}
            <div className="order-1 space-y-4 md:space-y-6 w-full">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md">
                তাজ উদ্দিন রাসেদ
              </h1>
              
              <div className="inline-block bg-brand-dark/50 backdrop-blur-sm border-l-4 border-gold px-4 py-2 shadow-md">
                <p className="font-sans text-gold font-bold text-sm sm:text-base md:text-lg tracking-wider uppercase">
                  সাংগঠনিক সম্পাদক, ৩ নং চিথলিয়া ইউনিয়ন বিএনপি
                </p>
              </div>
              
              <p className="font-sans text-cream/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                তৃণমূলের সুদীর্ঘ রাজপথের পরীক্ষিত নেতৃত্ব। চিথলিয়া ইউনিয়নের মানুষের অধিকার, শান্তি ও একটি দুর্নীতিমুক্ত মডেল সমাজ গড়ার অদম্য প্রতিজ্ঞায় নিবেদিত প্রাণ।
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="order-2 mt-8 flex flex-wrap justify-center lg:justify-start gap-4 w-full">
              {/* Link fixed to strictly target ID without routing issue */}
              <Link 
                href="#about" 
                className="bg-gold hover:bg-gold-light text-brand-ink font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1 text-sm md:text-base"
              >
                জীবনী ও সংগ্রাম
              </Link>
              <Link 
                href="/complaint" 
                className="bg-blood hover:bg-blood/90 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1 text-sm md:text-base inline-flex items-center gap-2"
              >
                <Inbox size={18} /> অভিযোগ বাক্স
              </Link>
            </div>
            
          </div>

          {/* Right Column: Dynamic Image/Banner Area */}
          <div className="order-2 flex justify-center lg:justify-end relative mt-2 md:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(197,168,128,0.15)] ring-1 ring-gold/30 group">
              <img 
                src="/images/banner-1.png" 
                alt="তাজ উদ্দিন রাসেদ ব্যানার" 
                className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}