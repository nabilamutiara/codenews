import React from 'react';
import Link from 'next/link';

const Category = ({titleStyle}) => {
    return (
        <div className='w-full flex flex-col gap-y-[14px] '>
           <div className={`text-xl font-bold ${titleStyle} relative`}>
            Category
            </div> 
            <div className={`flex flex-col justify-start items-start text-sm gap-y-3 ${titleStyle} pt-1`}>
                {
                    [1,2,3,4,5,6].map((item,i)=>(
                        <li className='list-none font-semibold text-gray-500' key={i}>
                            <Link href={`/`}> Category (5)
                            </Link>
                        </li>
                    ))
                }
            </div>
        </div>
        
    );
};

export default Category;