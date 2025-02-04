import React from 'react'
import Header from "@/app/components/Header";
import Image from 'next/image'


async function getEvents () {
    const pastEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Completed";
    const upcomingEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Live";
    try {
        // Fetch the past events data from the GDG event page in parallel with the upcoming events data
        const [pastResponse, upcomingResponse] = await Promise.all([
            fetch(pastEventsUrl),
            fetch(upcomingEventsUrl),
        ]);

        if (!pastResponse.ok || !upcomingResponse.ok) {
            throw new Error("Failed to fetch event data");
        }

        const pastData = await pastResponse.json();
        const upcomingData = await upcomingResponse.json();

        const pastEvents = pastData.results;
        const upcomingEvents = upcomingData.results;


        // Return the past and upcoming events data
        return { "past_events": pastEvents, "upcoming_events": upcomingEvents};


    } catch (error) {
        console.error(error);
        return { "past_events": [], "upcoming_events": []};
    }
}


export default async function eventsPage () {
    const { past_events, upcoming_events } = await getEvents(); 

  return (
    <>
        <Header />
        <main className="mt-20">
            <div className="mx-auto">
                <h1>Events</h1>
            </div>
            <div className="mx-auto">
                <h2>Upcoming Events</h2>
                <ul>
                    {upcoming_events.length > 0 ? (
                        upcoming_events.map((upcomingEvent: {picture: string, start_date: string, title: string, chapter_title: string}, index: number) => (
                            <li key={index}></li>
                        ))
                    ) : (
                        <p>No upcoming events</p>
                    )}

                </ul>
                

            </div>
            <div className="mx-auto">
                <h2>Past Events</h2>
                <ul>
                    {past_events ? past_events.map((pastEvent: {picture: string, start_date: string, title: string, chapter_title: string }, index: number) => {
                        return (
                            <li key={index}>
                                <Image src={pastEvent.picture}
                                    width={200}
                                    height={200}
                                    alt="Past Event Image"
                                    className="w-auto h-auto"
                                />
                                <p>{pastEvent.start_date}</p>
                                <a><p>{pastEvent.title}</p></a>
                                <p>{pastEvent.chapter_title}</p>
                            </li>
                        );
                    }) : <p>No past events</p>}

                </ul>
            </div>
        </main>
      
    </>
  )
}
