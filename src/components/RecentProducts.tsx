'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pb from '@/lib/clientPocketbase';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

// Mock products for fallback when API fails or no products exist
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'پلیمر پلی‌اتیلن',
    category: 'پلیمرها',
    price: '125,000',
    image: 'https://images.unsplash.com/photo-1560427450-4aa993c4c6ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxjaGVtaWNhbCUyMHBvbHltZXIlMjBpbmR1c3RyaWFsJTIwcHJvZHVjdHxlbnwwfDB8fGJsdWV8MTc1NTkyNDE2MXww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '2',
    name: 'حلال صنعتی اتانول',
    category: 'حلال‌ها',
    price: '89,500',
    image: 'https://images.unsplash.com/photo-1698768180145-1c9ef11fa938?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjaGVtaWNhbCUyMHNvbHZlbnQlMjBjb250YWluZXIlMjBpbmR1c3RyaWFsfGVufDB8MHx8Z3JlZW58MTc1NTkyNDE2MXww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '3',
    name: 'رزین اپوکسی',
    category: 'رزین‌ها',
    price: '156,000',
    image: 'https://images.unsplash.com/photo-1606128772038-5ebf23921934?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxyZXNpbiUyMGNoZW1pY2FsJTIwaW5kdXN0cmlhbCUyMG1hdGVyaWFsfGVufDB8MHx8eWVsbG93fDE3NTU5MjI5MDd8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '4',
    name: 'کاتالیست پلاتینیوم',
    category: 'کاتالیست‌ها',
    price: '2,450,000',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjYXRhbHlzdCUyMGNoZW1pY2FsJTIwaW5kdXN0cmlhbCUyMHByb2Nlc3Npbmd8ZW58MHwwfHxwdXJwbGV8MTc1NTkyNDE2MXww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '5',
    name: 'ماده افزودنی آنتی‌اکسیدان',
    category: 'مواد افزودنی',
    price: '67,800',
    image: 'https://images.unsplash.com/photo-1608554208766-8198d5536b46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxhZGRpdGl2ZSUyMGNoZW1pY2FsJTIwcG93ZGVyJTIwaW5kdXN0cmlhbHxlbnwwfDB8fG9yYW5nZXwxNzU1OTI0MTYxfDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: '6',
    name: 'روغن صنعتی هیدرولیک',
    category: 'روغن‌ها و روان‌کننده‌ها',
    price: '95,200',
    image: 'https://images.unsplash.com/photo-1565071783280-719b01b29912?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxvaWwlMjBwZXRyb2NoZW1pY2FsJTIwaW5kdXN0cmlhbCUyMGx1YnJpY2FudHxlbnwwfDB8fHllbGxvd3wxNzU1OTI0MTYxfDA&ixlib=rb-4.1.0&q=85'
  }
];

export default function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await pb.collection('products').getList(1, 8, {
          sort: '-created',
        });

        const mapped = result.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image
            ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${item.id}/${item.image}`
            : '/placeholder.png',
        }));

        setProducts(mapped.length > 0 ? mapped : mockProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= products.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, products.length - 3) : Math.max(0, prevIndex - 3)
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-petro-light/10 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-petro-dark mb-4">
              محصولات تازه اضافه شده
            </h2>
          </div>
          <p className="text-center py-8 text-petro-slate">در حال بارگذاری...</p>
        </div>
      </section>
    );
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 bg-gradient-to-br from-white to-petro-light/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 right-20 w-64 h-64 bg-petro-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-industrial-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-petro-dark mb-4">
            محصولات تازه اضافه شده
          </h2>
          <p className="text-lg text-petro-slate max-w-3xl mx-auto">
            جدیدترین محصولات پتروشیمی و شیمیایی اضافه شده به پلتفرم
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {products.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-petro-light/50 rounded-full flex items-center justify-center text-petro-dark hover:bg-industrial-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-petro-light/50 rounded-full flex items-center justify-center text-petro-dark hover:bg-industrial-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={currentIndex + 3 >= products.length}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
            {visibleProducts.map((product) => (
              <HorizontalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {products.length > 3 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-industrial-blue w-6'
                    : 'bg-petro-light hover:bg-petro-slate'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface HorizontalProductCardProps {
  product: Product;
}

function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-petro-light/30 rounded-xl overflow-hidden hover:bg-white transition-all duration-500 transform hover:-translate-y-1 cursor-pointer">
      <div className="flex h-32">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden bg-petro-light/20">
          <img
            src={product.image}
            alt={`${product.name} - Franco Antonio Giovanella on Unsplash`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ width: '128px', height: '128px' }}
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-petro-dark mb-1 group-hover:text-industrial-blue transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-petro-slate mb-2">
              دسته‌بندی: {product.category}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-industrial-orange">
              {product.price} تومان
            </p>
            <div className="w-2 h-2 bg-industrial-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}