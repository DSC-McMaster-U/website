import { client } from "@/sanity/lib/client";
import { Sponsor } from "@/types/sanity";
import Link from "next/link";
import Ticker from "@/app/components/ticker";
import { urlFor } from "@/sanity/lib/image";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

// Fetching data for the homepage sections
async function fetchSponsors() {
  return await client.fetch(
    `*[_type == 'sponsor']{
      _id,
      name,
      logo,
      website,
    }`
  );
}

async function fetchLatestNewsletter() {
  return await client.fetch(
    `*[_type == "newsletter"] | order(_createdAt desc)[0]{
      _id,
      title,
      slug,
      description,
      _createdAt
    }`
  );
}

async function fetchUpcomingEvent() {
  return await client.fetch(
    `*[_type == "event" && startTime > now()] | order(startTime asc)[0]{
      _id,
      title,
      slug,
      description,
      startTime,
      location,
    }`
  );
}

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
  const sponsors = await fetchSponsors();

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

const NewslettersSection = async () => {
  const latestNewsletter = await fetchLatestNewsletter();

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

const EventsSection = async () => {
  const upcomingEvent = await fetchUpcomingEvent();

  if (!upcomingEvent) {
    return <p>No upcoming events available</p>;
  }

  return (
    <section id="events">
      <h2>Upcoming Event</h2>
      <div>
        <h3>{upcomingEvent.title}</h3>
        <p>{upcomingEvent.description}</p>
        <p>Location: {upcomingEvent.location}</p>
        <p>
          Date: {new Date(upcomingEvent.startTime).toLocaleDateString()} at {new Date(upcomingEvent.startTime).toLocaleTimeString()}
        </p>
        <Link href={`/events/${upcomingEvent.slug.current}`}>
          <button>View Event</button>
        </Link>
        <Link href="/events">
          <button>View All Events</button>
        </Link>
      </div>
    </section>
  );
};

// Main page component using Server Components
export default async function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SponsorsSection />
        <NewslettersSection />
        <EventsSection />
      </main>
      <Footer />
    </>
  );
}
