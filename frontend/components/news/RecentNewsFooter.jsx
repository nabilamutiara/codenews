import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecentNewsFooter = () => {
    return (
        <div className='w-full flex flex-col gap-y-[14px]'>
           <div className={`text-xl font-bold text-black relative `}>
                    Recent News
            </div> 
            <div className='grid grid-cols-1 gap-y-2 pt-1'>
                {
                    [1,2,3].map((r,i)=>{
                        if (i < 4) {
                            return <Link key={i} href={`/`} className='flex w-full'>
                                <div className='group relative overflow-hidden w-[80px] h-[65px]'>
                                    <div className='w-[80px] h-[65px] block group-hover:scale-[1.1] transition-all duration-[1s]'>
                                        <Image
                                        className=''
                                        layout='fill'
                                        src={`http://res.cloudinary.com/dtby9tf0z/image/upload/v1749088014/news_images/prqy4yatnm6sdzoihytl.jpg`}
                                        alt='images'
                                        />
                                        <div className='w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300' href={"#"}>

                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='w-[calc(100%-90px)] pl-2'>
                                    <div className='flex flex-col gap-y-1'>
                                        <h2 className='text-sm font-semibold text-black hover:text-gray-500'>
                                            What puzzles reveal about
                                        </h2>
                                        <div className='flex gap-x-2 text-xs font-normal text-gray-500'>
                                            <span>20-09-2024</span>
                                            <span>By Nabila</span>

                                        </div>
                                    </div>
                                </div>
                                
                            </Link>
                        }
                    })
                }
            </div>
        </div>
    );
};

export default RecentNewsFooter;