"use client";

import React, {useState, useEffect} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimpleNewsCard from './item/SimpleNewsCard';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import Title from '../Title';
import {base_api_url} from '@/config/config';

const LatestNews = () => {
    const [news, setNews] = useState([])
    const latest_news_get = async () => {
        try {
            const res = await fetch(`${base_api_url}/api/latest/news`)
            const data = await res.json();
            setNews(data.news);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        latest_news_get()
    },[])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
        };
    const ButtonGroup = ({next, previous}) => {
        return (
            <div className='flex justify-between items-center py-2'>
                <Title title="Latest News"/>
                <div className='flex items-center space-x-2'>
                    <button onClick={()=>previous()} className='w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-transition'>
                        <FiChevronLeft size={20}/>
                    </button>
                    <button onClick={()=>next()} className='w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-transition'>
                        <FiChevronRight size={20}/>
                    </button>
                </div>

            </div>
        )
    }
    return (
        <div className='w-full flex flex-col-reverse gap-3 pr-0 lg:pr-2'>
            <Carousel
            autoPlay={true}
            arrows={false}
            renderButtonGroupOutside={true}
            responsive={responsive}
            customButtonGroup={<ButtonGroup/>}
            infinite={true}
            transitionDuration={10}
            >
                {
                    news.map((item, i)=> <SimpleNewsCard item={item} key={i} type='latest'/>)
                }

            </Carousel>
            
        </div>
    );
};
export default LatestNews;