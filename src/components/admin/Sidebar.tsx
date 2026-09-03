"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Inbox, Briefcase, Image as ImageIcon, Settings as SettingsIcon, LogOut, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// onClose প্রপস নেওয়া হলো যা মোবাইল ভিউতে শাটার বন্ধ করবে
export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'ড্যাশবোর্ড', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'অভিযোগ', icon: Inbox, href: '/dashboard/complaints' },
    { name: 'মাঠের কাজ', icon: Briefcase, href: '/dashboard/activities' }, 
    { name: 'গ্যালারি', icon: ImageIcon, href: '/dashboard/media' },
    { name: 'সেটিংস', icon: SettingsIcon, href: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="w-64 bg-brand-deep h-screen text-white flex flex-col shadow-2xl">
      
      {/* Sidebar Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg text-gold leading-tight">তাজ উদ্দিন রাসেদ</h2>
          <p className="font-sans text-[11px] text-cream/60 uppercase tracking-widest mt-0.5">অ্যাডমিন প্যানেল</p>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden p-1.5 bg-white/5 hover:bg-red-500 rounded-md transition-colors text-white/70 hover:text-white">
          <X size={18} />
        </button>
      </div>
      
      {/* Menu Items (Compact size) */}
      <div className="flex-grow py-4 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={onClose} // ক্লিক করলেই শাটার বন্ধ হবে
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand text-white font-bold shadow-sm' 
                    : 'text-cream/70 hover:bg-white/10 hover:text-white text-sm'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-gold' : 'opacity-70'} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-bold text-sm"
        >
          <LogOut size={18} /> 
          <span>লগআউট</span>
        </button>
      </div>

    </div>
  );
}