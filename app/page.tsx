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
import SocialMediaAnimation from "./components/SocialMediaAnimation";

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
            <Link href={generalInfo.cta2.href} rel="norefferer" target="_blank">
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
                icon={<IconComponent className="w-full h-fit" />}
                image={{
                  src: urlFor(card.image.asset).url(),
                  alt: `${card.title}`,
                }}
              />
            );
          })}
        <Card title="Sponsors" icon={<Icons.MdStar className="w-full h-fit" />}>
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
      <Link target="_blank" rel="noreferrer" href={"https://gdg.community.dev/gdg-on-campus-mcmaster-university-hamilton-canada/"}>
        <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
          <span className="font-semibold">See Our Events</span>
        </ChevronArrowButton>
      </Link>
    </SectionCard>
  );
};

const NewslettersSection = async () => {
  const newsletters: Newsletter[] = await client.fetch(
    `*[_type == "newsletter"] | order(publishedAt desc) [0...3]`
  );

  if (!newsletters) return null;

  return (
    <SectionCard id="newsletters" title="Our Newsletter" description="Stay up-to-date with the latest and greatest in everything tech">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        { newsletters && newsletters.map((newsletter: Newsletter) => (
          <Link href={`/newsletters/${newsletter.slug.current}`} key={newsletter._id}>
            <Card
              title={newsletter.title}
              description={newsletter.description}
              icon={<Icons.MdArticle className="w-full h-fit"/>}
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
                    <div className="w-6">
                      <IconComponent className="w-full h-fit" />
                    </div>
                    <span className="text-white-00">{teamItem.name}</span>
                  </div>
                  {!hasProjects &&
                    <div>
                      <span className="text-white-03">{teamItem.description}</span>
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
                    <div className="w-6">
                      <IconComponent className="w-full h-fit" />
                    </div>
                    <span className="text-white-00">{teamItem.name}</span>
                  </div>
                  {!hasProjects && 
                    <div>
                      <span className="text-white-03">{teamItem.description}</span>
                    </div>
                  }
                  {isInfiniteCarousel && (
                    <div className="relative overflow-x-auto ">
                      <div className="flex flex-row space-x-4">
                        {teamItem.projects?.map(({ _key, name, image, link }: Project) => (
                          <div className="flex flex-col gap-y-2" key={_key}>
                            <Link href={link} target="_blank" rel="noreferrer">
                              <div className="h-40 w-40 md:w-64 rounded-xl bg-black-03 flex items-center justify-center">
                                { image ?
                                  <Image 
                                    src={urlFor(image.asset).url()}
                                    alt={name}
                                    width={150}
                                    height={150}
                                  />
                                  :
                                  <Icons.MdCode size={200} />
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
        <AboutUsSection />
        <EventsSection />
        <NewslettersSection />
        <TeamSection />
        <ThankYouSection />
      </main>
    </>
  );
}