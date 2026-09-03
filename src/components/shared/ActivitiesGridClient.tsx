"use client";
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, X, MapPin } from 'lucide-react';

export default function ActivitiesGridClient({ activities }: { activities: any[] }) {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Pop-up মডাল ওপেন থাকলে পেজের ব্যাকগ্রাউন্ড স্ক্রল বন্ধ রাখা
  useEffect(() => {
    if (selectedActivity) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedActivity]);

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center text-gray-500 font-bold bg-white p-10 rounded-2xl border border-black/5 shadow-sm">
        এখনো কোনো কার্যক্রম যোগ করা হয়নি।
      </div>
    );
  }

  return (
    <>
      {/* Activities Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
        {activities.map((item) => (
          <div key={item.id} className="bg-white rounded-xl md:rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
            
            <div 
              className="relative h-32 md:h-40 lg:h-48 overflow-hidden cursor-pointer" 
              onClick={() => setSelectedActivity(item)}
            >
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 bg-gray-100" 
              />
              <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md flex items-center gap-1 md:gap-1.5 backdrop-blur-sm bg-brand/90">
                <Calendar size={12} className="w-3 h-3 md:w-4 md:h-4" /> {item.date}
              </div>
            </div>

            <div className="p-3 md:p-5 flex flex-col flex-grow">
              <h3 
                onClick={() => setSelectedActivity(item)} 
                className="font-serif text-[13px] md:text-[16px] lg:text-lg font-bold text-brand-ink mb-2 md:mb-3 leading-snug cursor-pointer group-hover:text-brand transition-colors line-clamp-2"
                title={item.title}
              >
                {item.title}
              </h3>
              <p className="font-sans text-brand-ink/70 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-5 flex-grow line-clamp-2 md:line-clamp-3">
                {item.short_desc}
              </p>
              <button 
                onClick={() => setSelectedActivity(item)} 
                className="inline-flex items-center gap-1.5 md:gap-2 text-brand font-bold text-[11px] md:text-sm hover:text-gold transition-colors mt-auto group/btn w-fit"
              >
                বিস্তারিত পড়ুন <ArrowRight size={14} className="md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* --- Pop-up Modal --- */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
          <div className="absolute inset-0 bg-brand-deep/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedActivity(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedActivity(null)} 
              className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-blood text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
            
            <div className="overflow-y-auto">
              <div className="relative w-full h-48 md:h-80 bg-cream">
                <img src={selectedActivity.image_url} alt={selectedActivity.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-5 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold text-brand/80 mb-3 md:mb-4">
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><Calendar size={14} className="md:w-4 md:h-4" /> {selectedActivity.date}</span>
                  <span className="flex items-center gap-1.5 bg-brand/5 px-3 py-1 rounded-full"><MapPin size={14} className="md:w-4 md:h-4" /> {selectedActivity.location}</span>
                </div>
                
                <h2 className="font-serif text-xl md:text-3xl font-bold text-brand-ink mb-4 md:mb-6 leading-tight">
                  {selectedActivity.title}
                </h2>
                
                <div className="font-sans text-brand-ink/80 text-[14px] md:text-[16px] leading-relaxed space-y-4 whitespace-pre-wrap">
                  {selectedActivity.full_desc}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}