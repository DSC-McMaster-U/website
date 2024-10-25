import Link from "next/link";
import { ChevronArrowSpan } from "@/app/components/ChevronArrow";
import { ReactNode } from "react";

interface LinkTitleCardProps {
    title: string;
    link: string;
    children: ReactNode;
}

const LinkTitleCard = ({ title, link, children }: LinkTitleCardProps) => {
    return (
        <Link 
            href={link} 
            key={link}
            className="button-arrow group flex flex-col relative group w-full bg-white dark:bg-google-grey p-1 dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg border dark:border-google-black border-b-google-lightGrey transition-all duration-200 hover:shadow-2xl"
        >
            <div className="bg-google-lightGrey dark:bg-google-black p-4">
                <h5>{title}</h5>
            </div>
            <div className="p-4 gap-y-4 flex flex-col justify-between h-full">
                {children}
                <ChevronArrowSpan>Read now</ChevronArrowSpan>
            </div>
        </Link>
    );
}

export default LinkTitleCard;
