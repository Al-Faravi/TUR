import { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer'; // Footer ইম্পোর্ট করা হলো
import { Tiro_Bangla, Hind_Siliguri } from 'next/font/google';

// ফন্ট কনফিগারেশন
const tiroBangla = Tiro_Bangla({ 
  weight: '400',
  subsets: ['bengali'],
  variable: '--font-tiro',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind',
});

// সম্পূর্ণ SEO এবং Open Graph মেটাডেটা
export const metadata: Metadata = {
  title: 'তাজ উদ্দিন রাশেদ | জননেতা, ৩নং চিথলিয়া ইউনিয়ন',
  description: 'চিথলিয়া ইউনিয়নের উন্নয়নে তাজ উদ্দিন রাশেদের অঙ্গীকার ও কার্যক্রম।',
  keywords: ['Taj Uddin Rashed', 'Chitholia Union', 'Feni', 'Politics', 'Social Worker', 'তাজ উদ্দিন রাশেদ'],
  openGraph: {
    title: 'তাজ উদ্দিন রাশেদ | অফিসিয়াল ওয়েবসাইট',
    description: 'চিথলিয়া ইউনিয়নের উন্নয়ন ও মানুষের কল্যাণে নিবেদিত।',
    url: 'https://taj-uddin-rashed.vercel.app',
    siteName: 'Taj Uddin Rashed Portfolio',
    images: [
      {
        url: 'https://taj-uddin-rashed.vercel.app/images/banner-1.png',
        width: 1200,
        height: 630,
        alt: 'তাজ উদ্দিন রাশেদ - অফিসিয়াল ব্যানার',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // html এবং body ট্যাগের বদলে আমরা একটি div ব্যবহার করছি এবং ফন্টগুলো এর ভেতরে দিয়ে দিচ্ছি
    <div className={`bg-cream text-brand-ink font-sans flex flex-col min-h-screen ${tiroBangla.variable} ${hindSiliguri.variable}`}>
      <Navbar />
      
      {/* flex-grow দেওয়ার কারণে কন্টেন্ট ছোট হলেও ফুটার সবসময় নিচে থাকবে */}
      <main className="flex-grow pt-20"> 
        {children}
      </main>
      
      <Footer /> {/* Footer যুক্ত করা হলো */}
    </div>
  );
}