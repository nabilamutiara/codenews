'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SimpleNewsCard = ({item, type}) => {
    return (
        <div className='group relative'>
            <div className='overflow-hidden'>
                <div className={`${ type === 'latest' ? 'h-[270px] sm:h-[470px]' : type ? 'h-[120px] sm:h-[180px]': 'h-[228px]'} w-full group-hover:scale-[1.1] transition-all duration-[1s]`}>
                    <Image className='w-full' layout='fill' src={item?.image} alt='images'/>

                </div>

            </div>

            <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'>

            </div>
            <div className='left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2'>
                <div className='px-[6px] py-[2px] rounded-md text-[13px] bg-sky-400'>
                    {item.category}
                </div>
                <Link href={`/news/${item.slug}`} className='text-sm' onClick={() => console.log("broooooooo haahhaahhhahahahha")}>
                    {item.title}
                </Link>
                <div className='flex gap-x-2 text-sm font-medium'>
                    <span>
                        {item.date}
                    </span>
                    <span>
                        {item.writerName}
                    </span>

                </div>
            </div>
        </div>
    );
};

export default SimpleNewsCard;