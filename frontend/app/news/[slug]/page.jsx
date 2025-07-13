"use client";

import Breadcrumb from '@/components/Breadcrumb';
import SimpleDetailsNewCard from '@/components/news/item/SimpleDetailsNewCard';
import RecentNews from '@/components/news/RecentNews';
import Search from '@/components/news/Search';
import React, { useState, useEffect } from 'react';
import Category from '@/components/Category';
import PopularNews from '@/components/news/PopularNews';
import HeadLines from "@/components/HeadLines";
import Header from '@/components/Header';
import {base_api_url} from "@/config/config";
import parse from 'html-react-parser';
import RelatedNews from '@/components/news/RelatedNews';
import { use } from 'react';

const Details = ({params}) => {
    const { slug } = use(params);
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
                const data = await res.json();
                setNews(data.news);
                setRelatedNews(data.relatedNews);
                
                // Fetch comments for this news
                const commentsRes = await fetch(`${base_api_url}/api/comments/${data.news._id}`);
                const commentsData = await commentsRes.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [slug]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !name.trim()) return;

        try {
            const response = await fetch(`${base_api_url}/api/comments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newsId: news._id,
                    name,
                    comment: newComment
                }),
            });

            if (response.ok) {
                const addedComment = await response.json();
                // Tambahkan createdAt jika belum ada (fallback)
                if (!addedComment.createdAt) {
                    addedComment.createdAt = new Date();
                }
                setComments([addedComment, ...comments]);
                setNewComment('');
                setName('');
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    if (!news) return <div>Loading...</div>;

    return (
        <div className="max-w-[2000px] mx-auto">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <Header />
            </div>
            <div className="h-[140px]"></div>
            <div className='bg-white shadow-sm py-4'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one={news?.category} two={news?.title}/>
                </div>
            </div>
            
            <div className='w-full'>
                <div className='px-4 md:px-8 w-full py-8'>
                    <div className='flex flex-wrap'>
                        <div className='w-full xl:w-8/12'>
                            <div className='w-full pr-0 xl:pr-4'>
                                <div className='flex flex-col gap-y-5 bg-white'>
                                    <img src={news?.image} alt=""/>
                                    <div className='flex flex-col gap-y-4 px-6 pb-6'>
                                        <h3 className='text-sky-400 uppercase font-medium text-xl'>{news?.category}</h3>
                                        <h2 className='text-3xl text-gray-700 font-bold'>{news?.title}</h2>
                                        <div className='flex gap-x-2 text-xl font-normal text-slate-600 '>
                                            <span className='font-bold'>{news?.date}</span>
                                            <span className='font-bold'>{news?.writerName}</span>
                                        </div>

                                        <div className="text-justify">
                                            {parse(news?.description || "")}
                                        </div>
                                        
                                        <div className="bg-white p-6 rounded-xl shadow-md">
                                            <h2 className="text-xl font-semibold mb-4 text-sky-400">Komentar ({comments.length})</h2>

                                            <form onSubmit={handleSubmitComment} className="mb-4">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                                                    placeholder="Nama Anda"
                                                    required
                                                />
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                                                    rows="3"
                                                    placeholder="Tulis komentarmu di sini..."
                                                    required
                                                ></textarea>
                                                <button
                                                    type="submit"
                                                    className="mt-2 bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500 transition"
                                                >
                                                    Kirim
                                                </button>
                                            </form>

                                            <div className="space-y-4">
                                                {comments.map((comment, index) => (
                                                    <div key={index} className="p-4 border-b border-gray-200">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-gray-800">{comment.name}</h4>
                                                            <span className="text-sm text-gray-500">
                                                                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Baru saja'}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-gray-600">{comment.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full xl:w-4/12'>
                            <div className='w-full pl-0 xl:pl-4'>
                                <div className='flex flex-col gap-y-8'>
                                    <Search/>
                                    <RecentNews/>
                                    <div className='p-4 bg-white'>
                                        <Category titleStyle={"text-gray-700 font-bold"}/>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className='pt-8 '>
                        <RelatedNews news={relatedNews} type='Related News'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;