'use client';

const companiesData = [
  {
    id: 1,
    productCount: '05',
    label: 'محصول از',
    companyName: 'شرکت شیمیایی کیمیاگران شرق'
  },
  {
    id: 2,
    productCount: '240',
    label: 'محصول از',
    companyName: 'شرکت نفت پارس'
  },
  {
    id: 3,
    productCount: '89',
    label: 'محصول از',
    companyName: 'گروه صنعتی بهین پلیمر'
  },
  {
    id: 4,
    productCount: '156',
    label: 'محصول از',
    companyName: 'شرکت فولاد آریا'
  },
  {
    id: 5,
    productCount: '97%',
    label: 'محصول از',
    companyName: 'شرکت پتروشیمی خلیج فارس'
  }
];

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-petro-light/10 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-16 left-16 w-72 h-72 bg-industrial-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-96 h-96 bg-petro-cyan rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {companiesData.map((company) => (
            <CompanyStatCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CompanyStatCardProps {
  company: {
    id: number;
    productCount: string;
    label: string;
    companyName: string;
  };
}

function CompanyStatCard({ company }: CompanyStatCardProps) {
  return (
    <div className="group text-center relative">
      {/* Large Transparent Number */}
      <div className="relative mb-4">
        <div 
          className="text-8xl md:text-9xl font-black text-petro-slate/10 leading-none select-none"
          style={{ 
            fontSize: 'clamp(5rem, 8vw, 8rem)',
            fontWeight: '900',
            lineHeight: '0.8'
          }}
        >
          {company.productCount}
        </div>
        
        {/* Small Label */}
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2">
          <p className="text-xs md:text-sm text-petro-slate/70 font-medium tracking-wide uppercase">
            {company.label}
          </p>
        </div>
      </div>
      
      {/* Company Name */}
      <div className="mt-8">
        <h3 className="text-lg md:text-xl font-bold text-petro-dark leading-tight group-hover:text-industrial-blue transition-colors duration-300">
          {company.companyName}
        </h3>
      </div>
      
      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-industrial-orange group-hover:w-16 transition-all duration-500"></div>
    </div>
  );
}