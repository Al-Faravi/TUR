export default function Statistics() {
  const stats = [
    { id: 1, number: '২৫+', label: 'বছরের রাজনৈতিক অভিজ্ঞতা' },
    { id: 2, number: '১২টি', label: 'জনমুখী অঙ্গীকার' },
    { id: 3, number: '৯টি', label: 'ওয়ার্ডে বিস্তৃত কার্যক্রম' },
    { id: 4, number: '২৪/৭', label: 'জনগণের সেবায় প্রস্তুত' },
  ];

  return (
    <section className="bg-cream pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* grid-cols-4 forces 4 items in a row on all devices */}
        <div className="grid grid-cols-4 gap-2 md:gap-5">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white rounded-xl shadow-sm border border-black/5 p-2 md:p-5 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-[17px] md:text-3xl font-bold text-brand mb-0.5 md:mb-1">
                {stat.number}
              </h3>
              <p className="font-sans text-[9px] md:text-sm font-semibold text-brand-ink/70 leading-[1.2]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}