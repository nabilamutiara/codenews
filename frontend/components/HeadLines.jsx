import React from 'react';
import LoadingSpinner from 'react-spinners-components';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import {base_api_url} from "@/config/config";

const HeadLines = ({news}) => {

    return (
        <div className='bg-white shadow flex h-14 overflow-hidden'>
            <div className='flex w-[170px] bg-white relative after:absolute after:bg-white after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0'>
                <div className='pl-4 w-full h-14 flex items-center gap-x-1'>
                <span>
                    <LoadingSpinner type='Ripple' colors={['bg-sky-400', 'bg-red-700']} size='30px' />
                </span>
                <h2 className='text-sky-400 font-semibold text-lg'>Headlines</h2>
                </div>
            </div>

            <div className='flex w-[calc(100%-170px)] h-14 overflow-hidden'>
                <Marquee className='flex items-center h-full'>
                {
                    Object.keys(news).length > 0 &&
                    Object.keys(news).map((c) => (
                        <div key={`category-${c}`}>
                        {news[c].length > 0 && news[c].map((n) => (
                            <Link
                            key={`news-${n.slug}`}  // Using slug as unique identifier
                            href={`/news/${n.slug}`}
                            className='px-4 text-sm font-medium text-[#1e293b] hover:text-black whitespace-nowrap'
                            >
                            {n.title}
                            </Link>
                        ))}
                        </div>
                    ))
                }
                
                </Marquee>
            </div>
        </div>

    );
};

export default HeadLines;
