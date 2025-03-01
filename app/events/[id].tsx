import EventCard from "@/app/components/EventCard";
import Header from "@/app/components/Header";
interface Event {
    start_date: string,
    event_type: string,
    title: string,
    description_short: string,
    picture: string,
    id: number,
  }

export default function EventPage({ event }: { event: Event }) {
    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto p-4">
                <EventCard 
                    date={event.start_date}
                    event_type={event.event_type}
                    event_name={event.title}
                    short_description={event.description_short}
                    image={event.picture}
                    id={event.id}
                />
                <p className="mt-4 text-lg">{event.description_short}</p>
            </main>
        </>
    );
}