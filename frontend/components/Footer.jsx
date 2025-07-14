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
                                A news portal is a digital platform that delivers real-time news, articles, and multimedia content to the general public, covering diverse topics such as business, technology, health, and sports. Designed for accessibility across devices, it features breaking news updates, interactive media, user-friendly navigation, and social sharing capabilities while promoting credible journalism and public discourse to combat misinformation and keep society informed.
                            </h2>
                        </div>
                    </div>
                    <Gallery/>
                    
                    <RecentNewsFooter/>
                </div>
            </div>
            <div className="bg-white">
            <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row items-center md:items-start justify-between gap-5 text-gray-300">
                
              
                <div className="text-center md:text-left">
                <span>© 2025</span>
                <Link href="#" className="hover:underline">Nabila Mutiara Susetio</Link>
                </div>
              
                

            </div>
            </div>


        </div>
    );
};

export default Footer;