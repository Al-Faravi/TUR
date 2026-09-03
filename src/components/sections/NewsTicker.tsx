export default function NewsTicker() {
  const newsItems = [
    "✅ আগামী শুক্রবার চিথলিয়া ইউনিয়নে ফ্রি মেডিকেল ক্যাম্প অনুষ্ঠিত হবে।",
    "✅ শালধর বাজারে নিরাপত্তা বৃদ্ধির জন্য নতুন সিসিটিভি ক্যামেরা স্থাপন করা হয়েছে।",
    "✅ কৃষকদের জন্য সরকারি ভর্তুকির সার বিতরণ কার্যক্রম শুরু হয়েছে।",
    "✅ যেকোনো জরুরি প্রয়োজনে সরাসরি কল করুন হটলাইন নম্বরে।"
  ];

  return (
    <div className="bg-brand-deep border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-stretch h-10 md:h-12">
        
        {/* Red Label */}
        <div className="bg-blood text-white px-3 md:px-6 text-xs md:text-sm font-bold flex items-center whitespace-nowrap shadow-[5px_0_10px_rgba(0,0,0,0.2)] z-10">
          সাম্প্রতিক আপডেট
        </div>
        
        {/* Marquee on Green bg with Cream text */}
        <div className="overflow-hidden relative w-full flex items-center h-full bg-brand-dark/50">
          
          {/* Main Animated Track */}
          <div className="animate-marquee flex gap-10 px-4 h-full">
            
            {/* First Set of News */}
            <div className="flex gap-10 items-center min-w-max">
              {newsItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5 text-[12px] md:text-sm font-sans font-medium text-cream/90">
                  {item}
                </span>
              ))}
            </div>

            {/* Second Set of News (For seamless infinite loop) */}
            <div className="flex gap-10 items-center min-w-max" aria-hidden="true">
              {newsItems.map((item, idx) => (
                <span key={`dup-${idx}`} className="flex items-center gap-1.5 text-[12px] md:text-sm font-sans font-medium text-cream/90">
                  {item}
                </span>
              ))}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}