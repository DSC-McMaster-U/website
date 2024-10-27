import { client } from "@/sanity/lib/client";
import { Event } from "@/types/sanity";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LinkTitleCard from "@/app/components/LinkTitleCard";

export const metadata: Metadata = {
    title: "Events | GDSC McMaster U",
    description: "Events from GDSC McMaster U",
  };

const fetchEvents = async () => {
  const Eventss = await client.fetch(
    `*[_type == 'event']{
            title,
            subtitle,
            slug,
            body,
            _updatedAt
        }`
  );
  return Eventss;
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
            {Events.map((Events) => (
              <LinkTitleCard
                key={Events.slug.current}
                title={Events.title}
                link={`/events/${Events.slug.current}`}
              >
                <p>{Events.description}</p>
              </LinkTitleCard>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EventsPage;
