"use client";
import { useState, useRef, useEffect } from 'react';
import { Play, X, Image as ImageIcon, ChevronLeft, ChevronRight, Loader2, Video } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function MediaGallery() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  const videoScrollRef = useRef<HTMLDivElement>(null);
  const photoScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMediaList(data);
      }
      setLoading(false);
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMedia]);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const photos = mediaList.filter(item => item.type === 'image');
  const videos = mediaList.filter(item => item.type === 'video');

  return (
    <section id="media" className="bg-white py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-brand animate-spin" />
            <p className="text-gray-500 font-bold text-sm">গ্যালারি লোড হচ্ছে...</p>
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-16 bg-cream rounded-2xl border border-black/5 text-gray-500 font-semibold">
            গ্যালারিতে এখনো কোনো ছবি বা ভিডিও যুক্ত করা হয়নি।
          </div>
        ) : (
          <>
            {/* Video Swipe Section */}
            {videos.length > 0 && (
              <div className="mb-10 md:mb-14 relative">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-ink flex items-center gap-2">
                    <span className="w-2 h-6 bg-gold rounded-full inline-block"></span> ভিডিও গ্যালারি
                  </h3>
                  <div className="hidden md:flex gap-2">
                    <button onClick={() => scroll(videoScrollRef, 'left')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronLeft size={20} /></button>
                    <button onClick={() => scroll(videoScrollRef, 'right')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronRight size={20} /></button>
                  </div>
                </div>
                
                <div 
                  ref={videoScrollRef} 
                  className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
                >
                  {videos.map((video) => (
                    <div 
                      key={video.id} 
                      onClick={() => setSelectedMedia(video)}
                      className="group cursor-pointer w-[85vw] md:w-[340px] lg:w-[400px] snap-start shrink-0 flex flex-col"
                    >
                      <div className="relative w-full aspect-video bg-brand-deep rounded-xl md:rounded-2xl overflow-hidden mb-3 shadow-md border border-black/5">
                        {video.url.includes('youtube.com') ? (
                          <img 
                            src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/hqdefault.jpg`} 
                            alt={video.title || "YouTube Video"} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                            loading="lazy"
                          />
                        ) : (
                          /* সরাসরি ভিডিওর প্রথম ফ্রেম দেখানোর জন্য #t=0.1 এবং preload="metadata" ব্যবহার করা হয়েছে */
                          <video 
                            src={`${video.url}#t=0.1`} 
                            preload="metadata" 
                            muted 
                            playsInline
                            className="w-full h-full object-cover"
                          ></video>
                        )}
                        
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gold/90 text-brand-ink rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 md:w-7 md:h-7 ml-1" fill="currentColor" />
                          </div>
                        </div>
                        
                        {video.date && (
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">
                            {video.date}
                          </div>
                        )}
                      </div>
                      <h4 className="font-sans font-bold text-brand-ink group-hover:text-brand transition-colors text-[14px] md:text-[16px] line-clamp-2 leading-snug px-1">
                        {video.title || "ভিডিও"}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery Swipe Section */}
            {photos.length > 0 && (
              <div className="relative">
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <h3 className="font-serif text-lg md:text-2xl font-bold text-brand-ink flex items-center gap-2">
                    <span className="w-2 h-6 bg-gold rounded-full inline-block"></span> স্থিরচিত্র
                  </h3>
                  <div className="hidden md:flex gap-2">
                    <button onClick={() => scroll(photoScrollRef, 'left')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronLeft size={20} /></button>
                    <button onClick={() => scroll(photoScrollRef, 'right')} className="p-2 rounded-full border border-black/10 hover:bg-gold hover:border-gold hover:text-brand-ink transition-colors"><ChevronRight size={20} /></button>
                  </div>
                </div>
                
                <div 
                  ref={photoScrollRef} 
                  className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
                >
                  {photos.map((photo) => (
                    <div 
                      key={photo.id} 
                      onClick={() => setSelectedMedia(photo)}
                      className="relative w-[45vw] md:w-[220px] lg:w-[280px] aspect-square bg-cream rounded-xl overflow-hidden cursor-pointer group shadow-sm ring-1 ring-black/5 snap-start shrink-0"
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.title || "Gallery Image"} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      <div className="absolute inset-0 bg-brand-deep/0 group-hover:bg-brand-deep/50 transition-all duration-300 flex items-center justify-center p-2 text-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-bold text-xs md:text-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg line-clamp-2">
                          {photo.title || "বড় করে দেখুন"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Lightbox / Modal for Images & Videos */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-brand-ink rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-white/10 shadow-2xl p-4">
            
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} alt={selectedMedia.title || "Image"} className="max-w-full max-h-[75vh] object-contain rounded-lg" />
            ) : selectedMedia.url.includes('youtube.com') ? (
              <div className="w-full aspect-video">
                <iframe src={`${selectedMedia.url}?autoplay=1`} className="w-full h-full rounded-lg" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
            ) : (
              <video src={selectedMedia.url} controls autoPlay className="max-w-full max-h-[75vh] rounded-lg"></video>
            )}

            {selectedMedia.title && (
              <h3 className="text-white font-serif font-bold text-base md:text-lg mt-4 text-center">
                {selectedMedia.title}
              </h3>
            )}
          </div>
        </div>
      )}
    </section>
  );
}