import React from 'react'
import { ChevronArrowButton } from './ChevronArrow';
import Banner from './Banner';

const SolutionChallengeBanner = () => {
  const solutionChallengeLink = "https://gdg.community.dev/events/details/google-gdg-on-campus-mcmaster-university-hamilton-canada-presents-gdg-on-campus-mcmaster-solutions-challenge-2025-info/";

  return (
    <Banner
      heading="🚀 Join the Solution Challenge 2025!"
      link={solutionChallengeLink}
      buttonText="Learn More"
    />
  );
}

export default SolutionChallengeBanner