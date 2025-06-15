import React from 'react';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';
import Title from '../Title';

const PopularNews = ({type}) => {
    return (
        <div className='w-full pb-8 mt-5'>
            <div className='flex flex-col w-full gap-y-[14px]'>
                <div className='text-xl font-bold text-gray-800 relative pl-4'>
                    <span className='absolute inset-y-0 left-0 w-1 bg-blue-600 rounded-sm'></span>
                    Popular News
                </div>
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