import { client } from "@/sanity/lib/client";
import { FC } from "react";
import { Sponsor } from "@/types/sanity";
import Link from "next/link";
import Ticker from "@/app/components/Ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/Header";
import Image from "next/image";
import { ChevronArrowButton, ChevronArrowSpan } from "@/app/components/ChevronArrow";
import * as Icons from "react-icons/md"; // Import all MD icons
import HeroAnimation from "@/assets/animations/HeroAnimation.gif";
import SectionCard from "./components/SectionCard";
import Card from "./components/Card";

const HeroSection = async () => {
  const generalInfo = await client.fetch(
    `*[_type == 'generalInfo'][0]`
  );

  if (!generalInfo) return null;

  return (
    <div id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex md:flex-row flex-col gap-y-8 md:gap-y-0 min-h-screen items-center">
      <div className="md:w-2/3 flex flex-col justify-start gap-y-4" id="hero-content">
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
      </div>
      <div className="md:w-1/3">
        <Image 
          src={HeroAnimation}
          alt="Roundtable" 
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>
    </div>
  );
};

const AboutUsSection = async () => {
  const about = await client.fetch(`*[_type == 'about'][0]`);
  const sponsors = await client.fetch(`*[_type == 'sponsor']`);

  if (!about) return null;

  return (
    <SectionCard title={about.title} description={about.description} id="about-us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {about.cards &&
          about.cards.map((card: { _key: string; title: string; description: string; icon: string; image: { _type: string; asset: { _ref: string; _type: string } } }) => {
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
  const newsletters = await client.fetch(
    `*[_type == "newsletter"]`
  );

  if (!newsletters) return null;

  return (
    <SectionCard id="newsletters" title="Our Newsletter" description="Stay up-to-date with the latest and greatest in everything tech">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        { newsletters && newsletters.map((newsletter: { _id: string, title: string, description: string, slug: { current: string, type: string } }) => (
          <Card
            key={newsletter._id}
            title={newsletter.title}
            description={newsletter.description}
            icon={<Icons.MdArticle className="w-full h-fit"/>}
            CTA={
              <Link href={`/newsletters/${newsletter.slug.current}`}>
                <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
                  <span className="font-semibold">Read More</span>
                </ChevronArrowButton>
              </Link>
            }
          >
          </Card>
        ))}
      </div>
    </SectionCard>
  );
};

interface Project {
  _key: string;
  title: string;
  description: string;
  link: string;
}

interface TeamItem {
  _type: string;
  name: string;
  description: string;
  _key: string;
  icon?: string;
  projects?: Project[];
}

interface Team {
  _updatedAt: string;
  teams: TeamItem[];
  _createdAt: string;
  _rev: string;
  _type: string;
  description: string;
  _id: string;
  title: string;
}

const TeamSection: FC = async () => {
  const team: Team | null = await client.fetch(`*[_type == "team"][0]`);

  if (!team) return null;

  const hasProjects = team.teams.some((t) => t.projects && t.projects.length > 0);

  return (
    <SectionCard id="team" title={team.title} description={team.description}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
          hasProjects ? 3 : 1
        } gap-2`}
      >
        {team.teams.map((teamItem: TeamItem, index: number) => {
          const isCoreTeam = teamItem.name === "Core";
          const isInfiniteCarousel = hasProjects && teamItem.projects;
          const colSpanClass = (hasProjects || isCoreTeam) ? "col-span-3" : "col-span-1";
          const IconComponent = Icons[teamItem.icon as keyof typeof Icons] || Icons.MdHelp;
          if (isCoreTeam) {
            return (
              <Card key={index} className={colSpanClass}>
                <div className="flex w-full h-fit text-start justify-between flex-row gap-y-6 p-6">
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="w-6">
                      <IconComponent className="w-full h-fit" />
                    </div>
                    <span className="text-white-00">{teamItem.name}</span>
                  </div>
                  <div>
                    <span className="text-white-03">{teamItem.description}</span>
                  </div>
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
                  <div>
                    <span className="text-white-03">{teamItem.description}</span>
                  </div>
                  {isInfiniteCarousel && (
                    <div className="relative">
                      <div className="overflow-x-auto flex space-x-4">
                        {teamItem.projects?.map(
                          ({ _key, title, description, link }: Project) => (
                            <div
                              className="h-64 w-64 bg-black-03 p-16"
                              key={_key}
                            >
                              <h2 className="text-white-00">{title}</h2>
                              <p className="text-white-03">{description}</p>
                              <a
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ChevronArrowSpan className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
                                  <span className="font-semibold">
                                    Learn More
                                  </span>
                                </ChevronArrowSpan>
                              </a>
                            </div>
                          )
                        )}
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
    <SectionCard id="thank-you" title="Thanks For Visiting" description="Made with *heart* by your GDSC Team" />
  );
}

export default async function Index() {
  return (
    <>
      <Header />
      <main className="flex flex-col p-4 gap-y-2">
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