import React from 'react';
import Image from 'next/image';
import {base_api_url} from '@/config/config';

const Gallery = async () => {
    const res = await fetch(`${base_api_url}/api/images/news`,{
        next: {
            revalidate: 5
        }
    })
   
    const {images} = await res.json()

    return (
        <div className='w-full flex flex-col gap-y-[14px]'>
            <div className='text-xl font-bold text-black '>
                Gallery
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {
                    images && images.length > 0 && images.map((item,i)=>(
                        <div key={i} className='w-full h-[85px] relative'>
                            <Image
                            className=''
                            layout='fill'
                            src={item.image}
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