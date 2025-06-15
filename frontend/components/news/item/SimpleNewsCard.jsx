import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SimpleNewsCard = ({item, type}) => {
    return (
        <div className='group relative'>
            <div className='overflow-hidden'>
                <div className={`${ type === 'latest' ? 'h-[270px] sm:h-[470px]' : type ? 'h-[120px] sm:h-[180px]': 'h-[228px]'} w-full group-hover:scale-[1.1] transition-all duration-[1s]`}>
                    <Image className='' layout='fill' src={'http://res.cloudinary.com/dtby9tf0z/image/upload/v1749088014/news_images/prqy4yatnm6sdzoihytl.jpg'} alt='images'/>

                </div>

            </div>

            <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300'>

            </div>
            <div className='left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2'>
                <div className='px-[6px] py-[2px] rounded-md text-[13px] bg-[#c80000]'>
                    Category
                </div>
                <Link href={'/'} className='text-xl'>
                7 Situasi Terkini Gaza: 15.000 Tewas-Kabar Gencatan Senjata
                </Link>
                <div className='flex gap-x-2 text-sm font-medium'>
                    <span>
                        25-09-2024
                    </span>
                    <span>
                        By Ariyan
                    </span>

                </div>
            </div>
        </div>
    );
};

export default SimpleNewsCard;