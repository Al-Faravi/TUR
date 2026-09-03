import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-cream pt-16 md:pt-24 pb-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16 border-b border-white/10 pb-12 md:pb-16">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-inner shrink-0">
                <span className="text-brand-ink font-serif font-bold text-lg">তা</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-xl tracking-wide leading-tight text-white">
                  তাজ উদ্দিন রাসেদ
                </span>
                <span className="text-xs font-semibold mt-0.5 text-gold">
                  ৩ নং চিথলিয়া ইউনিয়ন, পরশুরাম
                </span>
              </div>
            </div>
            <p className="font-sans text-cream/70 text-[14px] leading-7 max-w-sm mb-6">
              তৃণমূলের সুদীর্ঘ রাজপথের পরীক্ষিত নেতৃত্ব। চিথলিয়া ইউনিয়নের মানুষের অধিকার, শান্তি ও একটি দুর্নীতিমুক্ত মডেল সমাজ গড়ার অদম্য প্রতিজ্ঞায় নিবেদিত প্রাণ।
            </p>
            
            {/* Social Links (FB, X, Insta, YouTube) */}
            <div className="flex items-center gap-3">
              
              {/* Facebook */}
              <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-black transition-all">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gold rounded-full inline-block"></span> প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-3">
              <li><Link href="/#about" className="text-cream/70 hover:text-gold transition-colors text-[14px] flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> জীবনী ও সংগ্রাম</Link></li>
              <li><Link href="/#manifesto" className="text-cream/70 hover:text-gold transition-colors text-[14px] flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> উন্নয়ন রূপরেখা</Link></li>
              <li><Link href="/activities" className="text-cream/70 hover:text-gold transition-colors text-[14px] flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> সকল কার্যক্রম</Link></li>
              <li><Link href="/#media" className="text-cream/70 hover:text-gold transition-colors text-[14px] flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> ফটো ও ভিডিও গ্যালারি</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gold rounded-full inline-block"></span> যোগাযোগ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-cream/70 text-[14px] leading-relaxed">শালধর বাজার, ৩ নং চিথলিয়া ইউনিয়ন, পরশুরাম, ফেনী।</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <a href="tel:01XXXXXXXXX" className="text-cream/70 hover:text-white transition-colors text-[14px]">০১XXX-XXXXXX</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:info@tajuddinrashed.com" className="text-cream/70 hover:text-white transition-colors text-[14px]">info@tajuddinrashed.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-[13px]">
            &copy; {currentYear} তাজ উদ্দিন রাসেদ। সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          <Link 
            href="/complaint" 
            className="flex items-center gap-2 bg-blood/10 hover:bg-blood/20 border border-blood/20 text-white px-4 py-2 rounded-full transition-colors text-[12px] font-bold"
          >
            <ShieldAlert size={14} /> অনলাইনে অভিযোগ দিন
          </Link>
        </div>

      </div>
    </footer>
  );
}