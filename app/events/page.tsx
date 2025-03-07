import React from 'react';
import Header from "@/app/components/Header";
import getEvents from '../lib/getEvents';
import EventsSectionCard from "@/app/components/EventsSectionCard";
import EventCard from "@/app/components/EventCard";
import AnimatedHero from "../components/AnimatedHero";
import Pill from "../components/Pill";

interface Event {
    start_date: string,
    event_type_title: string,
    title: string,
    description_short: string,
    cropped_picture_url: string,
    url: string,
    slug: string,
  }
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Events | Google Developer Group on Campus | McMaster University",
    description: "Our events Google Developer Group on Campus | McMaster University",
};

const HeroSection = () => {
    return (
        <AnimatedHero id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
                    <Pill>Our Events</Pill>
                    <h2>Explore a variety of exciting upcoming events and past highlights</h2>
                </div>
            </div>
        </AnimatedHero>
    );
}

export default async function eventsPage () {
   const { past_events, upcoming_events } = await getEvents();

    return (
        <>
            <Header />
            <main>
                <HeroSection/>
                <EventsSectionCard title="Upcoming Events" description="" id="upcoming-events">
                    <ul className="w-full space-y-4">
                        { upcoming_events.length > 0 ? upcoming_events.map((upcomingEvent: Event, index: number) => (
                            <li key={index} className="w-full">
                                <EventCard date={upcomingEvent.start_date} event_type={upcomingEvent.event_type_title} event_name={upcomingEvent.title} event_url={upcomingEvent.url} short_description={upcomingEvent.description_short} image={upcomingEvent.cropped_picture_url}/>
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
                                <EventCard date={pastEvent.start_date} event_type={pastEvent.event_type_title} event_name={pastEvent.title} event_url={pastEvent.url} short_description={pastEvent.description_short} image={pastEvent.cropped_picture_url}/>
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
