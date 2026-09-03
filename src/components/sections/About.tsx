import { CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const newsItems = [
    {
      id: 1,
      date: '০৩ সেপ্টে, ২০২৬',
      title: 'শালধর বাজার বণিক সমিতির বার্ষিক মতবিনিময় সভা অনুষ্ঠিত।',
    },
    {
      id: 2,
      date: '২৮ আগস্ট, ২০২৬',
      title: 'চিথলিয়া ইউনিয়নের ৫নং ওয়ার্ডে বন্যার্তদের মাঝে ত্রাণ বিতরণ।',
    },
    {
      id: 3,
      date: '১৫ আগস্ট, ২০২৬',
      title: 'উপজেলা বিএনপির উদ্যোগে বিশেষ কর্মীসভায় যোগদান।',
    },
    {
      id: 4,
      date: '০২ আগস্ট, ২০২৬',
      title: 'এলাকার যুবসমাজকে মাদকমুক্ত রাখতে ক্রীড়া প্রতিযোগিতার উদ্বোধন।',
    }
  ];

  return (
    <section id="about" className="bg-cream pt-8 pb-16 md:pt-12 md:pb-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: About Taj Uddin Rashed */}
          <div className="lg:col-span-8">
            
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-gold" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand">
                পরিচিতি ও সংগ্রাম
              </h2>
            </div>

            <div className="text-brand-ink/90 font-sans text-[15px] md:text-base leading-7 md:leading-8">
              
              {/* Circular Smart Frame Image (Floats to the left on Desktop) */}
              <div className="sm:float-left flex justify-center sm:block mb-8 sm:mb-4 sm:mr-8 mt-2">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-gradient-to-tr from-gold via-gold-light to-brand shadow-xl">
                  {/* Inner background for transparent image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-brand-deep/5 border-4 border-white">
                    {/* Next.js Image Component */}
                    <Image
                      src="/images/rashed-cutout 1.png"
                      alt="Taj Uddin Rashed"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 192px, 224px"
                    />
                  </div>
                  {/* Small Floating Badge (Center Aligned) */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand text-gold text-[11px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-gold/30 whitespace-nowrap z-10">
                    ত্যাগী ও পরীক্ষিত নেতৃত্ব
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-6">
                <p>
                  <strong className="text-brand text-lg">পারিবারিক ঐতিহ্য ও শেকড়:</strong> চিথলিয়ার ৩০০ বছরের প্রাচীন ও ঐতিহ্যবাহী ভূঁইয়া পরিবারের সন্তান তিনি। উনার পিতা মাস্টার সামছু উদ্দিন ভূঁইয়া ছিলেন একজন শ্রদ্ধেয় ব্যক্তিত্ব এবং প্রাথমিক বিদ্যালয়ের প্রধান শিক্ষক, যাঁর শিক্ষাগুরু হিসেবে পুরো এলাকায় বিশেষ সুনাম ও অবদান রয়েছে।
                </p>
                
                <p>
                  <strong className="text-brand text-lg">রাজনৈতিক সূচনা ও ছাত্রজীবন:</strong> ছাত্রজীবন থেকেই জাতীয়তাবাদী আদর্শের রাজনীতিতে সক্রিয় অংশগ্রহণ। রাজপথের আন্দোলনে নেতৃত্ব দিতে গিয়ে পরশুরাম উপজেলা ছাত্রদলের সাবেক ভারপ্রাপ্ত সাধারণ সম্পাদক এবং পরবর্তীতে ৩নং চিথলিয়া ইউনিয়ন যুবদলের আহ্বায়কের দায়িত্ব দক্ষতার সাথে পালন করেন।
                </p>
              </div>

              {/* Clear float to prevent overlapping with the box below */}
              <div className="clear-both pt-4"></div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-sm space-y-5 my-8 relative overflow-hidden group hover:shadow-md transition-shadow">
                {/* Decorative background element inside the card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 relative z-10">সামাজিক ও রাজনৈতিক অবদান</h3>
                
                <ul className="space-y-3 relative z-10">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" size={20} />
                    <span><strong>বর্তমান দায়িত্ব:</strong> ৩নং চিথলিয়া ইউনিয়ন বিএনপির সফল সাংগঠনিক সম্পাদক এবং পরশুরাম উপজেলা বিএনপির অন্যতম কার্যকরী সদস্য।</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" size={20} />
                    <span><strong>ব্যবসায়িক নেতৃত্ব:</strong> এলাকার সর্ববৃহৎ বাণিজ্যিক কেন্দ্র শালধর বাজার বণিক সমিতির টানা দুই যুগেরও বেশি সময় ধরে সফল সাধারণ সম্পাদক।</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" size={20} />
                    <span><strong>স্বাস্থ্যসেবা:</strong> দীর্ঘ পেশাগত জীবনে 'গ্রাম ডাক্তার' হিসেবে চিথলিয়া ইউনিয়নের প্রতিটি ঘরে সাধারণ মানুষের স্বাস্থ্যসেবা পৌঁছে দিয়েছেন।</span>
                  </li>
                </ul>
              </div>

              <p className="border-l-4 border-blood pl-4 italic text-brand-ink/80 font-medium md:text-lg">
                "রাজনৈতিক প্রতিহিংসার কারণে একাধিক মিথ্যা মামলা, হামলা এবং বছরের পর বছর ধরে ঘরছাড়া থাকার চরম নির্যাতন সহ্য করেও নীতি ও আদর্শ থেকে কখনো বিচ্যুত হইনি।"
              </p>
            </div>
          </div>

          {/* Right Column: News Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 overflow-hidden sticky top-28 mt-4 lg:mt-0">
              
              <div className="bg-brand-deep px-6 py-4 flex items-center justify-between border-b-4 border-gold">
                <h3 className="font-serif text-xl font-bold text-white">সংবাদ ও আপডেট</h3>
              </div>

              <div className="divide-y divide-black/5">
                {newsItems.map((news) => (
                  <Link 
                    href="#" 
                    key={news.id} 
                    className="block p-5 hover:bg-cream/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand/70 mb-2">
                      <Calendar size={14} />
                      {news.date}
                    </div>
                    <h4 className="font-sans font-semibold text-brand-ink group-hover:text-brand transition-colors text-[15px] leading-snug">
                      {news.title}
                    </h4>
                  </Link>
                ))}
              </div>

              <div className="p-4 bg-cream/30 text-center border-t border-black/5">
                <Link 
                  href="#activities" 
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-gold transition-colors"
                >
                  সব খবর দেখুন <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}