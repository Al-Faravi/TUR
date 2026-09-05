"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, CheckCircle, Clock, Trash2, EyeOff, Eye, X, AlertTriangle, FileText } from 'lucide-react';

export default function ComplaintsAdminPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals State
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null); // প্রমাণ দেখার জন্য
  const [viewModalData, setViewModalData] = useState<any | null>(null); // বিস্তারিত পড়ার জন্য
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null); // নিরাপদ ডিলিটের জন্য

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
      setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } else {
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  // মুছে ফেলা (Safe Delete)
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    
    const { error } = await supabase.from('complaints').delete().eq('id', deleteConfirmId);
    if (!error) {
      setComplaints(complaints.filter(c => c.id !== deleteConfirmId));
    } else {
      alert("ডিলিট করতে সমস্যা হয়েছে!");
    }
    setDeleteConfirmId(null); // Close modal
  };

  // তারিখ ফরম্যাট
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
            <ShieldAlert className="text-red-500" /> অভিযোগ বাক্স
          </h1>
          <p className="text-gray-500 mt-1">জনগণের পাঠানো সকল অভিযোগ ও পরামর্শের তালিকা।</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-bold text-blue-600">
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
            এখনো কোনো অভিযোগ জমা পড়েনি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100 whitespace-nowrap">
                  <th className="p-4 font-bold">নাম ও নাম্বার</th>
                  <th className="p-4 font-bold">ধরন ও ওয়ার্ড</th>
                  <th className="p-4 font-bold w-1/3">বিস্তারিত বিবরণ</th>
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
                        <div className="flex items-center gap-1.5 text-gray-500 font-semibold bg-gray-100 px-2 py-1 rounded w-fit text-sm">
                          <EyeOff size={14} /> পরিচয় গোপন
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
                      <span className="inline-block bg-blue-50 text-blue-600 font-bold text-xs px-2 py-1 rounded mb-1 whitespace-nowrap">
                        {item.complaint_type || item.category}
                      </span>
                      <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">{item.ward_no} নং ওয়ার্ড</p>
                    </td>

                    {/* Description - Line Clamp & View More */}
                    <td className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2" title={item.description}>
                        {item.description}
                      </p>
                      <button 
                        onClick={() => setViewModalData(item)}
                        className="text-blue-600 hover:text-blue-800 text-[13px] font-bold mt-1.5 flex items-center gap-1 transition-colors"
                      >
                        <FileText size={14} /> বিস্তারিত পড়ুন
                      </button>
                    </td>

                    {/* File / Proof Link */}
                    <td className="p-4">
                      {item.file_url ? (
                        <button 
                          onClick={() => setSelectedMedia(item.file_url)}
                          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg whitespace-nowrap"
                        >
                          <Eye size={14} /> ফাইল দেখুন
                        </button>
                      ) : (
                        <span className="text-[13px] text-gray-400 font-semibold whitespace-nowrap bg-gray-50 px-2 py-1 rounded border border-gray-100">
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
                          <CheckCircle size={16} /> সমাধান হয়েছে
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 px-2 py-1 rounded w-fit whitespace-nowrap border border-amber-100">
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
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-2 bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg transition-colors shadow-sm"
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

      {/* ================= MODALS ================= */}

      {/* 1. View Details Modal */}
      {viewModalData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} /> অভিযোগের বিস্তারিত বিবরণ
              </h3>
              <button onClick={() => setViewModalData(null)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider font-semibold">নাম</p>
                  <p className="font-bold text-gray-800">{viewModalData.is_anonymous ? "পরিচয় গোপন" : viewModalData.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider font-semibold">মোবাইল নাম্বার</p>
                  <p className="font-bold text-gray-800">{viewModalData.is_anonymous ? "গোপন রাখা হয়েছে" : viewModalData.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider font-semibold">ধরন ও ওয়ার্ড</p>
                  <p className="font-bold text-gray-800">{viewModalData.complaint_type || viewModalData.category} ({viewModalData.ward_no} নং ওয়ার্ড)</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider font-semibold">তারিখ ও সময়</p>
                  <p className="font-bold text-gray-800">{formatDate(viewModalData.created_at)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2 text-xs uppercase tracking-wider font-semibold">মূল অভিযোগ</p>
                <div className="bg-white p-5 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap text-sm border border-gray-100 shadow-inner">
                  {viewModalData.description}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => setViewModalData(null)} className="px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-sm">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Media Pop-up Modal (Your existing design) */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Eye size={18} className="text-blue-600" /> সংযুক্ত প্রমাণ
              </h3>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-colors border border-gray-200 shadow-sm"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 bg-gray-100 flex-grow flex items-center justify-center overflow-hidden min-h-[300px]">
              {isVideo(selectedMedia) ? (
                <video src={selectedMedia} controls autoPlay className="max-w-full max-h-[70vh] rounded-lg shadow-md border border-gray-200" />
              ) : (
                <img src={selectedMedia} alt="Complaint Evidence" className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md border border-gray-200" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">আপনি কি নিশ্চিত?</h3>
              <p className="text-sm text-gray-500 mb-6">
                এই অভিযোগটি স্থায়ীভাবে মুছে যাবে। এই কাজটি আর ফিরিয়ে আনা সম্ভব নয়।
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmId(null)} 
                  className="flex-1 py-3 px-4 text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  বাতিল করুন
                </button>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 py-3 px-4 text-white font-bold bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md shadow-red-200"
                >
                  হ্যাঁ, ডিলিট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}