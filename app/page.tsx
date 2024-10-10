import { client } from "@/sanity/lib/client";
import { Sponsor } from "@/types/sanity";
import Link from "next/link";
import Ticker from "@/app/components/Ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/footer";
import { Event } from "@/types/sanity";
import AnimatedEventCard from "@/app/components/AnimatedEventCard";

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

  const sponsorImages = sponsors.map((sponsor: Sponsor) => ({
    id: sponsor._id,
    src: urlFor(sponsor.logo.asset).url(),
    alt: sponsor.name,
  }));

  return (
    <section id="sponsors" className="flex flex-col justify-center items-center w-full">
      <Ticker items={sponsorImages} />
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

  return (
    <section id="events" className="flex flex-col gap-y-8">
      <h2>Upcoming Events</h2>
      <div id="event-cards" className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8">
        { upcomingEvents.map((event: Event) => {
          return (
            <AnimatedEventCard 
              key={event._id}
              title={event.title}
              description={event.description}
              type={event.type}
              image={event.image}
              slug={event.slug}
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
