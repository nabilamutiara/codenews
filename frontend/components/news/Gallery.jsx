import React from 'react';
import Image from 'next/image';

const Gallery = () => {
    return (
        <div className='w-full flex flex-col gap-y-[14px]'>
            <div className='text-xl font-bold text-black '>
                Gallery
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {
                    [1,2,3,4,5,6].map((item,i)=>(
                        <div key={i} className='w-full h-[85px] relative'>
                            <Image
                            className=''
                            layout='fill'
                            src={'http://res.cloudinary.com/dtby9tf0z/image/upload/v1749088014/news_images/prqy4yatnm6sdzoihytl.jpg'}
                            alt='gallery image'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Gallery;