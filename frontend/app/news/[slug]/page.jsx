import Breadcrumb from '@/components/Breadcrumb';
import SimpleDetailsNewCard from '@/components/news/item/SimpleDetailsNewCard';
import RecentNews from '@/components/news/RecentNews';
import Search from '@/components/news/Search';
import React from 'react';
import Category from '@/components/Category';
import PopularNews from '@/components/news/PopularNews';

const page = () => {
    return (
        <div>
            <div className='bg-white shadow-sm py-4'>
                <div className='px-4 md:px-8 w-full'>
                    <Breadcrumb one="Category" two={"What puzzles reveal about the "}/>
                </div>
            </div>
            <div className='bg-slate-200 w-full'>
                <div className='px-4 md:px-8 w-full py-8'>
                    <div className='flex flex-wrap'>
                        <div className='w-full xl:w-8/12'>
                            <div className='w-full pr-0 xl:pr-4'>
                                <div className='flex flex-col gap-y-5 bg-white'>
                                    <img src={"https://res.cloudinary.com/dtby9tf0z/image/upload/v1747049815/cld-sample-2.jpg"} alt=""/>
                                    <div className='flex flex-col gap-y-4 px-6 pb-6'>
                                        <h3 className='text-red-700 uppercase font-medium text-xl'>Category Name</h3>
                                        <h2 className='text-3xl text-gray-700 font-bold'>white puzzles is veru easy</h2>
                                        <div className='flex gap-x-2 text-xl font-normal text-slate-600 '>
                                            <span className='font-bold'>24-09-2024</span>
                                            <span className='font-bold'>By Nabila</span>
                                        </div>

                                        <p>
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                            The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                                        </p>
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
                        <PopularNews/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;