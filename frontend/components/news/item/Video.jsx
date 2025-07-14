'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const SimpleVideoCard = ({ item, type }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    
    if (!item) return null;

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Split description into words for preview
    const descriptionWords = item.description ? item.description.split(' ') : [];
    const shortDescription = descriptionWords.slice(0, 10).join(' ') + (descriptionWords.length > 10 ? '...' : '');

    return (
        <div className='group relative bg-white rounded-lg overflow-hidden shadow-md'>
            {/* Video Container */}
            <div className='relative'>
                <div className={`${type === 'latest' ? 'h-[270px] sm:h-[470px]' : type ? 'h-[120px] sm:h-[180px]' : 'h-[228px]'} w-full`}>
                    <video 
                        className='w-full h-full object-cover'
                        controls={isPlaying}
                        muted={true} // Autoplay butuh muted agar jalan
                        loop
                        autoPlay={isPlaying}
                        playsInline
                    >
                        <source src={item?.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                </div>
                
                {/* Play Button */}
                {!isPlaying && (
                    <button 
                        onClick={togglePlay}
                        className='absolute inset-0 m-auto w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center transition-opacity duration-300'
                    >
                        <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M8 5v14l11-7z' />
                        </svg>
                    </button>
                )}
            </div>

            {/* Video Info */}
            <div className='p-4 text-black'>
                <Link 
                    href={`/videos/${item._id}`} 
                    className='text-lg font-medium mb-2 line-clamp-2 hover:text-blue-600'
                >
                    {item.title || 'Untitled Video'}
                </Link>
                
                <div className='text-sm text-gray-600 mb-2'>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    }) : 'No date'}
                    </div>
                
                {/* Description with show more/less */}
                {item.description && (
                    <div className='text-sm text-gray-800 mb-2'>
                        {showFullDescription ? item.description : shortDescription}
                        {descriptionWords.length > 10 && (
                            <button 
                                onClick={toggleDescription}
                                className='ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium'
                            >
                                {showFullDescription ? 'Sembunyikan' : 'Tampilkan lebih banyak'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleVideoCard;