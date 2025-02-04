"use client";
import React, { useEffect, useState } from 'react'
import Header from "@/app/components/Header";
import Image from 'next/image'


const eventsPage = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEvents = async () => {
        try {
            const res = await fetch('/api/scrapeEvents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setPastEvents(data["past_events"]);
            setUpcomingEvents(data["upcoming_events"]);
            setLoading(false);
            console.log(data["past_events"]);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        getEvents();
    }, []);

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
                    {upcomingEvents ? upcomingEvents.map((upcomingEvent, index) => {
                        return (
                            <li key={index}>hi</li>
                        );

                    }) : (loading ? <p>Loading...</p> : <p>No upcoming events</p>)}
                </ul>
                

            </div>
            <div className="mx-auto">
                <h2>Past Events</h2>
                <ul>
                    {pastEvents ? pastEvents.map((pastEvent, index) => {
                        return (
                            <li key={index}>
                                <Image src={pastEvent.picture}
                                    width={200}
                                    height={200}
                                    alt="Event Image"
                                    className="w-auto h-auto"
                                />
                                <p>{pastEvent.start_date}</p>
                                <a><p>{pastEvent.title}</p></a>
                                <p>{pastEvent.chapter_title}</p>
                            </li>
                        );
                    }) : (loading ? <p>Loading...</p> : <p>No past events</p>)}

                </ul>
            </div>
        </main>
      
    </>
  )
}

export default eventsPage
