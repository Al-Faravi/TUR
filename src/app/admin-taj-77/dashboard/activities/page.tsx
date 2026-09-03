"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Loader2, X, Upload } from 'lucide-react';

export default function ActivitiesAdminPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // মডাল এবং ফর্মের স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    short_desc: '',
    full_desc: ''
  });

  // ডাটা ফেচ করা
  const fetchActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setActivities(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // ফর্ম ইনপুট হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // নতুন কাজ এড করা
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("অনুগ্রহ করে একটি ছবি সিলেক্ট করুন!");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. ছবি আপলোড করা
      const fileExt = file.name.split('.').pop();
      const fileName = `activities/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // 2. ডাটাবেসে সেভ করা
      const { error: dbError } = await supabase.from('activities').insert([
        {
          title: formData.title,
          date: formData.date,
          location: formData.location,
          short_desc: formData.short_desc,
          full_desc: formData.full_desc,
          image_url: urlData.publicUrl
        }
      ]);

      if (dbError) throw dbError;

      alert("নতুন কার্যক্রম সফলভাবে যুক্ত হয়েছে!");
      setIsModalOpen(false);
      setFormData({ title: '', date: '', location: '', short_desc: '', full_desc: '' });
      setFile(null);
      fetchActivities();

    } catch (error: any) {
      console.error("Error adding activity:", error.message);
      alert("কোনো একটি সমস্যা হয়েছে!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // মুছে ফেলা (Delete)
  const deleteActivity = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?")) return;
    
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) fetchActivities();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Briefcase className="text-brand" /> মাঠ পর্যায়ের কাজ
          </h1>
          <p className="text-gray-500 mt-1">ওয়েবসাইটের সাম্প্রতিক কার্যক্রমগুলো পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md"
        >
          <Plus size={20} /> নতুন যোগ করুন
        </button>
      </div>

      {/* Activities Grid */}
      {loading ? (
        <div className="text-center text-gray-500 font-bold animate-pulse mt-20">ডাটা লোড হচ্ছে...</div>
      ) : activities.length === 0 ? (
        <div className="text-center text-gray-500 font-bold bg-white p-10 rounded-2xl border border-gray-100">
          কোনো কার্যক্রম পাওয়া যায়নি। নতুন যোগ করুন।
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {activities.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col">
              <div className="h-36 md:h-48 relative overflow-hidden bg-gray-100">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button 
                  onClick={() => deleteActivity(item.id)}
                  className="absolute top-2 right-2 p-1.5 md:p-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-full shadow-md transition-colors backdrop-blur-sm"
                  title="মুছে ফেলুন"
                >
                  <Trash2 size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
              <div className="p-3 md:p-5 flex-grow flex flex-col">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-[10px] md:text-xs font-semibold text-gray-500 mb-2">
                  <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-1 md:px-2 rounded"><Calendar size={10} className="md:w-3 md:h-3" /> {item.date}</span>
                  <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-1 md:px-2 rounded"><MapPin size={10} className="md:w-3 md:h-3" /> {item.location}</span>
                </div>
                <h3 className="font-serif font-bold text-gray-800 text-sm md:text-lg mb-1.5 md:mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mt-auto">{item.short_desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Add New Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Plus size={20} className="text-brand" /> নতুন কার্যক্রম যোগ করুন
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">শিরোনাম (Title) *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">তারিখ *</label>
                    <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="যেমন: ০৩ সেপ্টে, ২০২৬" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">স্থান (Location) *</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="যেমন: শালধর বাজার" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ (Short Description) *</label>
                  <textarea name="short_desc" value={formData.short_desc} onChange={handleInputChange} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none resize-none" required></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">বিস্তারিত বিবরণ (Full Description) *</label>
                  <textarea name="full_desc" value={formData.full_desc} onChange={handleInputChange} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none resize-none" required></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">ছবি আপলোড করুন *</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                    {file ? (
                      <div className="font-bold text-brand text-sm">✓ {file.name}</div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <Upload size={24} className="mb-2" />
                        <span className="text-sm font-semibold">ক্লিক করে ছবি সিলেক্ট করুন</span>
                      </div>
                    )}
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70">
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                  {isSubmitting ? 'আপলোড হচ্ছে...' : 'সেভ করুন'}
                </button>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}