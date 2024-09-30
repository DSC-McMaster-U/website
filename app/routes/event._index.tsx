import { json, Link, useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
import { event } from "~/types/types";

export async function loader() {
    const events = await client.fetch(
        `*[_type == 'event']{
            title,
            slug,
        }`
    );

    return json({ events });
} 

const EventPage = () => {
    const { events } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>events</h1>
            {/* Grid container for events */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {events.map((event: event) => (
                    <div 
                        key={event.slug.current} 
                        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                        <Link to={`${event.slug.current}`}>
                            <h2 className="text-lg font-bold">{event.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventPage;
