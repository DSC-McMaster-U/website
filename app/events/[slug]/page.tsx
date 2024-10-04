import { client } from '@/sanity/lib/client';
import { Event } from '@/types/sanity';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: `${params.slug} | GDSC McMaster U`,
        description: `Event | ${params.slug}`,
    };
}

const fetchEvent = async (slug: string) => {
    const Event = await client.fetch(
        `*[_type == 'event' && slug.current == $slug][0]{
        title,
        subtitle,
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

    return Event;
};

const EventDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const Event: Event = await fetchEvent(slug);

    if (!Event) {
        throw new Response("Not Found", { status: 404 });
    }

    return (
        <div>
        <h1 className="text-2xl font-bold">{Event.title}</h1>
        <h2 className="text-lg text-gray-600">{Event.description}</h2>
        <p className="text-xs text-gray-400">
            {new Date(Event._updatedAt).toLocaleDateString()}
        </p>            
        <p>{Event.startTime} - {Event.endTime}</p>
        <p>{Event.location}</p>
        <p>{Event.organizer}</p>
        <p>{Event.contactEmail}</p>
        </div>
    );
};

export default EventDetailPage;
