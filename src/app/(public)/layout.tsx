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

export const metadata = {
  title: 'তাজ উদ্দিন রাসেদ | জননেতা, ৩নং চিথলিয়া ইউনিয়ন',
  description: 'চিথলিয়া ইউনিয়নের উন্নয়নে তাজ উদ্দিন রাসেদের অঙ্গীকার ও কার্যক্রম।',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`scroll-smooth ${tiroBangla.variable} ${hindSiliguri.variable}`}>
      <body className="bg-cream text-brand-ink font-sans flex flex-col min-h-screen">
        <Navbar />
        
        {/* flex-grow দেওয়ার কারণে কন্টেন্ট ছোট হলেও ফুটার সবসময় নিচে থাকবে */}
        <main className="flex-grow pt-20"> 
          {children}
        </main>
        
        <Footer /> {/* Footer যুক্ত করা হলো */}
      </body>
    </html>
  );
}