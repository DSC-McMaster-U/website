import { client } from "@/sanity/lib/client";
import { FC } from "react";
import { About, AboutCard, GeneralInfo, Newsletter, Project, Sponsor, Team, TeamItem } from "@/types/sanity";
import Link from "next/link";
import Ticker from "@/app/components/Ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/Header";
import Image from "next/image";
import { ChevronArrowButton } from "@/app/components/ChevronArrow";
import * as Icons from "react-icons/md";
import HeroAnimation from "@/assets/animations/HeroAnimation.gif";
import SectionCard from "./components/SectionCard";
import Card from "./components/Card";
import Heart from "./components/svgs/Heart";
import AnimatedHero, { AnimatedHeroSvg } from "./components/AnimatedHero";
import { Metadata } from "next";
import SolutionChallengeBanner from "./components/SolutionChallengeBanner";

export const metadata: Metadata = {
  title: "Google Developer Group on Campus | McMaster University",
  description: "Google Developer Group on Campus at McMaster University bridges the gap between theory and practice through solving real-world problems.",
};

const HeroSection = async () => {
  const generalInfo: GeneralInfo = await client.fetch(`*[_type == 'generalInfo'][0]`);

  if (!generalInfo) return null;

  return (
    <div id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
      <AnimatedHero className="md:w-2/3 flex flex-col justify-start gap-y-4" id="hero-content">
        <h1 className="hero-title">{generalInfo.club && generalInfo.club}</h1>
        <h5>{generalInfo.school && generalInfo.school}</h5>
        <p>{generalInfo.description && generalInfo.description}</p>
        <div className="flex flex-row gap-x-4">
          { generalInfo.cta1 && (
            <Link href={generalInfo.cta1.href}>
              <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
                <span className="font-semibold">{generalInfo.cta1.label}</span>
              </ChevronArrowButton>
            </Link>
          )}
          { generalInfo.cta2 && (
            <Link href="/events" rel="norefferer">
              <ChevronArrowButton className="dark:bg-black-00 bg-white-00 dark:text-white-00 border-2 dark:border-white-00 border-black-00">
                <span className="font-semibold">{generalInfo.cta2.label}</span>
              </ChevronArrowButton>
            </Link>
          )}
        </div>
      </AnimatedHero>
      <AnimatedHeroSvg className="md:w-1/3">
        <Image 
          src={HeroAnimation}
          alt="Roundtable" 
          className="object-contain w-full h-full"
          unoptimized
        />
      </AnimatedHeroSvg>
    </div>
  );
};

const AboutUsSection = async () => {
  const about: About = await client.fetch(`*[_type == 'about'][0]`);
  const sponsors: Sponsor[] = await client.fetch(`*[_type == 'sponsor']`);

  if (!about) return null;

  return (
    <SectionCard title={about.title} description={about.description} id="about-us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {about.cards &&
          about.cards.map((card: AboutCard) => {
            const IconComponent = Icons[card.icon as keyof typeof Icons] || Icons.MdHelp;
            return (
              <Card
                key={card._key}
                title={card.title}
                description={card.description}
                icon={<IconComponent className="text-2xl" />}
                image={{
                  src: urlFor(card.image.asset).url(),
                  alt: `${card.title}`,
                }}
              />
            );
          })}
        <Card title="Sponsors" icon={<Icons.MdStar className="w-full h-fit text-2xl" />}>
          {sponsors && sponsors.length > 0 && (
            <div className="flex items-center justify-center h-full">
              <Ticker>
                {sponsors.map((sponsor: Sponsor) => (
                  <li key={sponsor._id}>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
                      <Image
                        src={urlFor(sponsor.logo.asset).url()}
                        alt={`${sponsor.name} logo`}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </li>
                ))}
              </Ticker>
            </div>
          )}
        </Card>
      </div>
    </SectionCard>
  );
};

const EventsSection = async () => {
  return (
    <SectionCard title="Our Events" description="Check out some different ways to get involved" id="events">
      <Link rel="noreferrer" href="/events">
        <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
          <span className="font-semibold">See Our Events</span>
        </ChevronArrowButton>
      </Link>
    </SectionCard>
  );
};

const NewslettersSection = async () => {
  const newsletters: Newsletter[] = await client.fetch(
    `*[_type == "newsletter"]` // Fetch all newsletters first
  );

  if (!newsletters) return null;

  // Function to convert slug (e.g., "january-2025") into a sortable value
  const parseSlug = (slug: { current: string }) => {
    const [month, year] = slug.current.split("-");
    const months = [
      "january", "february", "march", "april", "may", "june", 
      "july", "august", "september", "october", "november", "december"
    ];
    return parseInt(year) * 12 + months.indexOf(month.toLowerCase());
  };

  // Sort newsletters by parsed slug value in descending order
  const sortedNewsletters = newsletters.sort((a, b) => 
    parseSlug(b.slug) - parseSlug(a.slug)
  ).slice(0, 3);

  return (
    <SectionCard id="newsletters" title="Our Newsletter" description="Stay up-to-date with the latest and greatest in everything tech">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        { sortedNewsletters && sortedNewsletters.map((newsletter: Newsletter) => (
          <Link href={`/newsletters/${newsletter.slug.current}`} key={newsletter._id}>
            <Card
              title={newsletter.title}
              description={newsletter.description}
              icon={<Icons.MdArticle className="text-2xl"/>}
            />
          </Link>
        ))}
      </div>
    </SectionCard>
  );
};

const TeamSection: FC = async () => {
  const team: Team | null = await client.fetch(`*[_type == "team"][0]`);

  if (!team) return null;


  return (
    <SectionCard id="team" title={team.title} description={team.description}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2`}
      >
        {team.teams.map((teamItem: TeamItem, index: number) => {
          const isCoreTeam = teamItem.name === "Core";
          const hasProjects = teamItem.projects && (teamItem.projects.length > 0)
          const isInfiniteCarousel = hasProjects && teamItem.projects;
          const colSpanClass = (hasProjects || isCoreTeam) ? "col-span-1 md:col-span-2 lg:col-span-3" : "col-span-1";
          const IconComponent = Icons[teamItem.icon as keyof typeof Icons] || Icons.MdHelp;
          if (isCoreTeam) {
            return (
              <Card key={index} className={colSpanClass}>
                <div className="flex w-full h-fit text-start md:justify-between flex-col md:flex-row gap-y-6 p-6">
                  <div className="flex flex-row items-center gap-x-2">
                    <IconComponent className="text-2xl" />
                    <span className="text-black-00 dark:text-white-00">{teamItem.name}</span>
                  </div>
                  {!hasProjects &&
                    <div>
                      <span className="text-black-00 dark:text-white-03">{teamItem.description}</span>
                    </div>
                  }
                </div>
              </Card>
            );
          }

          return (
            <div
              key={index}
              className={isInfiniteCarousel ? colSpanClass : ""}
            >
              <Card>
                <div className="flex flex-col w-full h-fit text-start gap-y-6 p-6">
                  <div className="flex flex-row items-center gap-x-2">
                    <IconComponent className="text-2xl" />
                    <span className="text-black-00 dark:text-white-00">{teamItem.name}</span>
                  </div>
                  {!hasProjects && 
                    <div>
                      <span className="text-black-03 dark:text-white-03">{teamItem.description}</span>
                    </div>
                  }
                  {isInfiniteCarousel && (
                    <div className="relative overflow-x-auto ">
                      <div className="flex flex-row space-x-4">
                        {teamItem.projects?.map(({ _key, name, image, link }: Project) => (
                          <div className="flex flex-col gap-y-2" key={_key}>
                            <Link href={link} target="_blank" rel="noreferrer">
                              <div className="h-40 w-40 md:w-64 rounded-xl bg-white-03 dark:bg-black-03 flex items-center justify-center">
                                { image ?
                                  <Image 
                                    src={urlFor(image.asset).url()}
                                    alt={name}
                                    width={150}
                                    height={150}
                                  />
                                  :
                                  <Icons.MdCode size={200} className="text-2xl" />
                                }
                              </div>
                            </Link>
                            <div className="flex flex-col items-center w-40 md:w-64">
                              <span className="break-words text-center max-w-full">{name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <Link href={"/team"}>
        <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
          <span className="font-semibold">Meet Our Team</span>
        </ChevronArrowButton>
      </Link>
    </SectionCard>
  );
};

const SolutionChallengeSection: FC = async () => {
  const sectionDesc = "Registration for the 2025 North American Solution Challenge is officially open!";
  const solutionChallengeLink = "https://gdg.community.dev/events/details/google-gdg-on-campus-mcmaster-university-hamilton-canada-presents-gdg-on-campus-mcmaster-solutions-challenge-2025-info/";
  
  const whatDesc = "This year's Solution Challenge is running in collaboration with Google for Startups Accelerator Alumni, to solve a business problem by creating an innovative technical solution with demonstrated use of Google's tools or platforms that is powering their solution.";
  const whenDesc = "➡️ Anyone interested in participating in the Solution Challenge should fill out the Entry Form as soon as possible.";

  return (
    <SectionCard id="solution-challenge" title="Solution Challenge 2025" description={sectionDesc}>
      <div className="text-left flex flex-col text-wrap gap-2">
        <Card title="What is the Solution Challenge?" description={whatDesc}>
        </Card>
        <Card title="When is it?" description={whenDesc}>
          <div className="flex flex-col text-center w-max items-center">
            <p className=""><span className="font-semibold">Deadline to submit a project: </span> April 4th,   2025</p>
          </div>
        </Card>
        <Card >
          <Link href={solutionChallengeLink} className='h-fit'>
            <ChevronArrowButton className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white-00 border-2 dark:border-black-00 border-white-00 min-w-44 items-center">
              <span className="font-semibold p-1 px-2 text-lg">Learn More / Register</span>
            </ChevronArrowButton>
          </Link>
        </Card>
        
      </div>
    </SectionCard>
  );
}

const ThankYouSection = () => {
  return (
    <SectionCard id="thank-you" title="Our Appreciation" description="Thanks for visiting">
      <div className="flex flex-row items-center">Made with&nbsp;<Heart width={20} height={20}/>&nbsp;by your GDSC Team</div>
    </SectionCard>
  );
}

export default async function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SolutionChallengeBanner />
        <AboutUsSection />
        <EventsSection />
        <NewslettersSection />
        <TeamSection />
        <SolutionChallengeSection />
        <ThankYouSection />
      </main>
    </>
  );
}