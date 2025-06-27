import React from 'react';
import logo from '../assets/codenews.png';
import logowinnicode from '../assets/logowinnicode.png';
import Image from 'next/image';
import Gallery from './news/Gallery';
import Category from './Category';
import RecentNewsFooter from './news/RecentNewsFooter';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='bg-white'>
                <div className='px-4 md:px-8 py-10 w-full gap-12 grid lg:grid-cols-4 grid-cols-1'>
                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-y-[14px]'>
                            <Image
                            className=''
                            width={200}
                            height={100}
                            src={logowinnicode}
                            alt='logo'
                            />
                            <Image
                            className=''
                            width={200}
                            height={100}
                            src={logo}
                            alt='logo'
                            />
                            <h2 className='text-gray-500 text-justify'>
                                The city of Luang Prabang is Laos' spiritual heartland, renowned for its rich Buddhist heritage, ornate temples and a significant population of saffron-robed monks. In fact, the 50,000-person spiritual hub is said by many to have the highest population of monks per capita anywhere in the world
                            </h2>
                        </div>
                    </div>
                    <Gallery/>
                    <div>
                        <Category titleStyle='text-black'/>
                    </div>
                    <RecentNewsFooter/>
                </div>
            </div>
            <div className="bg-white">
            <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row items-center md:items-start justify-between gap-5 text-gray-300">
                
              
                <div className="text-center md:text-left">
                <span>© 2025</span>
                <Link href="#" className="hover:underline">PT Winnicode Garuda Teknologi</Link>
                </div>

               
                

              
                <div className="flex gap-x-2 justify-center md:justify-end">
               ` <a href="#" className="w-[37px] h-[35px] text-white flex justify-center items-center bg-sky-500">
                    <FaFacebookF />
                </a>
                <a href="#" className="w-[37px] h-[35px] text-white flex justify-center items-center bg-sky-500">
                    <FaTwitter />
                </a>
                <a href="#" className="w-[37px] h-[35px] text-white flex justify-center items-center bg-sky-500">
                    <FaYoutube />
                </a>`
                </div>

            </div>
            </div>


        </div>
    );
};

export default Footer;