'use client';

import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "پلیمرها",
    listings: 25,
    image: "https://images.unsplash.com/photo-1613609748419-76e9c0327499?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxwb2x5bWVyJTIwcGxhc3RpYyUyMGluZHVzdHJpYWwlMjBjaGVtaWNhbHxlbnwwfDB8fGJsdWV8MTc1NTkyMjkwN3ww&ixlib=rb-4.1.0&q=85",
    attribution: "Acton Crawford on Unsplash"
  },
  {
    id: 2,
    name: "حلال‌ها",
    listings: 18,
    image: "https://images.unsplash.com/photo-1698768180145-1c9ef11fa938?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxzb2x2ZW50JTIwY2hlbWljYWwlMjBsaXF1aWQlMjBpbmR1c3RyaWFsfGVufDB8MHx8Z3JlZW58MTc1NTkyMjkwN3ww&ixlib=rb-4.1.0&q=85",
    attribution: "Michael Hamments on Unsplash"
  },
  {
    id: 3,
    name: "مواد افزودنی",
    listings: 32,
    image: "https://images.unsplash.com/photo-1608554208766-8198d5536b46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxhZGRpdGl2ZSUyMHBvd2RlciUyMGNoZW1pY2FsJTIwaW5kdXN0cmlhbHxlbnwwfDB8fG9yYW5nZXwxNzU1OTIyOTA3fDA&ixlib=rb-4.1.0&q=85",
    attribution: "OWN FILTERS on Unsplash"
  },
  {
    id: 4,
    name: "رزین‌ها",
    listings: 14,
    image: "https://images.unsplash.com/photo-1606128772038-5ebf23921934?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxyZXNpbiUyMGNoZW1pY2FsJTIwaW5kdXN0cmlhbCUyMG1hdGVyaWFsfGVufDB8MHx8eWVsbG93fDE3NTU5MjI5MDd8MA&ixlib=rb-4.1.0&q=85",
    attribution: "boris misevic on Unsplash"
  },
  {
    id: 5,
    name: "کاتالیست‌ها",
    listings: 9,
    image: "https://images.unsplash.com/photo-1562411053-1d8bdfe771c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxjYXRhbHlzdCUyMGNoZW1pY2FsJTIwbGFib3JhdG9yeSUyMGluZHVzdHJpYWx8ZW58MHwwfHxwdXJwbGV8MTc1NTkyMjkwN3ww&ixlib=rb-4.1.0&q=85",
    attribution: "Chromatograph on Unsplash"
  },
  {
    id: 6,
    name: "الاستومرها",
    listings: 11,
    image: "https://images.unsplash.com/photo-1549277512-89b1c704ffe8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxydWJiZXIlMjBlbGFzdG9tZXIlMjBpbmR1c3RyaWFsJTIwbWF0ZXJpYWx8ZW58MHwwfHxibGFja3wxNzU1OTIyOTA4fDA&ixlib=rb-4.1.0&q=85",
    attribution: "Diogo Nunes on Unsplash"
  },
  {
    id: 7,
    name: "رنگ و پوشش‌ها",
    listings: 27,
    image: "https://images.unsplash.com/photo-1600235210236-b94bbb36ed24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxwYWludCUyMGNvYXRpbmclMjBjb2xvciUyMGluZHVzdHJpYWx8ZW58MHwwfHxyZWR8MTc1NTkyMjkxMXww&ixlib=rb-4.1.0&q=85",
    attribution: "Joshua Hoehne on Unsplash"
  },
  {
    id: 8,
    name: "روغن‌ها و روان‌کننده‌ها",
    listings: 16,
    image: "https://images.unsplash.com/photo-1571456653714-a8db063a3e91?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxvaWwlMjBsdWJyaWNhbnQlMjBpbmR1c3RyaWFsJTIwbWFjaGluZXJ5fGVufDB8MHx8eWVsbG93fDE3NTU5MjI5MTF8MA&ixlib=rb-4.1.0&q=85",
    attribution: "Luis Quintero on Unsplash"
  },
  {
    id: 9,
    name: "مواد اولیه شیمیایی",
    listings: 41,
    image: "https://images.unsplash.com/photo-1562069540-6b8ea3a2def7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjaGVtaWNhbCUyMHJhdyUyMG1hdGVyaWFsJTIwaW5kdXN0cmlhbCUyMHByb2Nlc3Npbmd8ZW58MHwwfHxibHVlfDE3NTU5MjI5MTF8MA&ixlib=rb-4.1.0&q=85",
    attribution: "Muhammed A. Mustapha on Unsplash"
  },
  {
    id: 10,
    name: "مواد شوینده و بهداشتی",
    listings: 22,
    image: "https://images.unsplash.com/photo-1589523321840-7ef183c12511?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxjbGVhbmluZyUyMGh5Z2llbmUlMjBjaGVtaWNhbCUyMGluZHVzdHJpYWx8ZW58MHwwfHx3aGl0ZXwxNzU1OTIyOTExfDA&ixlib=rb-4.1.0&q=85",
    attribution: "Joshua Hoehne on Unsplash"
  },
  {
    id: 11,
    name: "محصولات پتروشیمی پایه",
    listings: 35,
    image: "https://images.unsplash.com/photo-1718528199526-53da3681d455?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxwZXRyb2NoZW1pY2FsJTIwcGxhbnQlMjBpbmR1c3RyaWFsJTIwZmFjaWxpdHl8ZW58MHwwfHxibHVlfDE3NTU5MjI5MTF8MA&ixlib=rb-4.1.0&q=85",
    attribution: "Suraj Tomer on Unsplash"
  },
  {
    id: 12,
    name: "ترکیبات ویژه صنعتی",
    listings: 13,
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxzcGVjaWFsdHklMjBjaGVtaWNhbCUyMGNvbXBvdW5kJTIwaW5kdXN0cmlhbHxlbnwwfDB8fHB1cnBsZXwxNzU1OTIyOTEyfDA&ixlib=rb-4.1.0&q=85",
    attribution: "Patrick Hendry on Unsplash"
  }
];

export default function ProductCategories() {
  return (
    <section className="py-16 bg-gradient-to-br from-petro-light/20 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-petro-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-industrial-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-petro-dark mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-lg text-petro-slate max-w-3xl mx-auto">
            با انتخاب دسته‌بندی موردنظر، سریع‌تر به محصولات دلخواه خود دسترسی پیدا کنید.
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    listings: number;
    image: string;
    attribution: string;
  };
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-petro-light/50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        {/* Category Image */}
        <img
          src={category.image}
          alt={`${category.name} - ${category.attribution}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ width: '100%', height: '192px' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-petro-dark/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1 group-hover:text-industrial-orange transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-white/90">
            {category.listings} محصول
          </p>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-industrial-orange/50 transition-colors duration-300 rounded-lg"></div>
      </div>
    </Card>
  );
}