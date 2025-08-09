'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import styles from './SearchFormSection.module.css';


export default function SearchFormSection() {
    const [activeTab, setActiveTab] = useState("sales");
  return (
  <section className={`relative pt-0 pb-8 from-petro-light ${styles.searchFormSection}`}>
             <div className="px-4 pb-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className={`flex bg-transparent ${styles.tabsContainer}`}>
                <button
                  onClick={() => setActiveTab("sales")}
                  className={`px-8 py-4 font-semibold text-lg rounded-t-lg transition-all ${
                    activeTab === "sales"
                      ? "bg-white text-petro-dark shadow-lg"
                      : "bg-petro-dark text-white hover:bg-petro-slate"
                  }`}
                >
                  فروش
                </button>
                <button
                  onClick={() => setActiveTab("purchase")}
                  className={`px-8 py-4 font-semibold text-lg rounded-t-lg transition-all ${
                    activeTab === "purchase"
                      ? "bg-white text-petro-dark shadow-lg"
                      : "bg-petro-dark text-white hover:bg-petro-slate"
                  }`}
                >
                  خرید
                </button>
                <button
                  onClick={() => setActiveTab("tender")}
                  className={`px-8 py-4 font-semibold text-lg rounded-t-lg transition-all ${
                    activeTab === "tender"
                      ? "bg-white text-petro-dark shadow-lg"
                      : "bg-petro-dark text-white hover:bg-petro-slate"
                  }`}
                >
                  مناقصه
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Form Card */}
        <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl border border-gray-200">
          <div className="p-6">
            {/* Filter Labels Row */}
            <div className="grid grid-cols-4 gap-6 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-petro-dark">دسته‌بندی</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-petro-dark">شهر</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-petro-dark">نوع بسته‌بندی</h3>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-petro-dark">قیمت</h3>
              </div>
            </div>

            {/* Filter Dropdowns Row */}
            <div className="grid grid-cols-4 gap-6 items-end">
              <Select>
                <SelectTrigger className="h-12 text-base border-gray-300 bg-petro-light/30 hover:border-industrial-blue transition-colors">
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polymers">پلیمرها</SelectItem>
                  <SelectItem value="chemicals">مواد شیمیایی</SelectItem>
                  <SelectItem value="petrochemicals">پتروشیمی</SelectItem>
                  <SelectItem value="fertilizers">کودها</SelectItem>
                  <SelectItem value="solvents">حلال‌ها</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 text-base border-gray-300 bg-petro-light/30 hover:border-industrial-blue transition-colors">
                  <SelectValue placeholder="انتخاب شهر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tehran">تهران</SelectItem>
                  <SelectItem value="isfahan">اصفهان</SelectItem>
                  <SelectItem value="shiraz">شیراز</SelectItem>
                  <SelectItem value="tabriz">تبریز</SelectItem>
                  <SelectItem value="mashhad">مشهد</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 text-base border-gray-300 bg-petro-light/30 hover:border-industrial-blue transition-colors">
                  <SelectValue placeholder="نوع بسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bag">کیسه</SelectItem>
                  <SelectItem value="drum">بشکه</SelectItem>
                  <SelectItem value="tank">تانکر</SelectItem>
                  <SelectItem value="bulk">فله</SelectItem>
                  <SelectItem value="container">کانتینر</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 text-base border-gray-300 bg-petro-light/30 hover:border-industrial-blue transition-colors">
                  <SelectValue placeholder="محدوده قیمت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1m">زیر ۱ میلیون</SelectItem>
                  <SelectItem value="1m-5m">۱ تا ۵ میلیون</SelectItem>
                  <SelectItem value="5m-10m">۵ تا ۱۰ میلیون</SelectItem>
                  <SelectItem value="10m-50m">۱۰ تا ۵۰ میلیون</SelectItem>
                  <SelectItem value="over-50m">بالای ۵۰ میلیون</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex justify-end mt-4">
              <Button 
                className="bg-industrial-orange hover:bg-orange-600 text-white px-10 py-3 h-12 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="w-5 h-5 ml-2" />
                جستجو
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}