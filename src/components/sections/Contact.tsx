import { Phone, MapPin, Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    // স্পেস কমানো হয়েছে: py-10 md:py-14
    <section id="contact" className="bg-cream py-10 md:py-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">
              যোগাযোগ
            </span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand mb-2 md:mb-3">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="font-sans text-brand-ink/70 leading-6 text-[13px] md:text-[15px] px-2">
            যেকোনো তথ্য, পরামর্শ বা প্রয়োজনে সরাসরি কল করুন অথবা মেসেজ দিন।
          </p>
        </div>

        {/* 3-Column Compact Grid for PC, Stacked for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          
          {/* Column 1: Contact Information */}
          <div className="bg-white p-5 md:p-7 rounded-xl md:rounded-2xl shadow-sm border border-black/5 flex flex-col justify-center h-full">
            <h3 className="font-serif text-lg font-bold text-brand-ink mb-5 border-b border-black/5 pb-3">
              তাজ উদ্দিন রাসেদ
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">মোবাইল</p>
                  <a href="tel:01862674369" className="font-sans text-brand-ink font-bold hover:text-brand transition-colors text-[13px] md:text-[15px]">
                    ০১৮৬২৬৭৪৩৬৯
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">ইমেইল</p>
                  <a href="mailto:info@tajuddinrashed.com" className="font-sans text-brand-ink font-bold hover:text-brand transition-colors text-[13px] md:text-[15px]">
                    info@tajuddinrashed.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">ঠিকানা</p>
                  <p className="font-sans text-brand-ink font-bold text-[13px] md:text-[15px] leading-snug">
                    শালধর বাজার, ৩ নং চিথলিয়া<br />ইউনিয়ন, পরশুরাম, ফেনী।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Compact Contact Form */}
          <div className="bg-white p-5 md:p-7 rounded-xl md:rounded-2xl shadow-sm border border-black/5 h-full">
            <h3 className="font-serif text-lg font-bold text-brand-ink mb-4">সংক্ষিপ্ত বার্তা</h3>
            <form className="space-y-3.5">
              <input 
                type="text" 
                placeholder="আপনার নাম"
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm"
                required
              />
              <input 
                type="tel" 
                placeholder="মোবাইল নাম্বার"
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm"
                required
              />
              <textarea 
                rows={2}
                placeholder="মতামত বা মেসেজ..."
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm resize-none"
                required
              ></textarea>
              <button 
                type="button" 
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-[13px] md:text-sm"
              >
                পাঠিয়ে দিন <Send size={14} />
              </button>
            </form>
          </div>

          {/* Column 3: Google Maps Updated Location */}
          <div className="h-[250px] lg:h-full min-h-[250px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-black/5 relative group">
            <iframe 
              src="https://maps.google.com/maps?q=Shaldhar+Bazar,+Parshuram,+Feni&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}