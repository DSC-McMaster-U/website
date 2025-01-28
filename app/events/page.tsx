import { client } from "@/sanity/lib/client";
import { Event } from "@/types/sanity";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Events | Google Developer Group on Campus | McMaster University",
    description: "Events from Google Developer Group on Campus | McMaster University",
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
    <div>
      <h1>Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Events.map((Events) => (
          <div
            key={Events.slug.current}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={`/events/${Events.slug.current}`}>
              <h2 className="text-lg font-bold">{Events.title}</h2>
              <p className="text-sm text-gray-600">{Events.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(Events._updatedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
