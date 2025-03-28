import Header from "@/app/components/Header";
import getEvent from '../../lib/getEvent';
import AnimatedHero from "../../components/AnimatedHero";
import Pill from "../../components/Pill";
import { FaCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { formatDate, extractTime } from "../../lib/dateUtils";
import { FaRegClock } from "react-icons/fa6";
import SectionCard from "@/app/components/SectionCard";
import Image from 'next/image';
import Map from '@/app/components/Map';
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { ChevronArrowButton } from "@/app/components/ChevronArrow";

interface Event {
    start_date_iso: string,
    end_date_iso: string
    event_type: string,
    title: string,
    description_short: string,
    description: string,
    picture: string,
    id: number,
    total_attendees: number,
    chapter_banner: string,
    banner: string | null,
    venue_name: string,
    venue_address: string,
    venue_city: string,
    venue_zip_code: string,
    is_virtual_event: boolean,
    rsvp_only: boolean,
    url: string,
    completed: boolean,
    tags: [string],
  }

  const HeroSection = ({ title, start_date, end_date, rsvpCount }: { title: string, start_date: string, end_date: string, rsvpCount: number }) => {
    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);
    let displayDate;
    let displayTime;

    if (formattedStartDate === formattedEndDate) {
      displayDate = formattedStartDate;
      displayTime = extractTime(start_date, true).concat(" - ", extractTime(end_date, false));
    } else {
      displayDate = formattedStartDate.concat(" - ", formattedEndDate)
      displayTime = extractTime(start_date, false)
    }
    return (
        <AnimatedHero id="hero" className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
                    <h2>{title}</h2>
                    <div className="flex flex-col items-center gap-y-4 sm:flex-row justify-center sm:gap-x-6 w-full">
                      <Pill>
                        <span className="inline-flex items-center gap-2">
                          <FaCalendarAlt />{displayDate}
                        </span>
                      </Pill>
                      <Pill>
                        <span className="inline-flex items-center gap-2">
                          <FaRegClock />{displayTime}
                        </span>
                      </Pill>

                      {rsvpCount > 0 && <Pill>
                                          <span className="inline-flex items-center gap-2">
                                            <FaRegCalendarCheck/>{rsvpCount} RSVP&apos;d
                                          </span>
                                        </Pill>}
                    </div>
                </div>
            </div>
        </AnimatedHero>
    );
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { event_data }: { event_data: Event } = await getEvent(slug);
    return (
      <>
        <Header/>
        <main>
          <HeroSection title={event_data.title} start_date={event_data.start_date_iso} end_date={event_data.end_date_iso} rsvpCount={event_data.total_attendees}/>
          <SectionCard title="" description="" id={"event-details-section"}>
            <div>
              <Image width={2000} height={300} src={event_data.banner ? event_data.banner : event_data.chapter_banner} alt="Banner Image" className="w-auto h-auto rounded-lg mx-auto mb-20"></Image>
              {event_data.rsvp_only && !event_data.completed && <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00 mb-10"><Link target="_blank" href={event_data.url}><span className="font-semibold text-2xl">RSVP</span></Link></ChevronArrowButton>}
              {event_data.tags && 
                <div className="mb-10">
                  <h2 className="font-bold mb-6">Key Themes</h2>
                  <ul className="flex flex-col sm:flex-row gap-4">
                    {event_data.tags.map((theme, index) => (
                      <li key={index}>
                        <Pill>
                          <span>{theme}</span>
                        </Pill>
                      </li>
                    ))}         
                  </ul>
                </div>
              
              }
              <h2 className="font-bold mb-10">About This Event</h2>
              <div className="event-description" dangerouslySetInnerHTML={{ __html: event_data.description }} />
            </div>
          </SectionCard>
          <SectionCard title="" description="" id={"event-details-location-section"}>
            {event_data.venue_name  ? (<div className="flex flex-col sm:flex-row max-w-full justify-between items-start gap-4">
                                          <div className="flex-1 flex items-start gap-5 my-auto">
                                              <div className="p-3 bg-blue-400 text-white rounded-full"><FaLocationDot size={32} /></div>
                                              <div>
                                                <h4 className="sm:text-4xl text-2xl font-bold">Location</h4>
                                                <h5 className="sm:text-2xl text-l font-light">{event_data.venue_name}, {event_data.venue_address}, {event_data.venue_city}, {event_data.venue_zip_code}</h5>
                                              </div>
                                          </div>
                                        <div className="flex-1 min-w-[200px] mx-auto"><Map address={event_data.venue_name.concat(", ", event_data.venue_address, ", ", event_data.venue_city, ", ON")} /></div>
                                      </div>) : (event_data.is_virtual_event &&  
                                                    <div className="flex flex-row max-w-full justify-between items-start gap-4">
                                                      <div className="p-3 bg-blue-400 rounded-full"><FaLocationDot size={32} /></div>
                                                      <div>
                                                        <h4 className="sm:text-4xl text-2xl font-bold">Location</h4>
                                                        <h5 className="sm:text-2xl text-l font-light">Virtual</h5>
                                                      </div>
                                                    </div>
                                      )}
          </SectionCard>
        </main>
      </>
    );
}