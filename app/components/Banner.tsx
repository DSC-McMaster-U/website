import React from 'react'
import { ChevronArrowButton } from './ChevronArrow';
import Link from 'next/link';

interface BannerProps {
    heading: string;
    link: string;
    buttonText: string;
}

const Banner: React.FC<BannerProps> = ({ heading, link, buttonText }) => {;
  return (
    <div 
      className="bg-green-500 dark:bg-blue-500 text-white py-6 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-[101%] group"
    >
      <div className="flex flex-col md:flex-row justify-between md:justify-center gap-4 md:gap-24 items-center">
        <h1 className="text-4xl font-bold text-center md:text-left">{heading}</h1>
        <Link href={link} target="_blank">
          <ChevronArrowButton className="dark:bg-red-500 bg-blue-500 hover:bg-blue-600 dark:hover:bg-red-600 transition-all duration-500 text-white-00 border-2 dark:border-black-00 border-white-00 min-w-44 items-center">
            <span className="font-semibold p-1 px-2 text-lg">{buttonText}</span>
          </ChevronArrowButton>
        </Link>
        
      </div>
    </div>
  );
}

export default Banner