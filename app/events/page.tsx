import { client } from "@/sanity/lib/client";
import { Event } from "@/types/sanity";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LinkTitleCard from "@/app/components/LinkTitleCard";
import { urlFor } from "@/sanity/lib/image";  
import Image from "next/image"; 
import { MdHandyman, MdForum, MdCode, MdGroup, MdArticle, MdCalendarToday, MdLightbulb } from "react-icons/md";

export const metadata: Metadata = {
    title: "Events | GDSC McMaster U",
    description: "Events from GDSC McMaster U",
};

const fetchEvents = async () => {
  const Events = await client.fetch(
    `*[_type == 'event']{
            title,
            subtitle,
            type,
            image,
            slug,
            body,
            description,
            _updatedAt
        }`
  );
  return Events;
};

const eventTypeStyles: { [key: string]: { icon: JSX.Element, color: string } } = {
  Workshop: { icon: <MdHandyman className="w-6 h-6 text-google-green dark:text-google-lightGreen" />, color: 'text-google-green dark:text-google-lightGreen' },
  Conference: { icon: <MdForum className="w-6 h-6 text-google-blue dark:text-google-lightBlue" />, color: 'text-google-blue dark:text-google-lightBlue' },
  Hackathon: { icon: <MdCode className="w-6 h-6 text-googleRed dark:text-google-lightRed" />, color: 'text-googleRed dark:text-google-lightRed' },
  Meetup: { icon: <MdGroup className="w-6 h-6 text-google-yellow dark:text-google-lightYellow" />, color: 'text-google-yellow dark:text-google-lightYellow' },
};

const EventsPage = async () => {
  const Events: Event[] = await fetchEvents();

  return (
    <>
      <Header />
      <main>
        <section id="Events" className="flex flex-col gap-y-4">
          <h2>Events</h2>
          <p>Through GDSC McMaster University&apos;s events, stay updated on the latest tech news, events, and innovations. Featuring industry trends, club highlights, and upcoming activities, the events connect members to valuable insights and opportunities in the tech world.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-10">
            {Events.map((event) => {
              const { icon, color } = eventTypeStyles[event.type] || { icon: null, color: 'text-google-blue' };
              return (
                <LinkTitleCard
                  key={event.slug.current}
                  title={
                    <div className="flex items-center gap-x-2">
                      {icon}
                      <h5>{event.title}</h5>
                    </div>
                  }
                  link={`/events/${event.slug.current}`}
                  image={
                    <Image
                      src={urlFor(event.image).url()}
                      alt={event.image?.asset?.altText || event.title}
                      fill 
                      className="object-cover transition-opacity rounded-md duration-300"
                    />
                  }
                >
                  <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                </LinkTitleCard>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EventsPage;
