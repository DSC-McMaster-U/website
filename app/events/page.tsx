import React from 'react';
import Header from "@/app/components/Header";
import Image from 'next/image';
import getEvents from '../lib/getEvents';
import SectionCard from "@/app/components/SectionCard";

interface Event {
    picture: string;
    start_date: string;
    title: string;
    chapter_title: string;
    description_short?: string; // Optional for past events
  }

export default async function eventsPage () {
    // const { past_events, upcoming_events } = await getEvents(); 
    const past_events: Event[] = [];
    const upcoming_events: Event[] = [];

//   return (
//     <>
//         <Header />
//         <main className="mt-20">
//             <div className="mx-auto">
//                 <h1>Events</h1>
//             </div>
//             <div className="mx-auto">
//                 <h2>Upcoming Events</h2>
//                 <ul>
//                     {upcoming_events.length > 0 ? (
//                         upcoming_events.map((upcomingEvent: {picture: string, start_date: string, title: string, chapter_title: string, description_short: string}, index: number) => (
//                             <li key={index} >
//                                 <div className="items-center">
//                                     <Image src={upcomingEvent.picture}
//                                         width={200}
//                                         height={200}
//                                         alt="Past Event Image"
//                                         className="w-auto h-auto m-auto"
//                                     />
//                                     <p className="text-center">{upcomingEvent.start_date}</p>
//                                     <a><p className="text-center">{upcomingEvent.title}</p></a>
//                                     <p className="text-center">{upcomingEvent.chapter_title}</p>
//                                     <p className="text-center">{upcomingEvent.description_short}</p>
//                                     <p></p>

//                                 </div>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No upcoming events</p>
//                     )}

//                 </ul>
                

//             </div>
//             <div className="mx-auto">
//                 <h2>Past Events</h2>
//                 <ul>
//                     {past_events ? past_events.map((pastEvent: {picture: string, start_date: string, title: string, chapter_title: string }, index: number) => {
//                         return (
//                             <li key={index}>
//                                 <Image src={pastEvent.picture}
//                                     width={200}
//                                     height={200}
//                                     alt="Past Event Image"
//                                     className="w-auto h-auto"
//                                 />
//                                 <p>{pastEvent.start_date}</p>
//                                 <a><p>{pastEvent.title}</p></a>
//                                 <p>{pastEvent.chapter_title}</p>
//                             </li>
//                         );
//                     }) : <p>No past events</p>}

//                 </ul>
//             </div>
//         </main>
      
//     </>
//   )
    return (
        <>
            <Header />
            <main>
                <div className="h-60 mt-40 items-center">
                    <h1 className="text-[48px] text-center max-w-[80%] mx-auto">Explore Our Events: What We’ve Done & What’s Next</h1>
                </ div>
                <SectionCard title={"Upcoming Events"} description={""} id="upcoming-events">
                    <ul>
                        { upcoming_events.length > 0 ? upcoming_events.map((upcomingEvent: Event, index: number) => (
                            <p>hi</p> )
                        
                        ) : (<div>
                                <p>No Upcoming Events... Check Back Soon!</p>
                            </div>)
                        }
                    </ul>
                </SectionCard>
                <SectionCard title={"Past Events"} description={""} id="past-events">
                    <ul>
                        { upcoming_events.length > 0 ? upcoming_events.map((upcomingEvent: Event, index: number) => (
                            <p>hi</p> )
                        
                        ) : (<div>
                                <p>No Past Events.</p>
                            </div>)
                        }
                    </ul>

                </SectionCard>
            </main>
        </>
    )


}
