import { client } from "@/sanity/lib/client";
import { Sponsor } from "@/types/sanity";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Ticker from "@/app/components/Ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Event } from "@/types/sanity";
import ImageCTACard from "@/app/components/ImageCTACard";
import Image from "next/image";
import Tag from "@/app/components/Tag";
import { ChevronArrowSpan } from "@/app/components/ChevronArrow";
import { MdHandyman, MdForum, MdCode, MdGroup } from "react-icons/md";

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
      <h2>Upcoming Events</h2>
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
    <section id="newsletters">
      <h2>Latest Newsletter</h2>
      <div>
        <h3>{latestNewsletter.title}</h3>
        <p>{latestNewsletter.description}</p>
        <p>Published on: {new Date(latestNewsletter._createdAt).toLocaleDateString()}</p>
        <Link href={`/newsletters/${latestNewsletter.slug.current}`}>
          <button>Read Latest Newsletter</button>
        </Link>
        <Link href="/newsletters">
          <button>View All Newsletters</button>
        </Link>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 mt-8">
      <div className="grid grid-cols-2">
        {/* Contact Us */}
        <div className='text-left ml-12'>
          <h4 className="text-gray-600 py-2 text-lg mt-12">McMaster University</h4>
          <a className="text-gray-600 py-2 text-lg cursor-pointer hover:text-indigo-900" href='mailto:dsc.mcmaster@gmail.com'>dsc.mcmasteru@gmail.com</a> {/* Smaller font for small screens */}
        </div>
        <div className="grid grid-cols-3 gap-4 sm:text-left text-center mr-10">
          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <ul className="space-y-1">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faInstagram} className="mr-2 h-5 w-5" />
                <a href="https://www.instagram.com/gdscmcmasteru/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Instagram</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faLinkedin} className="mr-2 h-5 w-5" />
                <a href="https://www.linkedin.com/company/gdscmcmasteru/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">LinkedIn</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faGithub} className="mr-2 h-5 w-5" />
                <a href="https://github.com/DSC-McMaster-U/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">GitHub</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faYoutube} className="mr-2 h-5 w-5" />
                <a href="https://www.youtube.com/channel/UCyxVVPDEYRCjL0lcwoX9lzA/videos" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">YouTube</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faFacebook} className="mr-2 h-5 w-5" />
                <a href="https://www.facebook.com/GDSCMcMasterU" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Facebook</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faTwitter} className="mr-2 h-5 w-5" />
                <a href="https://twitter.com/dscmcmasteru" className="hover:underline text-gray-600">Twitter</a>
              </li>
            </ul>
          </div>

          {/* Site Map */}
          <div>
            <h4 className="font-bold mb-2">Site Map</h4>
            <ul className="space-y-1">
              <li><a href="/home" className="hover:underline text-gray-600">Home</a></li>
              <li><a href="/events" className="hover:underline text-gray-600">Events</a></li>
              <li><a href="/newsletter" className="hover:underline text-gray-600">Newsletter</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold mb-2">Programs</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-gray-600">Solutions Challenge</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-left mt-4 ml-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} | All rights reserved.</p>
      </div>
    </footer>
  )
}


export default async function Index() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <EventsSection />
      <NewslettersSection />
    </>
  );
}
