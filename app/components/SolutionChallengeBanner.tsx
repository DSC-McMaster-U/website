import React from 'react'
import { ChevronArrowButton } from './ChevronArrow';
import Link from 'next/link';

const SolutionChallengeBanner = () => {
  const solutionChallengeLink = "https://gdg.community.dev/events/details/google-gdg-on-campus-mcmaster-university-hamilton-canada-presents-gdg-on-campus-mcmaster-solutions-challenge-2025-info/";

  return (
    <div className="bg-blue-500 text-white py-8 px-8 rounded-lg shadow-lg mt-6">
      <div className="flex flex-row justify-between md:justify-center md:gap-24 items-center">
        <h1 className="text-4xl font-bold">🚀 Join the new Solution Challenge!</h1>
        <Link href={solutionChallengeLink} className='h-fit'>
          <ChevronArrowButton className="bg-red-500 text-white-00 border-2 dark:border-black-00 border-white-00 min-w-44 items-center">
            <span className="font-semibold p-1 px-2 text-lg">Learn More</span>
          </ChevronArrowButton>
        </Link>
        
      </div>
    </div>
  );
}

export default SolutionChallengeBanner