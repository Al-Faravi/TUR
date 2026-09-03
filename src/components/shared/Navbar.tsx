"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, PhoneCall, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Advanced Scroll Spy Logic (Only active on Home Page)
    if (isHomePage) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: "-20% 0px -40% 0px" } 
      );

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    } else {
      setActiveSection('');
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const navLinks = [
    { name: 'পরিচিতি', id: 'about' },
    { name: 'পথচলা', id: 'journey' },
    { name: 'অঙ্গীকার', id: 'manifesto' },
    { name: 'কার্যক্রম', id: 'activities' },
    { name: 'মিডিয়া', id: 'media' },
    { name: 'যোগাযোগ', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${
      isScrolled ? 'bg-cream text-brand-ink shadow-md py-1' : 'bg-brand-deep text-white py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-gold rounded-full flex items-center justify-center shadow-inner shrink-0">
              <span className="text-brand-ink font-serif font-bold text-base md:text-lg">তা</span>
            </div>
            <Link href="/" className="flex flex-col justify-center">
              <span className={`font-bold text-lg md:text-xl tracking-wide leading-tight ${isScrolled ? 'text-brand' : 'text-gold'}`}>
                তাজ উদ্দিন রাসেদ
              </span>
              <span className={`text-[10px] md:text-xs font-semibold mt-0.5 ${isScrolled ? 'text-brand-ink/70' : 'text-cream/80'}`}>
                ৩ নং চিথলিয়া ইউনিয়ন, পরশুরাম
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center ml-auto mr-4 xl:mr-8 space-x-4 xl:space-x-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              
              {/* Fix: Consistent href to prevent Hydration Mismatch */}
              return (
                <Link 
                  key={link.name} 
                  href={`/#${link.id}`} 
                  className={`relative px-1 py-2 text-[15px] xl:text-[16px] font-bold transition-colors duration-200 group
                    ${isActive 
                      ? 'text-brand' 
                      : (isScrolled ? 'text-brand-ink hover:text-brand' : 'text-white hover:text-gold')}
                  `}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-1 h-[2.5px] rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-full bg-brand' 
                      : `w-0 group-hover:w-full ${isScrolled ? 'bg-brand' : 'bg-gold'}`
                  }`}></span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5 border-l pl-4 xl:pl-5 border-current/20">
            <a href="tel:01862674369" className="flex items-center gap-1.5 font-bold text-sm xl:text-base hover:opacity-80 transition-opacity">
              <PhoneCall size={16} className={isScrolled ? 'text-brand' : 'text-gold'} />
              <span>০১৮৬২৬৭৪৩৬৯</span>
            </a>
            <Link 
              href="/complaint" 
              className="bg-blood hover:bg-blood/90 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-1.5"
            >
              <ShieldAlert size={16} /> অভিযোগ দিন
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`focus:outline-none ${isScrolled ? 'text-brand-ink' : 'text-white'}`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden border-t ${isScrolled ? 'bg-cream border-black/5' : 'bg-brand border-white/10'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <Link 
                  key={link.name} 
                  href={`/#${link.id}`} 
                  onClick={() => setIsOpen(false)} 
                  className={`block px-3 py-2.5 rounded-md font-bold transition-all ${
                    isActive 
                      ? 'bg-brand/10 text-brand border-l-4 border-brand pl-4' 
                      : (isScrolled ? 'hover:bg-black/5 text-brand-ink pl-3' : 'hover:bg-white/10 text-cream pl-3')
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className={`mt-4 pt-4 border-t flex flex-col gap-3 ${isScrolled ? 'border-black/5' : 'border-white/10'}`}>
              <a href="tel:01862674369" className="flex items-center justify-center gap-2 px-3 py-2 font-bold bg-black/5 rounded-full">
                <PhoneCall size={18} className={isScrolled ? 'text-brand' : 'text-gold'} /> 
                ০১৮৬২৬৭৪৩৬৯
              </a>
              <Link 
                href="/complaint" 
                onClick={() => setIsOpen(false)} 
                className="block text-center bg-blood hover:bg-blood/90 text-white px-5 py-3 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <ShieldAlert size={18} /> অভিযোগ বা পরামর্শ দিন
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}