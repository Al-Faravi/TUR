"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, UserCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-brand-deep flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform transition-all">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-4">
            <UserCircle size={40} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-ink text-center">নিরাপদ লগইন</h1>
          <p className="text-gray-500 text-sm mt-1 text-center">সুপার অ্যাডমিন প্যানেলে প্রবেশ করুন</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-bold text-center mb-4 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">ইমেইল অ্যাড্রেস</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" 
              placeholder="admin@example.com"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">গোপন পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-sm bg-gray-50 focus:bg-white" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            {loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
        
      </div>
    </div>
  );
}