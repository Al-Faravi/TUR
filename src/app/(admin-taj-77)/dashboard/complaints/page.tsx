"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, CheckCircle, Clock, Trash2, EyeOff, Eye, X } from 'lucide-react';

export default function ComplaintsAdminPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // মিডিয়া দেখার জন্য স্টেট (Pop-up Modal)
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  // Supabase থেকে ডাটা ফেচ করা
  const fetchComplaints = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching complaints:', error);
    } else {
      setComplaints(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // স্ট্যাটাস পরিবর্তন করা
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';
    const { error } = await supabase
      .from('complaints')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (!error) {
      fetchComplaints();
    } else {
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  // মুছে ফেলা (Delete)
  const deleteComplaint = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিত যে এই অভিযোগটি মুছে ফেলতে চান?")) return;
    
    const { error } = await supabase.from('complaints').delete().eq('id', id);
    if (!error) {
      fetchComplaints();
    }
  };

  // তারিখ ফরম্যাট (Standard English format)
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // ফাইলটি ভিডিও কি না তা চেক করার ফাংশন
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShieldAlert className="text-blood" /> অভিযোগ বাক্স
          </h1>
          <p className="text-gray-500 mt-1">জনগণের পাঠানো সকল অভিযোগ ও পরামর্শের তালিকা।</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-bold text-brand">
          মোট অভিযোগ: {complaints.length} টি
        </div>
      </div>

      {/* Complaints Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-bold animate-pulse">
            ডাটা লোড হচ্ছে...
          </div>
        ) : complaints.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-bold">
            এখনো কোনো অভিযোগ জমা পড়েনি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100 whitespace-nowrap">
                  <th className="p-4 font-bold">নাম ও নাম্বার</th>
                  <th className="p-4 font-bold">ধরন ও ওয়ার্ড</th>
                  <th className="p-4 font-bold min-w-[200px]">বিস্তারিত বিবরণ</th>
                  <th className="p-4 font-bold">প্রমাণ (ফাইল)</th>
                  <th className="p-4 font-bold">তারিখ</th>
                  <th className="p-4 font-bold">স্ট্যাটাস</th>
                  <th className="p-4 font-bold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {complaints.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Name & Phone */}
                    <td className="p-4">
                      {item.is_anonymous ? (
                        <div className="flex items-center gap-2 text-gray-500 font-semibold bg-gray-100 px-2 py-1 rounded w-fit text-sm">
                          <EyeOff size={14} /> পরিচয় গোপন
                        </div>
                      ) : (
                        <div className="whitespace-nowrap">
                          <p className="font-bold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.phone}</p>
                        </div>
                      )}
                    </td>

                    {/* Category & Ward */}
                    <td className="p-4">
                      <span className="inline-block bg-brand/10 text-brand font-bold text-xs px-2 py-1 rounded mb-1 whitespace-nowrap">
                        {item.category}
                      </span>
                      <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">{item.ward_no} নং ওয়ার্ড</p>
                    </td>

                    {/* Description */}
                    <td className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-3" title={item.description}>
                        {item.description}
                      </p>
                    </td>

                    {/* File / Proof Link */}
                    <td className="p-4">
                      {item.file_url ? (
                        <button 
                          onClick={() => setSelectedMedia(item.file_url)}
                          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-dark transition-colors bg-brand/10 hover:bg-brand/20 px-3 py-1.5 rounded-lg whitespace-nowrap"
                        >
                          <Eye size={14} /> ফাইল দেখুন
                        </button>
                      ) : (
                        <span className="text-[13px] text-gray-400 font-semibold whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                          কোনো ফাইল নেই
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {item.status === 'resolved' ? (
                        <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded w-fit whitespace-nowrap">
                          <CheckCircle size={16} /> সমাধান হয়েছে
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 px-2 py-1 rounded w-fit whitespace-nowrap">
                          <Clock size={16} /> অপেক্ষমাণ
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleStatus(item.id, item.status)}
                        className={`p-2 rounded-lg transition-colors shadow-sm border ${
                          item.status === 'resolved' 
                            ? 'bg-white border-gray-200 text-amber-600 hover:bg-amber-50' 
                            : 'bg-green-600 text-white border-green-600 hover:bg-green-700'
                        }`}
                        title={item.status === 'resolved' ? 'অপেক্ষমাণ করুন' : 'সমাধান হিসেবে মার্ক করুন'}
                      >
                        {item.status === 'resolved' ? <Clock size={16} /> : <CheckCircle size={16} />}
                      </button>
                      <button 
                        onClick={() => deleteComplaint(item.id)}
                        className="p-2 bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-100 rounded-lg transition-colors shadow-sm"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- Media Pop-up Modal --- */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header & Close Button */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Eye size={18} className="text-brand" /> সংযুক্ত প্রমাণ
              </h3>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-colors border border-gray-200 shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            {/* Media Content Area */}
            <div className="p-6 bg-gray-100 flex-grow flex items-center justify-center overflow-hidden min-h-[300px]">
              {isVideo(selectedMedia) ? (
                <video 
                  src={selectedMedia} 
                  controls 
                  autoPlay 
                  className="max-w-full max-h-[70vh] rounded-lg shadow-md border border-gray-200"
                />
              ) : (
                <img 
                  src={selectedMedia} 
                  alt="Complaint Evidence" 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md border border-gray-200"
                />
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}