// app/search/news/page.tsx atau page.jsx

import React, { Suspense } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Category from '@/components/Category';
import PopularNews from '@/components/news/PopularNews';
import RecentNews from '@/components/news/RecentNews';
import Search from '@/components/news/Search';
import Header from '@/components/Header';
import SearchNews from '@/components/news/SearchNews'; // Pastikan path ini sesuai

const Page = () => {
  return (
    <div className="max-w-[2000px] mx-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Header />
      </div>

      {/* Spacer after fixed header */}
      <div className="h-[140px]" />

      {/* Breadcrumb */}
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="search" />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            {/* Left section */}
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <Suspense fallback={<div>Loading search...</div>}>
                  <SearchNews />
                </Suspense>
              </div>
            </div>

            {/* Right section */}
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle="text-gray-700 font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular news */}
          <div className="pt-8">
            <PopularNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
