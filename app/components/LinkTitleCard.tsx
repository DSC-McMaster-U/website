import Link from "next/link";
import { ChevronArrowSpan } from "@/app/components/ChevronArrow";
import { ReactNode } from "react";

interface LinkTitleCardProps {
    title: React.ReactNode;
    link: string;
    children: React.ReactNode;
    image?: React.ReactNode; 
}

const LinkTitleCard = ({ title, link, children, image }: LinkTitleCardProps) => {
    return (
        <Link 
            href={link} 
            key={link}
            className="button-arrow group flex flex-col relative w-full h-96 md:h-[22rem] bg-google-lightGrey dark:bg-google-grey p-1 dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg border dark:border-google-black border-b-google-lightGrey transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-2"
        >
            {image && (
                <div className="relative h-[32rem] md:h-[32rem] overflow-hidden rounded-md transition-all duration-200 ease-in-out group-hover:scale-105 bg-google-lightGrey dark:bg-google-black">
                    {image}
                </div>
            )}
            <div className="p-2">
                <h5>{title}</h5>
            </div>
            <div className="p-2 gap-y-2 flex flex-col justify-between h-full text-sm text-gray-700 dark:text-gray-300 transition-transform duration-300 ease-in-out transform translate-y-0 group-hover:-translate-y-2">
                {children}
                <ChevronArrowSpan>Read now</ChevronArrowSpan>
            </div>
        </Link>
    );
}

export default LinkTitleCard;
