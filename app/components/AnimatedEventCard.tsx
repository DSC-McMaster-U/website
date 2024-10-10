import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { MdHandyman, MdForum, MdCode, MdGroup } from 'react-icons/md';
import Tag from '@/app/components/Tag';
import { ChevronArrowSpan } from '@/app/components/ChevronArrow';

interface AnimatedEventCardProps {
    image: {
        asset: {
            _id: string;
            url: string;
            altText: string;
        };
    };
    title: string;
    description: string;
    type: string;
    slug: {
        current: string;
    };
}

// Create a map for both icons and link colors
const eventTypeStyles: { [key: string]: { icon: JSX.Element, color: string } } = {
    Workshop: { icon: <MdHandyman className="w-6 h-6 text-google-green dark:text-google-lightGreen" />, color: 'text-google-green dark:text-google-lightGreen' },
    Conference: { icon: <MdForum className="w-6 h-6 text-google-blue dark:text-google-lightBlue" />, color: 'text-google-blue dark:text-google-lightBlue' },
    Hackathon: { icon: <MdCode className="w-6 h-6 text-googleRed dark:text-google-lightRed" />, color: 'text-googleRed dark:text-google-lightRed' },
    Meetup: { icon: <MdGroup className="w-6 h-6 text-google-yellow dark:text-google-lightYellow" />, color: 'text-google-yellow dark:text-google-lightYellow' },
};

const AnimatedEventCard = ({
    image,
    title,
    description,
    type,
    slug,
}: AnimatedEventCardProps) => {
    // Get the icon and color for the current event type
    const { icon, color } = eventTypeStyles[type] || { icon: null, color: 'google-blue' };

    return (
        <div className="relative group w-full h-[32rem] bg-white dark:bg-google-grey dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg p-1">
            
            {/* Graphic Section */}
            <div className="relative h-72 overflow-hidden rounded-md transition-all duration-200 ease-in-out hover-none:h-64 group-hover:h-64 bg-google-black">
                <Image
                    src={urlFor(image).url()}
                    alt={image.asset.altText || title}
                    fill
                    className="object-cover transition-opacity rounded-md duration-300"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-y-2">
                <Tag className="bg-google-lightGrey dark:bg-google-black">
                    {icon}
                    <span className="text-sm">{type}</span>
                </Tag>
                <div className="transition-transform duration-300 ease-in-out">
                    <h5>{title}</h5>
                    <p className="text-google-grey dark:text-google-lightGrey">{description}</p>
                </div>
            </div>

            {/* CTA Link Section */}
            <div className="absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 hover-none:translate-y-0">
                <Link
                    href={`/events/${slug.current}`}  
                    className={`${color} hover:text-google-black dark:hover:text-white text-lg flex items-center transition-colors duration-200 w-fit`}
                >
                    <ChevronArrowSpan>
                        Learn more
                    </ChevronArrowSpan>
                </Link>
            </div>
        </div>
    );
}

export default AnimatedEventCard;
