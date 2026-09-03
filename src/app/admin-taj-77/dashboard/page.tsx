"use client";
import { useEffect, useState } from 'react';
import { AlertTriangle, Briefcase, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    complaints: 0,
    activities: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      
      try {
        // Promise.all ব্যবহার করে একসাথে ৩টি টেবিল থেকে ডাটা কাউন্ট করা হচ্ছে (যাতে ফাস্ট লোড হয়)
        const [
          { count: complaintsCount },
          { count: activitiesCount },
          { count: mediaCount }
        ] = await Promise.all([
          supabase.from('complaints').select('*', { count: 'exact', head: true }),
          supabase.from('activities').select('*', { count: 'exact', head: true }),
          supabase.from('media').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          complaints: complaintsCount || 0,
          activities: activitiesCount || 0,
          media: mediaCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">স্বাগতম, অ্যাডমিন!</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">আপনার ওয়েবসাইটের সার্বিক অবস্থা একনজরে দেখে নিন।</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      ) : (
        /* মোবাইলে ২ কলাম (grid-cols-2), ট্যাবে ৩ কলাম এবং ডেস্কটপে ৪ কলাম */
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Complaints Card */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm font-semibold mb-0.5">মোট অভিযোগ</p>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800">{stats.complaints} <span className="text-sm font-normal text-gray-500">টি</span></h3>
            </div>
          </div>

          {/* Activities Card */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm font-semibold mb-0.5">মাঠ পর্যায়ের কাজ</p>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800">{stats.activities} <span className="text-sm font-normal text-gray-500">টি</span></h3>
            </div>
          </div>

          {/* Media / Gallery Card */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm font-semibold mb-0.5">গ্যালারি ফাইল</p>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800">{stats.media} <span className="text-sm font-normal text-gray-500">টি</span></h3>
            </div>
          </div>

          {/* Optional: System Status Card */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-xs md:text-sm font-semibold mb-0.5">সিস্টেম স্ট্যাটাস</p>
              <h3 className="text-base md:text-xl font-bold text-green-600 mt-1">অ্যাক্টিভ</h3>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}