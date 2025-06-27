import React from 'react';
import moment from 'moment';
import {FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from '../assets/codenews.png'
import adver_image from '../assets/add.png'
import bg_header from '../assets/header-bg.jpg'
import Image from 'next/image';
import Header_Category from './Header_Category';


const Header = () => {

    
    return (

        <header className='bg-white text-[#cccccc]'>
            <div className='px-5 lg:px-8 flex justify-between items-center py-2 '>
                <span className='text-sm font-medium'>{moment().format('DD/MM/YYYY HH:mm')}</span>
                <div className='flex space-x-2'>
                  
                    <a href="#" className="w-[37px] h-[35px] text-white flex justify-center items-center bg-sky-500">
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

            <div>
               <div className='px-5 lg:px-8 flex justify-center items-center h-10'>
                    <div className='flex flex-col items-center space-y-3'>
                        <Image 
                        className='w-[150px] h-auto'
                        alt='logo'
                        src={logo}
                        priority
                        />
                    </div>
                </div>
            </div>
        
        <Header_Category/>
      
        
        </header>
    );
};

export default Header;
