'use client'
import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import { base_api_url } from '@/config/config';
import SimpleDetailsNewCard from './item/SimpleDetailsNewCard';

const SearchNews = () => {
  const [news, setNews] = useState([])
  const searchValue = useSearchParams()
  const value = searchValue.get('value')
 
  const get_news = async () => {
    if (!value) return;
    try {
      const res = await fetch(`${base_api_url}/api/search/news?value=${value}`)
      const {news} = await res.json();
      setNews(news)
    
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    get_news()
  }, [value])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {
        news && news.length > 0 ? (
          news.map((item, i)=>(
            <SimpleDetailsNewCard news={item} key={i} type="details_news" height={200}/>
          ) )
        ) : (
          <p>Berita Tidak Ditemukan</p>
        )
      }
    </div>
  );
};

export default SearchNews;