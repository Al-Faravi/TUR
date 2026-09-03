"use client";
import { useState, useRef } from 'react';
import { Play, X, Image as ImageIcon, Video, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // স্লাইড স্ক্রল করার জন্য Refs
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const photoScrollRef = useRef<HTMLDivElement>(null);

  // স্ক্রল কন্ট্রোল ফাংশন
  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // ৫টি ভিডিও ডাটা (যাতে সোয়াইপ করা যায়)
  const videos = [
    { id: 1, title: 'চিথলিয়া ইউনিয়নের উন্নয়ন রূপরেখা নিয়ে বিশেষ সাক্ষাৎকার', date: '১০ সেপ্টে, ২০২৬' },
    { id: 2, title: '৫নং ওয়ার্ডে ত্রাণ বিতরণ ও মানুষের সাথে মতবিনিময়', date: '১৫ আগস্ট, ২০২৬' },
    { id: 3, title: 'যুবদলের কর্মীসভায় দিকনির্দেশনামূলক বক্তব্য', date: '০১ আগস্ট, ২০২৬' },
    { id: 4, title: 'শালধর বাজারে ব্যবসায়ীদের সাথে মতবিনিময় সভা', date: '২০ জুলাই, ২০২৬' },
    { id: 5, title: 'স্থানীয় কৃষকদের আধুনিক কৃষি পদ্ধতি সম্পর্কে দিকনির্দেশনা', date: '০৫ জুন, ২০২৬' },
  ];

  // ১০টি গ্যালারি ছবির ডামি এরে
  const photos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    // স্পেস কমানো হয়েছে: py-10 md:py-16
    <section id="media" className="bg-white py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (মার্জিন কমানো হয়েছে: mb-8 md:mb-12) */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">
              আলোকচিত্র ও ভিডিও
            </span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-brand mb-3 md:mb-4">
            মিডিয়া ও গ্যালারি
          </h2>
          <p className="font-sans text-brand-ink/70 leading-6 md:leading-7 text-[13px] md:text-base px-2">
            তাজ উদ্দিন রাসেদের রাজনৈতিক ও সামাজিক জীবনের গুরুত্বপূর্ণ মুহূর্তগুলো একনজরে।
          </p>
        </div>

        {/* Video Swipe Section (মার্জিন কমানো হয়েছে: mb-10 md:mb-14) */}
        <div className="mb-10 md:mb-14 relative">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-ink flex items-center gap-2">
              <span className="w-2 h-6 bg-gold rounded-full inline-block"></span> ভিডিও গ্যালারি
            </h3>
            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(videoScrollRef, 'left')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll(videoScrollRef, 'right')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
          
          {/* Scrollable Track */}
          <div 
            ref={videoScrollRef} 
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
          >
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer min-w-[85vw] md:min-w-[340px] lg:min-w-[400px] snap-start shrink-0">
                <div className="relative aspect-video bg-brand-deep rounded-xl md:rounded-2xl overflow-hidden mb-3 shadow-md border border-black/5">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:scale-105 transition-transform duration-700 bg-brand-ink">
                    <Video size={48} strokeWidth={1} />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gold/90 text-brand-ink rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 md:w-7 md:h-7 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">
                    {video.date}
                  </div>
                </div>
                <h4 className="font-sans font-bold text-brand-ink group-hover:text-brand transition-colors text-[14px] md:text-[16px] line-clamp-2 leading-snug px-1">
                  {video.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Swipe Section */}
        <div className="relative">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-ink flex items-center gap-2">
              <span className="w-2 h-6 bg-gold rounded-full inline-block"></span> স্থিরচিত্র
            </h3>
            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(photoScrollRef, 'left')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll(photoScrollRef, 'right')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
          
          {/* Scrollable Track */}
          <div 
            ref={photoScrollRef} 
            className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
          >
            {photos.map((item) => (
              <div 
                key={item} 
                onClick={() => setSelectedImage(`/images/gallery-${item}.jpg`)}
                className="relative min-w-[45vw] md:min-w-[220px] lg:min-w-[280px] aspect-square bg-cream rounded-xl overflow-hidden cursor-pointer group shadow-sm ring-1 ring-black/5 snap-start shrink-0"
              >
                <div className="absolute inset-0 flex items-center justify-center text-brand/20 group-hover:scale-110 transition-transform duration-500 bg-black/5">
                  <ImageIcon size={32} />
                </div>
                <div className="absolute inset-0 bg-brand-deep/0 group-hover:bg-brand-deep/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    বড় করে দেখুন
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video md:aspect-[4/3] bg-brand-ink rounded-lg overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
            <ImageIcon size={64} className="text-white/20" />
            <span className="absolute mt-24 text-white/50 text-sm">আসল ছবি এখানে রেন্ডার হবে</span>
          </div>
        </div>
      )}
    </section>
  );
}