"use client";
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, X, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// এখানে আরও বেশি ডাটা থাকতে পারে
const allActivitiesData = [
  {
    id: 1,
    title: "শালধর বাজারে নিরাপত্তা বৃদ্ধির জন্য নতুন সিসিটিভি ক্যামেরা স্থাপন",
    date: "২৮ আগস্ট, ২০২৬",
    location: "শালধর বাজার",
    image: "/images/banner-1.png",
    shortDesc: "এলাকার ব্যবসায়ী ও সাধারণ মানুষের নিরাপত্তা নিশ্চিত করতে শালধর বাজার বণিক সমিতির উদ্যোগে পুরো বাজার সিসিটিভির আওতায় আনা হয়েছে।",
    fullDesc: "এলাকার ব্যবসায়ী ও সাধারণ মানুষের নিরাপত্তা নিশ্চিত করতে শালধর বাজার বণিক সমিতির উদ্যোগে পুরো বাজার সিসিটিভির আওতায় আনা হয়েছে। দীর্ঘদিনের দাবির প্রেক্ষিতে তাজ উদ্দিন রাসেদ-এর প্রত্যক্ষ তত্ত্বাবধানে ও আর্থিক সহযোগিতায় এই প্রকল্পটি বাস্তবায়িত হয়।"
  },
  {
    id: 2,
    title: "চিথলিয়া ইউনিয়নের ৫নং ওয়ার্ডে বন্যার্তদের মাঝে জরুরি ত্রাণ বিতরণ",
    date: "১৫ আগস্ট, ২০২৬",
    location: "৫নং ওয়ার্ড, চিথলিয়া",
    image: "/images/banner-1.png",
    shortDesc: "স্মরণকালের ভয়াবহ বন্যায় পানিবন্দী অসহায় মানুষের মাঝে শুকনো খাবার, বিশুদ্ধ পানি ও জরুরি ঔষধ বিতরণ কার্যক্রম সম্পন্ন হয়েছে।",
    fullDesc: "স্মরণকালের ভয়াবহ বন্যায় পানিবন্দী অসহায় মানুষের মাঝে শুকনো খাবার, বিশুদ্ধ পানি ও জরুরি ঔষধ বিতরণ কার্যক্রম সম্পন্ন হয়েছে। তাজ উদ্দিন রাসেদ নিজে নৌকাযোগে প্রত্যন্ত অঞ্চলে গিয়ে মানুষের ঘরে ঘরে এই ত্রাণ পৌঁছে দেন।"
  },
  {
    id: 3,
    title: "এলাকার যুবসমাজকে মাদকমুক্ত রাখতে প্রীতি ফুটবল টুর্নামেন্টের আয়োজন",
    date: "০২ আগস্ট, ২০২৬",
    location: "চিথলিয়া হাই স্কুল মাঠ",
    image: "/images/banner-1.png",
    shortDesc: "যুবসমাজকে মাদক ও কিশোর গ্যাংয়ের ভয়াল থাবা থেকে দূরে রাখতে এবং সুস্থ বিনোদনের লক্ষ্যে প্রীতি ফুটবল ম্যাচ অনুষ্ঠিত হয়েছে।",
    fullDesc: "যুবসমাজকে মাদক ও কিশোর গ্যাংয়ের ভয়াল থাবা থেকে দূরে রাখতে এবং সুস্থ বিনোদনের লক্ষ্যে প্রীতি ফুটবল ম্যাচ অনুষ্ঠিত হয়েছে। উদ্বোধনী অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত ছিলেন তাজ উদ্দিন রাসেদ।"
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

export default function ActivitiesPage() {
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

        {/* Full Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allActivitiesData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative h-48 sm:h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedActivity(item)}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm bg-brand/90">
                  <Calendar size={12} /> {item.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 onClick={() => setSelectedActivity(item)} className="font-serif text-lg md:text-xl font-bold text-brand-ink mb-3 leading-snug cursor-pointer group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-ink/70 text-sm leading-relaxed mb-6 flex-grow">{item.shortDesc}</p>
                <button onClick={() => setSelectedActivity(item)} className="inline-flex items-center gap-2 text-brand font-bold text-sm hover:text-gold transition-colors mt-auto group/btn w-fit">
                  বিস্তারিত পড়ুন <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Pop-up Modal (Reused Logic) --- */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
          <div className="absolute inset-0 bg-brand-deep/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedActivity(null)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedActivity(null)} className="absolute top-4 right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-blood text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md">
              <X size={20} />
            </button>
            <div className="overflow-y-auto">
              <div className="relative w-full h-56 md:h-80 bg-cream">
                <img src={selectedActivity.image} alt={selectedActivity.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-semibold text-brand/80 mb-4">
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><Calendar size={16} /> {selectedActivity.date}</span>
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><MapPin size={16} /> {selectedActivity.location}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-ink mb-6 leading-tight">{selectedActivity.title}</h2>
                <div className="font-sans text-brand-ink/80 text-[15px] md:text-[16px] leading-relaxed space-y-4">
                  <p>{selectedActivity.fullDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}