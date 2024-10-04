import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="flex flex-col h-screen items-center justify-center"
    >
      <div id="hero-content"></div>
      <h1>Connect, Learn, and Develop</h1>
      <p>
        Google Developer Student Club at McMaster University bridges the gap
        between theory and practice through solving real-world problems.
        Testing TEsting 123
      </p>
      <div className="flex flex-row">
        <button>Action 1</button>
        <button>Action 2</button>
      </div>
    </section>
  );
};

const SponsorsSection = () => {
  const sponsors = [
    { name: "sponsor 1", image: "https://via.placeholder.com/150" },
    { name: "sponsor 2", image: "https://via.placeholder.com/150" },
    { name: "sponsor 3", image: "https://via.placeholder.com/150" },
    { name: "sponsor 4", image: "https://via.placeholder.com/150" },
    { name: "sponsor 5", image: "https://via.placeholder.com/150" },
    { name: "sponsor 6", image: "https://via.placeholder.com/150" },
    { name: "sponsor 7", image: "https://via.placeholder.com/150" },
    { name: "sponsor 8", image: "https://via.placeholder.com/150" },
    { name: "sponsor 9", image: "https://via.placeholder.com/150" },
    { name: "sponsor 10", image: "https://via.placeholder.com/150" },
    { name: "sponsor 11", image: "https://via.placeholder.com/150" },
    { name: "sponsor 12", image: "https://via.placeholder.com/150" },
  ];

  return (
    <section id="sponsors">
      <div
        id="sponsors-content"
        className="flex flex-row justify-evenly overflow-x-scroll"
      >
        {sponsors.map((sponsor, index) => (
          <img src={sponsor.image} alt={sponsor.name} key={index} />
        ))}
      </div>
    </section>
  );
};

const EventsSection = () => {
  return (
    <section id="events">
      <div id="events-content">
        <h1>Events</h1>
        <Link href="/events">Check out the upcoming events</Link>
      </div>
    </section>
  );
};

const NewslettersSection = () => {
  return (
    <section id="newsletters">
      <div id="newsletters-content">
        <h1>Newsletters</h1>
        <Link href="/newsletters">See our latest newsletters</Link>
      </div>
    </section>
  );
};

export default function Index() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <EventsSection />
      <NewslettersSection />
    </>
  );
}