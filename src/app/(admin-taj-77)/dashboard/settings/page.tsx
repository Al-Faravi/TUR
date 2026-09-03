"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, Save, Loader2, Megaphone } from 'lucide-react';

export default function SettingsAdminPage() {
  const [tickerText, setTickerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Supabase থেকে বর্তমান শিরোনাম ফেচ করা
  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'ticker')
      .single();

    if (!error && data) {
      setTickerText(data.value);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // শিরোনাম আপডেট করা
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('settings')
        .update({ value: tickerText })
        .eq('key', 'ticker');

      if (error) throw error;
      alert("শিরোনাম সফলভাবে আপডেট হয়েছে!");
    } catch (error: any) {
      console.error("Error updating settings:", error.message);
      alert("আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Settings className="text-brand" /> সেটিংস
        </h1>
        <p className="text-gray-500 mt-1">ওয়েবসাইটের গ্লোবাল সেটিংস এবং শিরোনাম পরিবর্তন করুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ticker Settings Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Megaphone size={18} className="text-gold" />
            <h2 className="font-bold text-gray-800">সাম্প্রতিক আপডেট (শিরোনাম)</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-500 animate-pulse py-4">লোড হচ্ছে...</div>
            ) : (
              <form onSubmit={handleSave}>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  ওয়েবসাইটের একদম উপরের স্ক্রলিং টেক্সটটি লিখুন:
                </label>
                <textarea 
                  value={tickerText}
                  onChange={(e) => setTickerText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand outline-none resize-none mb-4 bg-gray-50/50"
                  required
                ></textarea>
                
                <button 
                  disabled={isSaving} 
                  type="submit" 
                  className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? 'সেভ হচ্ছে...' : 'আপডেট করুন'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Future Settings can go here */}
        
      </div>
    </div>
  );
}