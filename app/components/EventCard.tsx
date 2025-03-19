import Image from 'next/image';
import { ChevronArrowButton } from "./ChevronArrow";
import Link from "next/link";
import { formatDate } from '../lib/dateUtils';

interface EventCardProps {
    date: string,
    event_type: string,
    event_name: string,
    event_url: string,
    short_description: string,
    image: string,
}

function generateSlug(url: string) {
    const basepath = "https://gdg.community.dev/events/details/";
    const slug = url.replace(basepath, "");
    return slug;
}

const EventCard = ({date, event_type, event_name, event_url, short_description, image}: EventCardProps) => {
    const slug = generateSlug(event_url);
    return (
        <div className="bg-white-02 dark:bg-black-02 flex flex-col md:flex-row w-full p-9 rounded-lg mt-[0.5rem]">
            <div className="flex items-center flex-shrink-0 p-8 md:ml-4 mx-auto">
                <Image src={image}
                width={190}
                height={190}
                alt="Past Event Image"
                className="w-auto h-auto m-auto rounded-full"
                />

            </div>
            <div className="md:ml-4 w-full flex-grow py-4">
                <div className="flex flex-row">
                    <h4 className="mr-8 text-[20px]">{formatDate(date)}</h4>
                    <h4 className="text-[18px] font-light">{event_type}</h4>
                </div>
                <h2 className="mt-5">{event_name}</h2>
                <p className="mt-4 mb-8 text-[18px] max-w-full break-words">{short_description}</p>
                <Link rel="noreferrer" href={`/events/${slug}`}>
                    <ChevronArrowButton className="dark:bg-white-00 bg-black-00 dark:text-black-00 text-white-00 border-2 dark:border-black-00 border-white-00">
                        <span className="font-semibold">View Details</span>
                    </ChevronArrowButton>
                </Link>
            </div>

        </div>
    );
}

export default EventCard;