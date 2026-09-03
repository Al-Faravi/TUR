"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, EyeOff, FileText, Upload, AlertTriangle, Scale, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ComplaintPage() {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ফর্মের স্টেট
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    ward_no: '',
    description: ''
  });
  
  // ফাইল আপলোডের স্টেট
  const [file, setFile] = useState<File | null>(null);

  // ইনপুট হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ফাইল হ্যান্ডলার
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // সর্বোচ্চ 10MB চেক
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("ফাইলের সাইজ ১০ মেগাবাইটের বেশি হতে পারবে না!");
        return;
      }
      setFile(selectedFile);
    }
  };

  // ফর্ম সাবমিট ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let file_url = null;

      // ১. যদি ফাইল থাকে, তবে সেটি Supabase Storage এ আপলোড করা
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `complaints/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media') // নিশ্চিত করুন Supabase এ 'media' নামের একটি বাকেট আছে
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // আপলোড হওয়া ফাইলের পাবলিক লিংক তৈরি করা
        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        file_url = publicUrlData.publicUrl;
      }

      // ২. ডাটাবেসে (complaints টেবিল) ডাটা সেভ করা
      const { error: dbError } = await supabase.from('complaints').insert([
        {
          name: isAnonymous ? 'পরিচয় গোপন' : formData.name,
          phone: isAnonymous ? 'গোপন' : formData.phone,
          category: formData.category,
          ward_no: formData.ward_no,
          description: formData.description,
          file_url: file_url,
          is_anonymous: isAnonymous,
          status: 'pending'
        }
      ]);

      if (dbError) throw dbError;

      // সফল হলে অ্যালার্ট দিয়ে হোমপেজে পাঠিয়ে দেওয়া
      alert("আপনার অভিযোগটি সফলভাবে জমা হয়েছে। ধন্যবাদ!");
      router.push('/');

    } catch (error: any) {
      console.error("Error submitting complaint:", error.message);
      alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      
      {/* 1. Page Header */}
      <section className="bg-brand-deep text-white pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-dark rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            <Lock size={16} className="text-gold" />
            <span className="text-sm font-semibold text-gold-light">১০০% নিরাপদ ও গোপনীয়</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">অভিযোগ ও পরামর্শ বাক্স</h1>
          <p className="font-sans text-cream/80 text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed px-2">
            আপনার পরিচয় সম্পূর্ণ নিরাপদ রাখা হবে। সমাজকে সুন্দর করতে চাঁদাবাজি, দুর্নীতি, ইভটিজিং বা যেকোনো অন্যায়ের তথ্য সরাসরি তাজ উদ্দিন রাসেদকে জানান।
          </p>
        </div>
        
        <svg className="absolute bottom-0 left-0 w-full h-8 md:h-16 text-cream" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,64 L48,69.3 C96,75 192,85 288,80 C384,75 480,53 576,48 C672,43 768,53 864,69.3 C960,85 1056,107 1152,106.7 C1248,107 1344,85 1392,74.7 L1440,64 L1440,120 L0,120 Z"/>
        </svg>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-20">
        
        {/* Smart Back Button */}
        <div className="mb-6 md:mb-8 flex items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-white text-brand-ink hover:text-brand font-bold px-5 py-2 md:px-6 md:py-2.5 rounded-full shadow-sm hover:shadow-md border border-black/5 transition-all group text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            ফিরে যান
          </Link>
        </div>

        {/* 2. Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 md:mb-16">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md border border-black/5 flex items-start gap-4">
            <div className="w-12 h-12 bg-blood/10 rounded-full flex items-center justify-center text-blood shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-brand-ink text-[16px] mb-1">মাদক ও ইভটিজিং</h3>
              <p className="font-sans text-[13px] text-brand-ink/70 leading-snug">মাদক ব্যবসা, কিশোর গ্যাং বা ছাত্রীদের উত্ত্যক্ত করার বিষয়ে তথ্য দিন।</p>
            </div>
          </div>
          
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md border border-black/5 flex items-start gap-4">
            <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
              <Scale size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-brand-ink text-[16px] mb-1">দুর্নীতি ও চাঁদাবাজি</h3>
              <p className="font-sans text-[13px] text-brand-ink/70 leading-snug">বাজার বা মহল্লায় যেকোনো চাঁদাবাজি বা স্বজনপ্রীতির সরাসরি অভিযোগ করুন।</p>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-md border border-black/5 flex items-start gap-4">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-brand shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-brand-ink text-[16px] mb-1">সরাসরি তদারকি</h3>
              <p className="font-sans text-[13px] text-brand-ink/70 leading-snug">সকল অভিযোগের সত্যতা যাচাই করে তাজ উদ্দিন রাসেদ নিজে ব্যবস্থা নেবেন।</p>
            </div>
          </div>
        </div>

        {/* 3. The Main Complaint Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          
          <div className="bg-brand-deep/5 px-6 py-5 md:px-10 md:py-6 border-b border-black/5 flex items-center justify-between">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-brand flex items-center gap-2">
              <FileText size={24} /> অভিযোগ ফর্ম
            </h2>
          </div>

          <div className="p-6 md:p-10">
            
            {/* Anonymous Toggle Switch */}
            <div className="mb-8 p-4 md:p-5 bg-brand-deep/5 border border-brand/20 rounded-xl flex items-center justify-between cursor-pointer hover:bg-brand-deep/10 transition-colors" onClick={() => setIsAnonymous(!isAnonymous)}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${isAnonymous ? 'bg-brand' : 'bg-brand-ink/40'}`}>
                  {isAnonymous ? <EyeOff size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-brand-ink text-[14px] md:text-[16px]">আমার পরিচয় গোপন রাখতে চাই</h4>
                  <p className="text-[11px] md:text-[13px] text-brand-ink/60 mt-0.5">নাম ও মোবাইল নাম্বার কেউ দেখতে পারবে না।</p>
                </div>
              </div>
              
              <div className={`w-12 h-6 md:w-14 md:h-7 rounded-full relative transition-colors duration-300 ${isAnonymous ? 'bg-brand' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white transition-transform duration-300 ${isAnonymous ? 'translate-x-6 md:translate-x-7' : 'translate-x-0'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-500 overflow-hidden ${isAnonymous ? 'opacity-0 h-0 m-0' : 'opacity-100 h-auto'}`}>
                <div>
                  <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">আপনার নাম {isAnonymous ? '' : <span className="text-blood">*</span>}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="সম্পূর্ণ নাম" className="w-full px-4 py-3 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-sm" required={!isAnonymous} />
                </div>
                <div>
                  <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">মোবাইল নাম্বার {isAnonymous ? '' : <span className="text-blood">*</span>}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-sm" required={!isAnonymous} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">অভিযোগের ধরন <span className="text-blood">*</span></label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-sm cursor-pointer" required>
                    <option value="">নির্বাচন করুন</option>
                    <option value="ইভটিজিং ও নারী হয়রানি">ইভটিজিং ও নারী হয়রানি</option>
                    <option value="চাঁদাবাজি ও দখলদারিত্ব">চাঁদাবাজি ও দখলদারিত্ব</option>
                    <option value="মাদক, কিশোর গ্যাং ও সন্ত্রাস">মাদক, কিশোর গ্যাং ও সন্ত্রাস</option>
                    <option value="রাস্তাঘাট ও অবকাঠামো">রাস্তাঘাট ও অবকাঠামো</option>
                    <option value="স্বাস্থ্যসেবা ও হাসপাতাল">স্বাস্থ্যসেবা ও হাসপাতাল</option>
                    <option value="অন্যান্য সমস্যা">অন্যান্য সমস্যা</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">ওয়ার্ড নম্বর <span className="text-blood">*</span></label>
                  <select name="ward_no" value={formData.ward_no} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-sm cursor-pointer" required>
                    <option value="">নির্বাচন করুন</option>
                    {[1,2,3,4,5,6,7,8,9].map(num => (
                      <option key={num} value={num}>{num} নং ওয়ার্ড</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">বিস্তারিত বিবরণ <span className="text-blood">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={5} placeholder="ঘটনার স্থান, সময় এবং বিস্তারিত বিবরণ নির্ভয়ে লিখুন..." className="w-full px-4 py-3 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-sm resize-none" required></textarea>
              </div>

              {/* File Upload UI */}
              <div>
                <label className="block text-[13px] md:text-sm font-bold text-brand-ink mb-1.5">প্রমাণ আপলোড করুন (ছবি/ভিডিও)</label>
                <div className="relative w-full border-2 border-dashed border-black/15 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors py-8 flex flex-col items-center justify-center cursor-pointer group">
                  <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  
                  {file ? (
                    <div className="text-center text-brand font-bold text-sm">
                      <p>✓ {file.name}</p>
                      <p className="text-xs text-brand/60 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={20} />
                      </div>
                      <span className="text-sm font-bold text-brand-ink">ক্লিক করে ফাইল সিলেক্ট করুন</span>
                      <span className="text-xs text-brand-ink/50 mt-1">সর্বোচ্চ ১০ মেগাবাইট (JPG, PNG, MP4)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button disabled={loading} type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-[15px] md:text-[16px] mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
                {loading ? 'জমা দেওয়া হচ্ছে...' : 'নিরাপদে অভিযোগ জমা দিন'}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}