'use client';
import React, { useState, useEffect } from 'react';
import Title from '../Title';
import NewsCard from './item/NewsCard';
import {base_api_url} from '@/config/config';

const RecentNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${base_api_url}/api/recent/news`, {
                    next: { revalidate: 1 }
                });
                const data = await res.json();
                setNews(data.news);
            } catch (error) {
                console.error('Error fetching recent news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full flex flex-col gap-y-[6px] bg-white pt-4'>
            <div className='pl-4'>
                <Title title="Recent News"/>
            </div>
            <div className='grid grid-cols-1 gap-y-0'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    news?.length > 0 ? (
                        news.map((item, i) => (
                            <NewsCard key={i} item={item}/>
                        ))
                    ) : (
                        <p>No recent news found</p>
                    )
                )}
            </div>
        </div>
    );
};

export default RecentNews;