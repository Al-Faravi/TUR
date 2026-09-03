"use client";
import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Menu, Loader2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // লগইন না থাকলে /login এ পাঠাবে, কিন্তু loading false করবে না!
        // ফলে রিডাইরেক্ট হওয়ার সময় ব্ল্যাংক স্ক্রিনের বদলে স্পিনার দেখাবে।
        router.replace('/login'); 
      } else {
        setIsAuthenticated(true);
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, pathname]);

  // লোডিং বা রিডাইরেক্ট হওয়ার সময় স্পিনার দেখাবে (কোনো ব্ল্যাংক স্ক্রিন নয়)
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen h-screen overflow-y-auto">
        <div className="lg:hidden bg-brand-deep text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <h1 className="font-serif font-bold text-lg text-gold">অ্যাডমিন প্যানেল</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-1.5 bg-white/10 rounded-md hover:bg-white/20 transition-colors">
            <Menu size={22} />
          </button>
        </div>
        <main className="p-3 sm:p-4 md:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}