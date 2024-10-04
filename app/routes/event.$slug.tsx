import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
import { Event } from "~/types/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params; // Extract the slug from the params
  console.log(slug);

  const event = await client.fetch(
    `*[_type == 'event' && slug.current == $slug][0]{
            title,
            slug,
        }`,
    { slug }
  );

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(event);
};

export const meta: MetaFunction = ({ data }) => {
  const event = data as Event;
  return [
    { title: `${event.title} | GDSC McMaster U` },
    { name: "description", content: event.description || "Newsletter" },
  ];
};

const EventDetailPage = () => {
  const event = useLoaderData<Event>(); // Get the event data

  return (
    <div>
      <h1 className="text-2xl font-bold">{event.title}</h1>
      {/* Render the body of the event */}
    </div>
  );
};

export default EventDetailPage;
