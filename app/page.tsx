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
import { MdHandyman, MdForum, MdCode, MdGroup } from "react-icons/md";
import GradientCard from "./components/GradientCard";

const HeroSection = () => (
  <section id="hero" className="min-h-screen flex justify-center items-center text-center">
    <div id="hero-content">
      <h1>Connect, Learn, and Develop</h1>
      <p>
        Google Developer Student Club at McMaster University bridges the gap
        between theory and practice through solving real-world problems.
      </p>
      <div className="flex flex-row">
        <button>Action 1</button>
        <button>Action 2</button>
      </div>
    </div>
  </section>
);

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

  if (!latestNewsletter) {
    return <p>No newsletters available</p>;
  }

  return (
    <section id="newsletters" className="flex flex-col gap-y-8">
      <h2>Newsletters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-y-6">
          <p>
            GDSC at McMaster University&apos;s newsletter is a monthly publication
            that highlights the latest news and updates in the tech industry.
          </p>
          <p>
            Read the latest newsletter to stay up-to-date with the latest trends
            and developments in the tech industry. The newsletter is published
            to our website and sent to subscribers via email.
          </p>
          <Link href="/newsletters">
            <ChevronArrowSpan className="text-lg">
              View all newsletters
            </ChevronArrowSpan>
          </Link>
        </div>
        <div className="flex flex-shrink-0 snap-center flex-col gap-y-6 w-full h-fit p-4 bg-google-grey bg-opacity-10 shadow-lg rounded-md">
          <h4>{latestNewsletter.title}</h4>
          <p>{latestNewsletter.description}</p>
          <Link href={`/newsletters/${latestNewsletter.slug.current}`} className="w-fit">
            <ChevronArrowButton className="bg-google-black text-lg">
              Read the full story
            </ChevronArrowButton>
          </Link>
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
