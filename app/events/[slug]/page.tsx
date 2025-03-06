import EventCard from "@/app/components/EventCard";
import Header from "@/app/components/Header";
import getEvent from '../../lib/getEvent';

interface Event {
    start_date: string,
    event_type: string,
    title: string,
    description_short: string,
    picture: string,
    id: number,
  }

export default async function EventPage({ params }: { params: { slug: string }}) {
    const { slug } = await params;
    const { event_data } = await getEvent(slug);
    console.log("Obtained Event Data:", event_data);
    return <p>Post: {slug}</p>
}