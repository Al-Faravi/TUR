"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, CheckCircle, Clock, Trash2, X, AlertTriangle, Eye } from 'lucide-react';

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals State
  const [viewModalData, setViewModalData] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    const { error } = await supabase
      .from('contacts')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    const { error } = await supabase.from('contacts').delete().eq('id', deleteConfirmId);
    if (!error) {
      setMessages(messages.filter(m => m.id !== deleteConfirmId));
    }
    setDeleteConfirmId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Mail className="text-blue-500" /> ইনবক্স (বার্তা)
          </h1>
          <p className="text-gray-500 mt-1">ওয়েবসাইটের কন্টাক্ট ফর্ম থেকে আসা জনগণের মেসেজ।</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 font-bold text-blue-600">
          মোট বার্তা: {messages.length} টি
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-bold animate-pulse">লোড হচ্ছে...</div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-bold">এখনো কোনো বার্তা আসেনি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100 whitespace-nowrap">
                  <th className="p-4 font-bold">প্রেরকের নাম ও নাম্বার</th>
                  <th className="p-4 font-bold w-1/2">বার্তা</th>
                  <th className="p-4 font-bold">তারিখ</th>
                  <th className="p-4 font-bold">স্ট্যাটাস</th>
                  <th className="p-4 font-bold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50/50 transition-colors ${item.status === 'unread' ? 'bg-blue-50/30' : ''}`}>
                    
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-bold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.phone}</p>
                    </td>

                    <td className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2" title={item.message}>{item.message}</p>
                      <button 
                        onClick={() => {
                          setViewModalData(item);
                          if(item.status === 'unread') toggleStatus(item.id, 'unread'); // ওপেন করলেই Read হয়ে যাবে
                        }}
                        className="text-blue-600 hover:text-blue-800 text-[13px] font-bold mt-1.5 flex items-center gap-1"
                      >
                        <Eye size={14} /> বিস্তারিত পড়ুন
                      </button>
                    </td>

                    <td className="p-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>

                    <td className="p-4">
                      {item.status === 'read' ? (
                        <span className="flex items-center gap-1.5 text-gray-500 font-bold text-sm bg-gray-100 px-2 py-1 rounded w-fit">
                          <CheckCircle size={16} /> পড়া হয়েছে
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-blue-600 font-bold text-sm bg-blue-50 px-2 py-1 rounded w-fit border border-blue-100">
                          <Clock size={16} /> নতুন বার্তা
                        </span>
                      )}
                    </td>

                    <td className="p-4 flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-2 bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg shadow-sm"
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

      {/* View Message Modal */}
      {viewModalData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Mail className="text-blue-600" size={20} /> বার্তার বিস্তারিত
              </h3>
              <button onClick={() => setViewModalData(null)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <p className="text-sm text-gray-500 mb-1">প্রেরক:</p>
                <p className="font-bold text-gray-900 text-lg">{viewModalData.name}</p>
                <p className="font-semibold text-blue-600">{viewModalData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">মূল বার্তা:</p>
                <div className="bg-gray-50 p-5 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap text-sm border border-gray-100">
                  {viewModalData.message}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">মুছে ফেলতে চান?</h3>
              <p className="text-sm text-gray-500 mb-6">এই বার্তাটি স্থায়ীভাবে মুছে যাবে।</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3 px-4 text-gray-700 font-bold bg-gray-100 rounded-xl">বাতিল</button>
                <button onClick={handleDelete} className="flex-1 py-3 px-4 text-white font-bold bg-red-600 rounded-xl">হ্যাঁ, ডিলিট করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}