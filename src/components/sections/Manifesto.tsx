import { 
  Globe2, Scale, ShieldCheck, GraduationCap, 
  Stethoscope, MonitorSmartphone, Trophy, Tractor, 
  HeartHandshake, Users, Cone, Store 
} from 'lucide-react';

export default function Manifesto() {
  const promises = [
    { id: '০১', title: 'প্রবাসী কল্যাণ ও সুরক্ষা', desc: 'প্রবাসীদের জন্য বিশেষ ২৪/৭ প্রবাস বন্ধু হটলাইন ও ইউপি থেকে সরাসরি আইনি সহযোগিতা।', icon: Globe2 },
    { id: '০২', title: 'বিচার ব্যবস্থা ও সামাজিক মর্যাদা', desc: 'স্বজনপ্রীতি বন্ধে ওয়ার্ডে ওয়ার্ডে নিরপেক্ষ গণ্যমান্যদের সমন্বয়ে একটি ন্যায্য বিচার কমিটি গঠন।', icon: Scale },
    { id: '০৩', title: 'নিরাপত্তা ও আইনশৃঙ্খলা', desc: 'চোরাচালান, ইভটিজিং, কিশোর গ্যাং এবং মাদকের সামাজিক ব্যাধি পুরোপুরি নির্মূল করা হবে।', icon: ShieldCheck },
    { id: '০৪', title: 'শিক্ষা ও মেধা বিকাশ', desc: 'ইউনিয়নব্যাপী মেধা বৃত্তি। অভাবের কারণে ঝরে পড়া রোধে শিক্ষার্থীদের শতভাগ দায়িত্ব নেবে পরিষদ।', icon: GraduationCap },
    { id: '০৫', title: 'স্বাস্থ্যসেবা ও দুর্যোগ ব্যবস্থাপনা', desc: 'প্রতি বছর বিনামূল্যে মেডিকেল ক্যাম্প। সংগঠনগুলোকে প্রাথমিক উদ্ধার ও ফার্স্ট-এইড সরঞ্জাম প্রদান।', icon: Stethoscope },
    { id: '০৬', title: 'সুশাসন ও সহজ সেবা', desc: 'জন্ম নিবন্ধন বা সনদের জন্য ঘুরতে হবে না। সকল সেবা দ্রুত দিতে ডিজিটাল সেবা ডেক্স চালু।', icon: MonitorSmartphone },
    { id: '০৭', title: 'যুব সমাজ ও ক্রীড়া উন্নয়ন', desc: 'যুবসমাজকে সুস্থ রাখতে প্রতি বছর ইউনিয়ন ভিত্তিক জমকালো ফুটবল ও ক্রিকেট টুর্নামেন্ট আয়োজন।', icon: Trophy },
    { id: '০৮', title: 'কৃষি ও খামারি সহায়তা', desc: 'প্রান্তিক কৃষকের কাছে সরাসরি সরকারি সার, বীজ ও ভতুর্কি পৌঁছে দিতে বিশেষ কৃষি উন্নয়ন সেল।', icon: Tractor },
    { id: '০৯', title: 'সামাজিক নিরাপত্তা ও ভাতা', desc: 'বয়স্ক, বিধবা ও প্রতিবন্ধী ভাতা বণ্টনে শতভাগ স্বচ্ছতা। প্রকৃত দুস্থরা যেন ভাতা পান তা নিশ্চিত করা।', icon: HeartHandshake },
    { id: '১০', title: 'নারী উন্নয়ন ও কর্মসংস্থান', desc: 'পিছিয়ে পড়া নারীদের সেলাই ও কুটির শিল্পের প্রশিক্ষণের মাধ্যমে ঘরে ঘরে আয়ের ব্যবস্থা করা।', icon: Users },
    { id: '১১', title: 'অবকাঠামো ও পরিবেশ', desc: 'প্রতিটি কাঁচা রাস্তা দ্রুত পাকা করা, ড্রেনেজ ব্যবস্থার উন্নয়ন এবং গ্রামীণ সড়কে স্ট্রিট লাইট।', icon: Cone },
    { id: '১২', title: 'ব্যবসায়ী ও বাজার উন্নয়ন', desc: 'বাজারের নিরাপত্তা নিশ্চিত করা, নাইট গাইড, আলাদা বাজার ফান্ড ও ওয়াচ-টাওয়ার নিশ্চিত করা।', icon: Store }
  ];

  return (
    <section id="manifesto" className="bg-brand-deep py-16 md:py-28 scroll-mt-16 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-dark/50 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
            <span className="font-sans font-semibold text-gold text-xs md:text-sm tracking-widest uppercase">
              উন্নয়ন রূপরেখা
            </span>
            <span className="h-[2px] w-6 md:w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            চিথলিয়া ইউনিয়নের জন্য ১২ অঙ্গীকার
          </h2>
          <p className="font-sans text-cream/70 leading-6 md:leading-7 text-[13px] md:text-base px-4">
            জনগণের অধিকার প্রতিষ্ঠা ও একটি আধুনিক, দুর্নীতিমুক্ত মডেল ইউনিয়ন গড়ার লক্ষ্যে আমার মূল ইশতেহারসমূহ।
          </p>
        </div>

        {/* 12 Promises Grid (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {promises.map((promise) => {
            const Icon = promise.icon;
            return (
              <div 
                key={promise.id} 
                className="relative group bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl md:rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 transition-all duration-500 shadow-lg flex flex-col h-full"
              >
                {/* Background Watermark Number (Only one ID per card) */}
                <div className="absolute -bottom-2 -right-1 font-serif text-[60px] lg:text-[80px] font-bold text-white/5 group-hover:text-gold/5 transition-colors duration-500 pointer-events-none select-none">
                  {promise.id}
                </div>

                {/* Top Row: Icon */}
                <div className="mb-3 md:mb-4 relative z-10">
                  <div className="relative inline-block">
                    {/* Glowing effect behind icon */}
                    <div className="absolute inset-0 bg-gold/20 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative w-9 h-9 lg:w-12 lg:h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-brand-ink text-gold transition-colors duration-300">
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="font-serif text-[13px] md:text-base lg:text-[17px] font-bold text-gold-light mb-1.5 md:mb-2 leading-snug">
                    {promise.title}
                  </h3>
                  <p className="font-sans text-[11px] md:text-[13px] lg:text-[14px] text-cream/75 leading-relaxed md:leading-6">
                    {promise.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}