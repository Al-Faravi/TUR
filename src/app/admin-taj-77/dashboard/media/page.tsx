"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Image as ImageIcon, Video, Plus, Trash2, Calendar, Loader2, X, Upload, LayoutGrid } from 'lucide-react';
import imageCompression from 'browser-image-compression'; 

export default function MediaAdminPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ফিল্টার করার জন্য স্টেট (all, image, video)
  const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video'>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false); 
  const [uploadType, setUploadType] = useState<'image' | 'video_direct' | 'youtube'>('image');
  
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    youtubeUrl: ''
  });

  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setMediaList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      setIsCompressing(true); 
      const processedFiles = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        if (file.type.startsWith('video/')) {
          if (file.size > 50 * 1024 * 1024) {
            alert(`"${file.name}" ভিডিওটির সাইজ ৫০ মেগাবাইটের বেশি!`);
            continue;
          }
          processedFiles.push(file);
        } 
        else if (file.type.startsWith('image/')) {
          const options = {
            maxSizeMB: 1, 
            maxWidthOrHeight: 1920, 
            useWebWorker: true, 
          };
          
          try {
            const compressedFile = await imageCompression(file, options);
            processedFiles.push(compressedFile);
          } catch (error) {
            console.error("Image compression error:", error);
            alert(`"${file.name}" ছবিটি প্রসেস করতে সমস্যা হয়েছে।`);
          }
        }
      }

      setFiles((prev) => [...prev, ...processedFiles]);
      setIsCompressing(false); 
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const finalType = uploadType === 'image' ? 'image' : 'video';

      if (uploadType === 'youtube') {
        const ytId = extractYoutubeId(formData.youtubeUrl);
        if (!ytId) {
          alert("সঠিক ইউটিউব লিংক দিন!");
          setIsSubmitting(false);
          return;
        }
        
        const finalUrl = `https://www.youtube.com/embed/${ytId}`;
        const { error: dbError } = await supabase.from('media').insert([
          {
            title: formData.title || '',
            date: formData.date || '',
            type: finalType,
            url: finalUrl
          }
        ]);
        if (dbError) throw dbError;

      } else {
        if (files.length === 0) {
          alert("অনুগ্রহ করে অন্তত একটি ফাইল সিলেক্ট করুন!");
          setIsSubmitting(false);
          return;
        }
        
        const uploadPromises = files.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery/${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(fileName);
            
          return {
            title: formData.title || '',
            date: formData.date || '',
            type: finalType,
            url: urlData.publicUrl
          };
        });

        const records = await Promise.all(uploadPromises);
        const { error: dbError } = await supabase.from('media').insert(records);
        if (dbError) throw dbError;
      }

      alert("সফলভাবে যুক্ত হয়েছে!");
      setIsModalOpen(false);
      setFormData({ title: '', date: '', youtubeUrl: '' });
      setFiles([]);
      fetchMedia();
      
      // আপলোড শেষে অটোমেটিক সেই ট্যাবে চলে যাবে
      setActiveTab(finalType);

    } catch (error: any) {
      console.error("Error adding media:", error.message);
      alert("আপলোড করতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMedia = async (id: string) => {
    if (!window.confirm("আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?")) return;
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (!error) fetchMedia();
  };

  // ফিল্টার করা লিস্ট তৈরি
  const filteredMedia = mediaList.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div>
      {/* Header and Add Button */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ImageIcon className="text-brand w-6 h-6 md:w-8 md:h-8" /> মিডিয়া ও গ্যালারি
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">ওয়েবসাইটের গ্যালারি সেকশনের ছবি ও ভিডিও পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
        >
          <Plus size={20} /> নতুন মিডিয়া
        </button>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex mb-6 w-full sm:w-auto">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'all' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
        >
          <LayoutGrid size={16} /> সবগুলো
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'image' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
        >
          <ImageIcon size={16} /> স্থিরচিত্র
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'video' ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
        >
          <Video size={16} /> ভিডিও
        </button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center text-gray-500 font-bold animate-pulse mt-20">ডাটা লোড হচ্ছে...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center text-gray-500 font-bold bg-white p-10 rounded-2xl border border-gray-100">
          {activeTab === 'all' ? 'গ্যালারিতে কোনো মিডিয়া নেই।' : `কোনো ${activeTab === 'image' ? 'ছবি' : 'ভিডিও'} পাওয়া যায়নি।`}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col">
              
              <div className="h-32 sm:h-36 md:h-48 relative bg-black flex items-center justify-center overflow-hidden">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                ) : item.url.includes('youtube.com') ? (
                  <img src={`https://img.youtube.com/vi/${extractYoutubeId(item.url)}/hqdefault.jpg`} className="w-full h-full object-cover opacity-80" alt="Thumbnail" />
                ) : (
                  <video src={`${item.url}#t=0.1`} preload="metadata" className="w-full h-full object-cover opacity-80"></video>
                )}
                
                <button 
                  onClick={() => deleteMedia(item.id)}
                  className="absolute top-2 right-2 p-1.5 md:p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="মুছে ফেলুন"
                >
                  <Trash2 size={14} className="md:w-4 md:h-4" />
                </button>
                
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 md:py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase flex items-center gap-1 z-10">
                  {item.type === 'image' ? <ImageIcon size={10} /> : <Video size={10} />}
                  {item.type}
                </div>
              </div>

              <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
                <h3 className="font-bold text-gray-800 text-xs md:text-sm mb-2 line-clamp-2 leading-snug" title={item.title}>
                  {item.title || "শিরোনামহীন"}
                </h3>
                <div className="flex items-center gap-1.5 text-[9px] md:text-[11px] text-gray-500 font-semibold mt-auto">
                  <Calendar size={12} className="shrink-0" /> <span className="truncate">{item.date || "তারিখ দেওয়া নেই"}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* --- Add New Media Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Plus size={20} className="text-brand" /> গ্যালারিতে যোগ করুন
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto">
              
              <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                <button 
                  onClick={() => {setUploadType('image'); setFiles([]);}}
                  className={`flex-1 py-2 text-sm font-bold flex items-center justify-center gap-2 rounded-md transition-colors ${uploadType === 'image' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <ImageIcon size={16} /> ছবি
                </button>
                <button 
                  onClick={() => {setUploadType('video_direct'); setFiles([]);}}
                  className={`flex-1 py-2 text-sm font-bold flex items-center justify-center gap-2 rounded-md transition-colors ${uploadType === 'video_direct' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Video size={16} /> ভিডিও (সরাসরি)
                </button>
                <button 
                  onClick={() => setUploadType('youtube')}
                  className={`flex-1 py-2 text-sm font-bold flex items-center justify-center gap-2 rounded-md transition-colors ${uploadType === 'youtube' ? 'bg-white shadow-sm text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Video size={16} /> ইউটিউব
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">শিরোনাম (Title)</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="শিরোনাম (ঐচ্ছিক)" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">তারিখ</label>
                  <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="তারিখ (ঐচ্ছিক)" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand outline-none" />
                </div>

                {uploadType === 'youtube' ? (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">ইউটিউব লিংক <span className="text-red-500">*</span></label>
                    <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleInputChange} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-2.5 rounded-lg border border-red-200 focus:border-red-500 outline-none bg-red-50/50" required />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      {uploadType === 'image' ? 'ছবি আপলোড করুন (একসাথে একাধিক ছবি সিলেক্ট করতে পারেন)' : 'ভিডিও আপলোড করুন (Max: 50MB)'} <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed ${isCompressing ? 'border-brand bg-brand/5' : 'border-gray-300'} rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative cursor-pointer`}>
                      <input 
                        type="file" 
                        multiple={uploadType === 'image'} 
                        accept={uploadType === 'image' ? "image/*" : "video/mp4,video/webm"} 
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        disabled={isCompressing}
                      />
                      <div className="flex flex-col items-center text-gray-500 pointer-events-none">
                        {isCompressing ? (
                          <>
                            <Loader2 size={24} className="mb-2 text-brand animate-spin" />
                            <span className="text-sm font-semibold text-brand">ছবি প্রসেস হচ্ছে, দয়া করে অপেক্ষা করুন...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={24} className="mb-2 text-brand" />
                            <span className="text-sm font-semibold">ক্লিক করে ফাইল সিলেক্ট করুন</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                        <p className="text-xs font-bold text-gray-500 mb-2">সিলেক্টেড ফাইল ({files.length}টি):</p>
                        <div className="space-y-2">
                          {files.map((f, i) => (
                            <div key={i} className="flex items-center justify-between bg-white px-3 py-1.5 rounded border border-gray-100">
                              <span className="text-xs font-medium text-gray-700 truncate mr-2">{f.name}</span>
                              <button type="button" onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button disabled={isSubmitting || isCompressing} type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 mt-4">
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                  {isSubmitting ? 'আপলোড হচ্ছে...' : 'মিডিয়া সেভ করুন'}
                </button>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}