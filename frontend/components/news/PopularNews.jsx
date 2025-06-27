import React from 'react';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';
import Title from '../Title';
import { base_api_url } from '@/config/config';

const PopularNews =async  ({type}) => {
     const res = await fetch(`${base_api_url}/api/popular/news`,{
        next: {
            revalidate: 1
        }
    })
   
    const {popularNews} = await res.json()
    return (
        <div className='w-full pb-8 mt-5'>
            <div className='flex flex-col w-full gap-y-[14px]'>
                <Title title="Berita Populer"/>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3'>
                    {
                        [1,2,3,4].map((item, i) => <SimpleDetailsNewCard type={type} item={item} key={i} height={230}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularNews;