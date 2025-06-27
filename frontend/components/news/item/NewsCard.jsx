import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({item}) => {
    return (
        <div className=' shadow-md rounded-md flex p-4 hover:shadow-md transition-shadow duration-300'>
            <div className='relative flex-shrink-0 overflow-hidden rounded-md group'>
                <div className='group-hover:scale-110 transform transition-transform duration-700 w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative'>
                    <Image 
                    layout='fill'
                    className='object-cover rounded-md'
                    src={item?.image} alt='Image'
                    
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md '>

                    </div>

                </div>
                
            </div>
            <div className='flex flex-col justify-between pl-4 w-full'>
                <Link href={`/news/category/${item?.category}`} className='text-xs font-semibold text-sky-500 hover:underline'>
                {item?.category}
                </Link>

                <Link href={`/news/${item?.slug}`} className='text-base font-semibold text-gray-800 hover:text-sky-400 transition-colors duration-300'>
                {item?.title}
                </Link>

                <div className='flex gap-x-3 text-xs text-gray-500'>
                    <span className='font-semibold'>{item?.date}</span>
                    <span className='font-semibold'>{item?.writerName}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;