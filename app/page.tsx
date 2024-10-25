import { client } from "@/sanity/lib/client";
import { Sponsor } from "@/types/sanity";
import Link from "next/link";
import Ticker from "@/app/components/Ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Event } from "@/types/sanity";
import ImageCTACard from "@/app/components/ImageCTACard";
import Image from "next/image";
import Tag from "@/app/components/Tag";
import { ChevronArrowButton, ChevronArrowSpan } from "@/app/components/ChevronArrow";
import { MdHandyman, MdForum, MdCode, MdGroup, MdArticle, MdCalendarToday, MdLightbulb } from "react-icons/md";
import newsletter from "@/assets/illustrations/newsletter.svg";
import hero from "@/assets/illustrations/hero.png";
import { socialMedia } from "./constants/socialMedia";

const HeroSection = () => {
  const joinUsHref = socialMedia.find((media) => media.name === "Discord")?.href;

  return (
    <section id="hero" className="flex md:flex-row flex-col gap-y-8 md:gap-y-0 pt-20 md:pt-28 lg:pt-40 justify-center items-center">
      <div className="md:w-2/3 flex flex-col justify-start gap-y-4" id="hero-content">
        <h1>Google Developer Student Club</h1>
        <h5>McMaster University</h5>
        <p>
          Google Developer Student Club at McMaster University bridges the gap
          between theory and practice through solving real-world problems.
        </p>
        <div className="flex flex-row gap-x-4">
          <Link href="/events">
            <ChevronArrowButton className="dark:bg-google-lightGrey bg-google-black dark:text-google-black text-google-lightGrey border-2 dark:border-google-black border-google-lightGrey">
              <span className="font-semibold">See our events</span>
            </ChevronArrowButton>
          </Link>
          { joinUsHref && (
            <Link href={joinUsHref} rel="norefferer" target="_blank">
              <ChevronArrowButton className="dark:bg-google-black bg-google-lightGrey dark:text-google-lightGrey border-2 dark:border-google-lightGrey border-google-black">
                <span className="font-semibold">Join us</span>
              </ChevronArrowButton>
            </Link>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <Image 
          src={hero}
          alt="Roundtable" 
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

const SponsorsSection = async () => {
  const sponsors = await client.fetch(
    `*[_type == 'sponsor']{
      _id,
      name,
      logo,
      website,
    }`
  );

  if (!sponsors.length) {
    return <p>No sponsors available</p>;
  }

  return (
    <section id="sponsors" className="flex flex-col justify-center items-center w-full">
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
    </section>
  );
};

const EventsSection = async () => {
  const upcomingEvents = await client.fetch(
    `*[_type == "event" && startTime > now()] | order(startTime asc){
      _id,
      title,
      image,
      slug,
      description,
      type,
      startTime,
      location
    }`
  );

  if (!upcomingEvents) {
    return <p>No upcoming events available</p>;
  }

  const eventTypeStyles: { [key: string]: { icon: JSX.Element, color: string } } = {
    Workshop: { icon: <MdHandyman className="w-6 h-6 text-google-green dark:text-google-lightGreen" />, color: 'text-google-green dark:text-google-lightGreen' },
    Conference: { icon: <MdForum className="w-6 h-6 text-google-blue dark:text-google-lightBlue" />, color: 'text-google-blue dark:text-google-lightBlue' },
    Hackathon: { icon: <MdCode className="w-6 h-6 text-googleRed dark:text-google-lightRed" />, color: 'text-googleRed dark:text-google-lightRed' },
    Meetup: { icon: <MdGroup className="w-6 h-6 text-google-yellow dark:text-google-lightYellow" />, color: 'text-google-yellow dark:text-google-lightYellow' },
};

  return (
    <section id="events" className="flex flex-col gap-y-8">
      <h2>Events</h2>
      <div id="event-cards" className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8">
        { upcomingEvents.map((event: Event) => {
          const { icon, color } = eventTypeStyles[event.type] || { icon: null, color: 'google-blue' };
          return (
            <ImageCTACard
              key={event._id}
              Image={
                <Image
                    src={urlFor(event.image).url()}
                    alt={event.image.asset.altText || event.title}
                    fill
                    className="object-cover transition-opacity rounded-md duration-300"
                />
              }
              Content={
                <>
                  <Tag className="bg-google-lightGrey dark:bg-google-black">
                    {icon}
                    <span className="text-sm">{event.type}</span>
                  </Tag><div className="transition-transform duration-300 ease-in-out">
                    <h5>{event.title}</h5>
                    <p className="text-google-grey dark:text-google-lightGrey">{event.description}</p>
                  </div>
                </>
              }
              CTA={
                <Link
                    href={`/events/${event.slug.current}`}  
                    className={`${color} hover:text-google-black dark:hover:text-white text-lg flex items-center transition-colors duration-200 w-fit`}
                >
                    <ChevronArrowSpan>
                        Learn more
                    </ChevronArrowSpan>
                </Link>
              }
            />
          )
        })
        }
      </div>
    </section>
  );
};

const NewslettersSection = async () => {
  const latestNewsletter = await client.fetch(
    `*[_type == "newsletter"] | order(_createdAt desc)[0]{
      _id,
      title,
      slug,
      description,
      _createdAt
    }`
  );

  const newsletterCount = await client.fetch(
    `count(*[_type == "newsletter"])`
  );

  if (!latestNewsletter) {
    return <p>No newsletters available</p>;
  }

  return (
      <section id="newsletters" className="flex flex-col gap-y-8">
        <h2>Newsletters</h2>
        <div className="flex flex-col md:flex-row md:gap-x-8 md:gap-y-0 gap-y-8 md:items-center">
          <h6 className="md:w-4/5 dark:text-google-lightGrey text-google-grey">Through GDSC McMaster University&apos;s monthly newsletter, stay updated on the latest tech news, events, and innovations. Featuring industry trends, club highlights, and upcoming activities, the newsletter connects members to valuable insights and opportunities in the tech world.</h6>
          <div className="md:w-1/5 flex flex-col gap-y-2">
            <h5>{newsletterCount}</h5>
            <p className="text-sm"><span className="text-google-darkGrey dark:text-google-lightGrey">Monthly newsletters</span> available to read.</p>
          </div>
        </div>
        <Link href="/newsletters" className="w-fit">
          <ChevronArrowSpan className="hover:text-google-grey duration-200 transition-colors">
            <h6 className="hover:text-google-grey duration-200 transition-colors">View all newsletters</h6>
          </ChevronArrowSpan>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <h6 className="flex flex-row items-center gap-x-1"><MdArticle/>What?</h6>
              <p>Newsletters covering the latest and greatest in all things tech!</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h6 className="flex flex-row items-center gap-x-1"><MdCalendarToday/>When?</h6>
              <p>The newsletter is delivered once at the beginning of every month.</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h6 className="flex flex-row items-center gap-x-1"><MdLightbulb/>Why?</h6>
              <p>To keep you up-to-date with the latest and greatest in the industry.</p>
            </div>
        </div>
        <div className="relative flex flex-col w-full h-auto shadow-lg rounded-md overflow-hidden">
          {/* Image with gradient overlay */}
          <div className="relative h-52">
            <Image
              src={newsletter}
              alt="Newsletter illustration"
              fill
              className="object-cover object-top"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-google-darkGrey to-transparent" />
            {/* Title/logo centered */}
            <div className="absolute inset-0 flex justify-center items-center">
              <h4 className="text-center">
                {latestNewsletter.title}
              </h4>
            </div>
          </div>
          {/* Content section */}
          <div className="bg-white dark:bg-google-darkGrey px-6 pb-8 flex flex-col gap-y-6">
            <p>{latestNewsletter.description}</p>
            <Link href={`newsletters/${latestNewsletter.slug.current}`} className="w-fit">
              <ChevronArrowButton className="bg-google-darkGrey hover:bg-google-grey transition-colors duration-200 text-google-lightGrey dark:bg-google-lightGrey dark:text-black">
                Read the newsletter
              </ChevronArrowButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default async function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SponsorsSection />
        <EventsSection />
        <NewslettersSection />
      </main>
      <Footer />
    </>
  );
}