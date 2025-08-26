'use client';

export default function WhyIranPetro() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-petro-light/10 relative overflow-hidden">
      {/* Molecule Background Pattern */}
      <MoleculeBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-petro-dark mb-8 leading-tight">
          چرا ایران‌پترو؟
        </h2>
        
        <p className="text-lg md:text-xl text-petro-slate leading-relaxed max-w-3xl mx-auto">
          ایران‌پترو به‌عنوان اولین پلتفرم تخصصی B2B در صنعت پتروشیمی ایران، با هدف ایجاد شفافیت، سرعت و اعتماد در فرآیند تأمین و فروش محصولات شیمیایی راه‌اندازی شده است. ما تولیدکنندگان، تأمین‌کنندگان و خریداران را در یک بستر امن و کارآمد به هم متصل می‌کنیم تا علاوه بر صرفه‌جویی در زمان و هزینه، دسترسی آسان‌تری به اطلاعات دقیق بازار و محصولات داشته باشند.
        </p>
      </div>
    </section>
  );
}

function MoleculeBackground() {
  return (
    <div className="absolute inset-0 opacity-5">
      {/* Large Molecule - Top Right */}
      <div className="absolute top-10 right-10 w-64 h-64">
        <svg viewBox="0 0 200 200" className="w-full h-full text-industrial-blue">
          <g fill="currentColor">
            {/* Benzene Ring */}
            <circle cx="100" cy="60" r="4" />
            <circle cx="130" cy="75" r="4" />
            <circle cx="130" cy="105" r="4" />
            <circle cx="100" cy="120" r="4" />
            <circle cx="70" cy="105" r="4" />
            <circle cx="70" cy="75" r="4" />
            
            {/* Bonds */}
            <line x1="100" y1="60" x2="130" y2="75" stroke="currentColor" strokeWidth="2" />
            <line x1="130" y1="75" x2="130" y2="105" stroke="currentColor" strokeWidth="2" />
            <line x1="130" y1="105" x2="100" y2="120" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="120" x2="70" y2="105" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="105" x2="70" y2="75" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="75" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
            
            {/* Side chains */}
            <circle cx="100" cy="30" r="3" />
            <circle cx="160" cy="90" r="3" />
            <circle cx="100" cy="150" r="3" />
            <circle cx="40" cy="90" r="3" />
            
            <line x1="100" y1="60" x2="100" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <line x1="130" y1="90" x2="160" y2="90" stroke="currentColor" strokeWidth="1.5" />
            <line x1="100" y1="120" x2="100" y2="150" stroke="currentColor" strokeWidth="1.5" />
            <line x1="70" y1="90" x2="40" y2="90" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      
      {/* Medium Molecule - Bottom Left */}
      <div className="absolute bottom-20 left-16 w-48 h-48">
        <svg viewBox="0 0 150 150" className="w-full h-full text-petro-cyan">
          <g fill="currentColor">
            {/* Chain structure */}
            <circle cx="30" cy="75" r="3" />
            <circle cx="60" cy="60" r="3" />
            <circle cx="90" cy="75" r="3" />
            <circle cx="120" cy="60" r="3" />
            
            <circle cx="60" cy="90" r="3" />
            <circle cx="90" cy="105" r="3" />
            
            {/* Bonds */}
            <line x1="30" y1="75" x2="60" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="60" y1="60" x2="90" y2="75" stroke="currentColor" strokeWidth="2" />
            <line x1="90" y1="75" x2="120" y2="60" stroke="currentColor" strokeWidth="2" />
            
            <line x1="60" y1="60" x2="60" y2="90" stroke="currentColor" strokeWidth="1.5" />
            <line x1="90" y1="75" x2="90" y2="105" stroke="currentColor" strokeWidth="1.5" />
            <line x1="60" y1="90" x2="90" y2="105" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      </div>
      
      {/* Small Molecule - Top Left */}
      <div className="absolute top-32 left-20 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full text-industrial-orange">
          <g fill="currentColor">
            <circle cx="30" cy="50" r="3" />
            <circle cx="50" cy="30" r="3" />
            <circle cx="70" cy="50" r="3" />
            <circle cx="50" cy="70" r="3" />
            
            <line x1="30" y1="50" x2="50" y2="30" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="70" x2="30" y2="50" stroke="currentColor" strokeWidth="2" />
          </g>
        </svg>
      </div>
      
      {/* Small Molecule - Bottom Right */}
      <div className="absolute bottom-32 right-24 w-28 h-28">
        <svg viewBox="0 0 80 80" className="w-full h-full text-petro-slate">
          <g fill="currentColor">
            <circle cx="20" cy="40" r="2.5" />
            <circle cx="40" cy="20" r="2.5" />
            <circle cx="60" cy="40" r="2.5" />
            <circle cx="40" cy="60" r="2.5" />
            <circle cx="40" cy="40" r="2.5" />
            
            <line x1="20" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="60" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="60" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-industrial-blue rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-petro-cyan rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-industrial-orange rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 right-2/3 w-1 h-1 bg-petro-slate rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}