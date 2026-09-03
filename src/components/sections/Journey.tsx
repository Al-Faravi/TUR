import Image from 'next/image';
import { Award, ShieldCheck } from 'lucide-react';

export default function Journey() {
  // সালগুলো বর্তমান থেকে অতীতের দিকে সাজানো হলো
  const timelineData = [
    {
      year: 'বর্তমান',
      title: 'ইউনিয়ন বিএনপির সাংগঠনিক সম্পাদক',
      description: 'পরশুরাম উপজেলা বিএনপির সদস্য এবং ৩ নং চিথলিয়া ইউনিয়ন বিএনপির সাংগঠনিক সম্পাদক হিসেবে দায়িত্ব পালন করছেন। সততা ও কর্মীবান্ধব আচরণে তৃণমূলের আস্থার প্রতীক।',
      isCurrent: true,
    },
    {
      year: '২০১৪',
      title: '৩ নং চিথলিয়া ইউনিয়ন যুবদলের আহ্বায়ক',
      description: '৩ নং চিথলিয়া ইউনিয়ন যুবদলের আহ্বায়ক হিসেবে দায়িত্ব পেয়ে তৃণমূলের তরুণ কর্মীদের এক ছাতার নিচে সংগঠিত করে ইউনিয়ন যুবদলে নতুন গতি সঞ্চার করেন।',
      isCurrent: false,
    },
    {
      year: '২০০৮',
      title: 'পরশুরাম উপজেলা যুবদলের সদস্য',
      description: 'পরশুরাম উপজেলা যুবদলের সদস্য হিসেবে রাজপথের আন্দোলন-সংগ্রামে সরাসরি অংশগ্রহণ এবং দলীয় শৃঙ্খলা ও আদর্শের প্রশিক্ষণ গ্রহণ করেন।',
      isCurrent: false,
    },
    {
      year: '২০০৩',
      title: 'চিথলিয়া ইউনিয়ন যুবদলের যুগ্ম সাধারণ সম্পাদক',
      description: 'চিথলিয়া ইউনিয়ন যুবদলের যুগ্ম সাধারণ সম্পাদক হিসেবে দায়িত্ব পালন করেন। একই সময়ে উপজেলা ছাত্রদলের সঙ্গে যুক্ত থেকে ভারপ্রাপ্ত সাধারণ সম্পাদকের দায়িত্বও সফলভাবে পালন করেন।',
      isCurrent: false,
    },
    {
      year: '১৯৯৯',
      title: '৩ নং ওয়ার্ডের কো-ভাইস প্রেসিডেন্ট',
      description: '৩ নং চিথলিয়া ইউনিয়নের ৩ নং ওয়ার্ডের কো-ভাইস প্রেসিডেন্ট হিসেবে দায়িত্ব পালন করেন এবং কম বয়সেই ওয়ার্ড পর্যায়ের সংগঠনে নেতৃত্বের দায়িত্ব পালনের মধ্য দিয়ে রাজনৈতিক জীবনের সূচনা করেন।',
      isCurrent: false,
    }
  ];

  return (
    <section id="journey" className="bg-white border-y border-black/5 py-12 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">পথচলার ইতিহাস</span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-brand mb-3 md:mb-4">
            তিন দশকের পরীক্ষিত রাজনৈতিক পথচলা
          </h2>
          <p className="font-sans text-brand-ink/70 leading-6 md:leading-8 text-sm md:text-base">
            একদিনের নয়, ত্যাগের সুদীর্ঘ রাজপথ পাড়ি দিয়ে তৃণমূল থেকে গড়ে ওঠা এক অবিচল নেতৃত্বের ইতিহাস।
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Desktop Photo Card - Hidden on Mobile to save space */}
            <div className="hidden lg:block relative rounded-[2rem] overflow-hidden shadow-2xl bg-brand-deep aspect-[4/5] border-4 border-gold/20 group">
              <Image
                src="/images/rashed-cutout.png" 
                alt="Taj Uddin Rashed Political Journey"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/30 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-gold font-serif text-lg font-bold">তাজ উদ্দিন রাসেদ</span>
                <p className="text-sm text-cream/90 font-medium">সংগ্রামী রাজনৈতিক জীবনের তিন দশক</p>
              </div>
            </div>

            {/* Mini Stats Cards - Visible on all devices */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-cream p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/5 text-center shadow-sm">
                <div className="flex justify-center text-gold mb-1"><Award size={20} className="md:w-6 md:h-6" /></div>
                <div className="font-serif text-xl md:text-2xl font-bold text-brand">১৯৯৯</div>
                <div className="text-[10px] md:text-xs text-brand-ink/70 font-bold mt-1">রাজনৈতিক সূচনা</div>
              </div>
              <div className="bg-cream p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/5 text-center shadow-sm">
                <div className="flex justify-center text-gold mb-1"><ShieldCheck size={20} className="md:w-6 md:h-6" /></div>
                <div className="font-serif text-xl md:text-2xl font-bold text-brand">১০০%</div>
                <div className="text-[10px] md:text-xs text-brand-ink/70 font-bold mt-1">আদর্শ ও নিষ্ঠা</div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Vertical Timeline */}
          <div className="pt-2 md:pt-0">
            <ol className="relative border-l-2 border-brand/20 ml-3 md:ml-4">
              
              {timelineData.map((item, index) => (
                <li key={index} className="mb-8 md:mb-10 pl-6 md:pl-10 last:mb-0 relative group">
                  
                  {/* Timeline Dot */}
                  <span className={`absolute -left-[9px] top-1 md:top-2 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-300 ${
                    item.isCurrent ? 'bg-blood ring-4 ring-blood/20 animate-pulse' : 'bg-gold group-hover:scale-125 group-hover:bg-brand'
                  }`} />

                  {/* Content Container */}
                  <div className={item.isCurrent 
                    ? "bg-brand-deep text-white p-5 md:p-6 rounded-2xl shadow-lg border-l-4 border-gold -mt-2" // Current Item (Card)
                    : "pt-0 md:pt-1" // Past Items (Minimal Text)
                  }>
                    
                    {/* Badge & Title */}
                    <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2 ${item.isCurrent ? 'mb-3' : ''}`}>
                      <span className={`inline-block w-fit px-3 py-1 rounded-full text-[11px] md:text-xs font-bold ${
                        item.isCurrent ? 'bg-gold text-brand-ink' : 'bg-brand/10 text-brand'
                      }`}>
                        {item.year}
                      </span>
                      <h3 className={`font-serif text-base md:text-xl font-bold ${
                        item.isCurrent ? 'text-white' : 'text-brand-ink group-hover:text-brand transition-colors'
                      }`}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`font-sans text-sm md:text-[15px] leading-6 md:leading-7 ${
                      item.isCurrent ? 'text-cream/90' : 'text-brand-ink/75'
                    }`}>
                      {item.description}
                    </p>
                    
                  </div>
                </li>
              ))}

            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}