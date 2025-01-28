import { client } from '@/sanity/lib/client';
import { Event } from '@/types/sanity';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    // Fetch the event using the slug
    const event = await fetchEvent(params.slug);

    // If no event is found, return default metadata
    if (!event) {
        return {
            title: "Event | Google Developer Group on Campus | McMaster University",
            description: "Event details not found",
        };
    }

    // Use the event title for the metadata
    return {
        title: `${event.title} | Google Developer Group on Campus | McMaster University`,
        description: `Event | ${event.title}`,
    };
}

const fetchEvent = async (slug: string) => {
    const event = await client.fetch(
        `*[_type == 'event' && slug.current == $slug][0]{
        title,
        description,
        startTime,
        endTime,
        location,
        slug,
        organizer,
        contactEmail,
        image {
            asset {
            _id,
            url
            },
            alt
        },
        registrationLink,
        _updatedAt
        }`,
        { slug }
    );

    return event;
};

const EventDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const event: Event = await fetchEvent(slug);

    if (!event) {
        throw new Response("Not Found", { status: 404 });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <h2 className="text-lg text-gray-600">{event.description}</h2>
            <p className="text-xs text-gray-400">
                {new Date(event._updatedAt).toLocaleDateString()}
            </p>
            <p>{event.startTime} - {event.endTime}</p>
            <p>{event.location}</p>
            <p>{event.organizer}</p>
            <p>{event.contactEmail}</p>
        </div>
    );
};

export default EventDetailPage;
