import React from 'react';
import Header from "@/app/components/Header";
import getEvents from '../lib/getEvents';
import EventsSectionCard from "@/app/components/EventsSectionCard";
import EventCard from "@/app/components/EventCard";

interface Event {
    start_date: string,
    event_type: string,
    title: string,
    description_short: string,
    picture: string,
  }

export default async function eventsPage () {
   const { past_events, upcoming_events } = await getEvents();

    return (
        <>
            <Header />
            <main>
                <div className="h-64 mt-16 flex items-center">
                    <h1 className="text-[48px] text-center max-w-[80%] mx-auto">Explore Our Events: What We’ve Done & What’s Next</h1>
                </ div>
                <EventsSectionCard title="Upcoming Events" description="" id="upcoming-events">
                    <ul className="w-full space-y-4">
                        { upcoming_events.length > 0 ? upcoming_events.map((upcomingEvent: Event, index: number) => (
                            <li key={index} className="w-full">
                                <EventCard date={upcomingEvent.start_date} event_type="" event_name={upcomingEvent.title} short_description={upcomingEvent.description_short} image={upcomingEvent.picture}/>
                            </li>
                        )
                        
                        ) : (<li>
                                <p className="text-center">No Upcoming Events... Check Back Soon!</p>
                             </li>)
                        }
                    </ul>
                </EventsSectionCard>
                <EventsSectionCard title="Past Events" description="" id="past-events">
                    <ul className="w-full space-y-4">
                        { past_events.length > 0 ? past_events.map((pastEvent: Event, index: number) => (
                            <li key={index} className="w-full">
                                <EventCard date={pastEvent.start_date} event_type="" event_name={pastEvent.title} short_description={pastEvent.description_short} image={pastEvent.picture}/>
                            </li>
                        )
                        
                        ) : (<li className="text-center">
                                <p>No Past Events.</p>
                            </li>)
                        }
                    </ul>

                </EventsSectionCard>
            </main>
        </>
    )


}
