"use client";

import { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // বাংলাদেশি ফোন নাম্বার ভ্যালিডেশন (১১ ডিজিট এবং 01 দিয়ে শুরু)
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg('অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন।');
      return;
    }

    setLoading(true);

    // Supabase-এ ডাটা পাঠানো
    const { error } = await supabase
      .from('contacts')
      .insert([
        { 
          name: formData.name, 
          phone: formData.phone, 
          message: formData.message 
        }
      ]);

    setLoading(false);

    if (!error) {
      setShowSuccess(true);
      setFormData({ name: '', phone: '', message: '' }); // ফর্ম ক্লিয়ার করা
      // ৫ সেকেন্ড পর পপআপ অটো বন্ধ হয়ে যাবে
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setErrorMsg('দুঃখিত, বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  return (
    <section id="contact" className="bg-cream py-10 md:py-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">
              যোগাযোগ
            </span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand mb-2 md:mb-3">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="font-sans text-brand-ink/70 leading-6 text-[13px] md:text-[15px] px-2">
            যেকোনো তথ্য, পরামর্শ বা প্রয়োজনে সরাসরি কল করুন অথবা মেসেজ দিন।
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 relative">
          
          {/* Column 1: Contact Information */}
          <div className="bg-white p-5 md:p-7 rounded-xl md:rounded-2xl shadow-sm border border-black/5 flex flex-col justify-center h-full">
            <h3 className="font-serif text-lg font-bold text-brand-ink mb-5 border-b border-black/5 pb-3">
              তাজ উদ্দিন রাশেদ
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">মোবাইল</p>
                  <a href="tel:01862674369" className="font-sans text-brand-ink font-bold hover:text-brand transition-colors text-[13px] md:text-[15px]">
                    ০১৮৬২৬৭৪৩৬৯
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">ইমেইল</p>
                  <a href="mailto:info@tajuddinrashed.com" className="font-sans text-brand-ink font-bold hover:text-brand transition-colors text-[13px] md:text-[15px]">
                    info@tajuddinrashed.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-sans text-brand-ink/60 text-[11px] font-semibold mb-0.5">ঠিকানা</p>
                  <p className="font-sans text-brand-ink font-bold text-[13px] md:text-[15px] leading-snug">
                    শালধর বাজার, ৩ নং চিথলিয়া<br />ইউনিয়ন, পরশুরাম, ফেনী।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="bg-white p-5 md:p-7 rounded-xl md:rounded-2xl shadow-sm border border-black/5 h-full relative overflow-hidden">
            
            {/* Success Overlay Modal */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">ধন্যবাদ!</h4>
                <p className="text-gray-600 text-sm mb-4">আপনার বার্তা সফলভাবে প্রেরণ করা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।</p>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg text-sm transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            )}

            <h3 className="font-serif text-lg font-bold text-brand-ink mb-4">সংক্ষিপ্ত বার্তা</h3>
            
            {errorMsg && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-lg flex items-start gap-2">
                <X size={14} className="mt-0.5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input 
                type="text" 
                placeholder="আপনার নাম"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm"
                required
              />
              <input 
                type="tel" 
                placeholder="মোবাইল নাম্বার (যেমন: 018...)"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9+]/g, '')})}
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm"
                required
              />
              <textarea 
                rows={2}
                placeholder="মতামত বা মেসেজ..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-cream/30 focus:bg-white focus:border-brand outline-none transition-all text-[13px] md:text-sm resize-none"
                required
              ></textarea>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand hover:bg-brand-dark disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-[13px] md:text-sm"
              >
                {loading ? 'পাঠানো হচ্ছে...' : 'পাঠিয়ে দিন'} {!loading && <Send size={14} />}
              </button>
            </form>
          </div>

          {/* Column 3: Google Maps */}
          <div className="h-[250px] lg:h-full min-h-[250px] rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-black/5 relative group">
            <iframe 
              src="https://maps.google.com/maps?q=Shaldhar+Bazar,+Parshuram,+Feni&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}