import EventCard from "@/app/components/EventCard";
import Header from "@/app/components/Header";
import getEvent from '../../lib/getEvent';
import AnimatedHero from "../../components/AnimatedHero";
import Pill from "../../components/Pill";
import { FaCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { formatDate, extractTime } from "../../lib/dateUtils";
import { FaRegClock } from "react-icons/fa6";
import SectionCard from "@/app/components/SectionCard";
import Image from 'next/image';

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
        <AnimatedHero id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
                    <h2>{title}</h2>
                    <div className="flex flex-row justify-between w-[70%]">
                      <Pill><FaCalendarAlt />{displayDate}</Pill>
                      <Pill><FaRegClock/>{displayTime}</Pill>
                      {rsvpCount > 0 && <Pill><FaRegCalendarCheck/>{rsvpCount} RSVP'd</Pill>}
                    </div>
                </div>
            </div>
        </AnimatedHero>
    );
}

export default async function EventPage({ params }: { params: { slug: string }}) {
    const { slug } = await params;
    const { event_data } = await getEvent(slug);
    console.log("Obtained Event Data:", event_data);
    return (
      <>
        <Header/>
        <main>
          <HeroSection title={event_data.title} start_date={event_data.start_date_iso} end_date={event_data.end_date_iso} rsvpCount={event_data.total_attendees}/>
          <SectionCard title="" description="" id={"event-details-section"}>
            <div>
              <Image width={2000} height={300} src={event_data.banner ? event_data.banner : event_data.chapter_banner} alt="Banner Image" className="w-auto h-auto rounded-lg mx-auto mb-20"></Image>
              <h4 className="mb-10">Location: {event_data.venue_name}, {event_data.venue_address}, {event_data.venue_city}, {event_data.venue_zip_code}</h4>
              <div dangerouslySetInnerHTML={{ __html: event_data.description }} />
            </div>
          </SectionCard>
        </main>

      
      </>
    );
}