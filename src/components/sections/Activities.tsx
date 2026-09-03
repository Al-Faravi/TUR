"use client";
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, X, MapPin } from 'lucide-react';
import Link from 'next/link';

// ডেমো ডাটা (৪টি ডাটা দেওয়া হলো, যাতে পিসিতে ৪ কলাম পূর্ণ থাকে)
const activitiesData = [
  {
    id: 1,
    title: "শালধর বাজারে নিরাপত্তা বৃদ্ধির জন্য নতুন সিসিটিভি ক্যামেরা স্থাপন",
    date: "২৮ আগস্ট, ২০২৬",
    location: "শালধর বাজার, পরশুরাম",
    image: "/images/banner-1.png", 
    shortDesc: "এলাকার ব্যবসায়ী ও সাধারণ মানুষের নিরাপত্তা নিশ্চিত করতে শালধর বাজার বণিক সমিতির উদ্যোগে পুরো বাজার সিসিটিভির আওতায় আনা হয়েছে।",
    fullDesc: "এলাকার ব্যবসায়ী ও সাধারণ মানুষের নিরাপত্তা নিশ্চিত করতে শালধর বাজার বণিক সমিতির উদ্যোগে পুরো বাজার সিসিটিভির আওতায় আনা হয়েছে। দীর্ঘদিনের দাবির প্রেক্ষিতে তাজ উদ্দিন রাসেদ-এর প্রত্যক্ষ তত্ত্বাবধানে ও আর্থিক সহযোগিতায় এই প্রকল্পটি বাস্তবায়িত হয়। এর ফলে বাজারে চুরি-ডাকাতি ও ছিনতাইয়ের মতো অপরাধ উল্লেখযোগ্য হারে হ্রাস পাবে বলে আশা করা যাচ্ছে। স্থানীয় ব্যবসায়ীরা এই উদ্যোগে ব্যাপক সন্তোষ প্রকাশ করেছেন এবং বাজার কমিটিকে সাধুবাদ জানিয়েছেন।"
  },
  {
    id: 2,
    title: "চিথলিয়া ইউনিয়নের ৫নং ওয়ার্ডে বন্যার্তদের মাঝে জরুরি ত্রাণ বিতরণ",
    date: "১৫ আগস্ট, ২০২৬",
    location: "৫নং ওয়ার্ড, চিথলিয়া",
    image: "/images/banner-1.png",
    shortDesc: "স্মরণকালের ভয়াবহ বন্যায় পানিবন্দী অসহায় মানুষের মাঝে শুকনো খাবার, বিশুদ্ধ পানি ও জরুরি ঔষধ বিতরণ কার্যক্রম সম্পন্ন হয়েছে।",
    fullDesc: "স্মরণকালের ভয়াবহ বন্যায় পানিবন্দী অসহায় মানুষের মাঝে শুকনো খাবার, বিশুদ্ধ পানি ও জরুরি ঔষধ বিতরণ কার্যক্রম সম্পন্ন হয়েছে। তাজ উদ্দিন রাসেদ নিজে নৌকাযোগে প্রত্যন্ত অঞ্চলে গিয়ে মানুষের ঘরে ঘরে এই ত্রাণ পৌঁছে দেন। প্রায় ৫০০ পরিবারের মাঝে এই সহায়তা প্রদান করা হয়। বন্যা পরবর্তী সময়ে পানিবাহিত রোগ প্রতিরোধে মেডিকেল ক্যাম্প স্থাপনেরও ঘোষণা দেন তিনি।"
  },
  {
    id: 3,
    title: "এলাকার যুবসমাজকে মাদকমুক্ত রাখতে প্রীতি ফুটবল টুর্নামেন্টের আয়োজন",
    date: "০২ আগস্ট, ২০২৬",
    location: "চিথলিয়া হাই স্কুল মাঠ",
    image: "/images/banner-1.png",
    shortDesc: "যুবসমাজকে মাদক ও কিশোর গ্যাংয়ের ভয়াল থাবা থেকে দূরে রাখতে এবং সুস্থ বিনোদনের লক্ষ্যে প্রীতি ফুটবল ম্যাচ অনুষ্ঠিত হয়েছে।",
    fullDesc: "যুবসমাজকে মাদক ও কিশোর গ্যাংয়ের ভয়াল থাবা থেকে দূরে রাখতে এবং সুস্থ বিনোদনের লক্ষ্যে প্রীতি ফুটবল ম্যাচ অনুষ্ঠিত হয়েছে। উদ্বোধনী অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত ছিলেন তাজ উদ্দিন রাসেদ। তিনি খেলোয়াড়দের মাঝে জার্সি ও খেলার সামগ্রী বিতরণ করেন। তিনি তার বক্তব্যে বলেন, 'সুস্থ সমাজ গঠনে খেলাধুলার কোনো বিকল্প নেই। প্রতিটি ওয়ার্ডে এমন আয়োজন অব্যাহত থাকবে।'"
  },
  {
    id: 4,
    title: "শীতার্থদের মাঝে শীতবস্ত্র ও কম্বল বিতরণ কর্মসূচি",
    date: "১০ জানুয়ারি, ২০২৬",
    location: "ইউনিয়ন পরিষদ প্রাঙ্গণ",
    image: "/images/banner-1.png",
    shortDesc: "তীব্র শীতে সাধারণ মানুষের কষ্ট লাঘবে ইউনিয়নের বিভিন্ন ওয়ার্ডের প্রায় ১০০০ অসহায় পরিবারের মাঝে কম্বল বিতরণ করা হয়েছে।",
    fullDesc: "তীব্র শীতে সাধারণ মানুষের কষ্ট লাঘবে ইউনিয়নের বিভিন্ন ওয়ার্ডের প্রায় ১০০০ অসহায় পরিবারের মাঝে কম্বল বিতরণ করা হয়েছে। দলীয় নেতাকর্মীদের সাথে নিয়ে গভীর রাতে বাড়ি বাড়ি গিয়েও এই শীতবস্ত্র পৌঁছে দেওয়া হয়।"
  }
];

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedActivity]);

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

        {/* Activities Grid - মোবাইলে ২টা (grid-cols-2) এবং পিসিতে ৪টা (lg:grid-cols-4) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {activitiesData.map((item) => (
            <div key={item.id} className="bg-cream rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Image Area - মোবাইলের জন্য হাইট কমানো হয়েছে (h-32) */}
              <div 
                className="relative h-32 md:h-40 lg:h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedActivity(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                {/* Date Badge - মোবাইলের জন্য সাইজ ছোট করা হয়েছে */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md flex items-center gap-1 md:gap-1.5 backdrop-blur-sm bg-brand/90">
                  <Calendar size={12} className="w-3 h-3 md:w-4 md:h-4" /> {item.date}
                </div>
              </div>

              {/* Content Area - মোবাইলে প্যাডিং ও টেক্সট ছোট করা হয়েছে */}
              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <h3 
                  onClick={() => setSelectedActivity(item)}
                  className="font-serif text-[13px] md:text-[16px] lg:text-lg font-bold text-brand-ink mb-2 md:mb-3 leading-snug cursor-pointer group-hover:text-brand transition-colors line-clamp-2"
                  title={item.title}
                >
                  {item.title}
                </h3>
                <p className="font-sans text-brand-ink/70 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-5 flex-grow line-clamp-2 md:line-clamp-3">
                  {item.shortDesc}
                </p>
                
                <button 
                  onClick={() => setSelectedActivity(item)}
                  className="inline-flex items-center gap-1.5 md:gap-2 text-brand font-bold text-[11px] md:text-sm hover:text-gold transition-colors mt-auto group/btn w-fit"
                >
                  বিস্তারিত <ArrowRight size={14} className="md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

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

      {/* --- Pop-up Modal (Full Screen Overlay) --- */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
          <div 
            className="absolute inset-0 bg-brand-deep/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedActivity(null)}
          ></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedActivity(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-blood text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto">
              <div className="relative w-full h-48 md:h-80 bg-cream">
                <img 
                  src={selectedActivity.image} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="p-5 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold text-brand/80 mb-3 md:mb-4">
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><Calendar size={14} className="md:w-4 md:h-4" /> {selectedActivity.date}</span>
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><MapPin size={14} className="md:w-4 md:h-4" /> {selectedActivity.location}</span>
                </div>
                
                <h2 className="font-serif text-xl md:text-3xl font-bold text-brand-ink mb-4 md:mb-6 leading-tight">
                  {selectedActivity.title}
                </h2>
                
                <div className="font-sans text-brand-ink/80 text-[14px] md:text-[16px] leading-relaxed space-y-4">
                  <p>{selectedActivity.fullDesc}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
}