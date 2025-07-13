'use client';
import React from 'react';
import Link from 'next/link';

const Category = ({ titleStyle, categories }) => {
  return (
    <div className='w-full flex flex-col gap-y-[14px] '>
      <div className={`text-xl font-bold ${titleStyle} relative`}>
        Category
      </div> 
      <div className={`flex flex-col justify-start items-start text-sm gap-y-3 ${titleStyle} pt-1`}>
        {categories?.length > 0 ? (
          categories.map((item, i) => (
            <li className='list-none font-semibold text-gray-500' key={i}>
              <Link href={`/news/category/${item.category}`}>
                {item.category} ({item.count})
              </Link>
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default Category;