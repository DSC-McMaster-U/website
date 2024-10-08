import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionItemProps {
    href: string;
    label: string;
    icon?: JSX.Element;
}

export const AccordionItem = ({href, label, icon}: AccordionItemProps) => {

	return (
		<Link href={href} className="block whitespace-nowrap w-full text-base dark:text-white hover:text-google-grey py-1">
			<div className="flex flex-row items-center gap-x-2">
				{icon && <>{icon}</>}
				<span className="  transition-colors duration-200 ">{label}</span>
			</div>
		</Link>
	)
}

interface AccordionProps {
	children: React.ReactNode,
	title: string
}

const Accordion = ({children, title}: AccordionProps) => {
	const [isAccordionOpen, setAccordionOpen] = useState(false);

    const handleToggle = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className="flex w-full group-hover:text-google-grey items-center justify-between py-2 cursor-pointer transition-colors duration-200"
            >
                {title}
                <FiChevronDown className={`w-6 h-6 transition-transform duration-200 ${isAccordionOpen ? "rotate-180" : ""}`} />
            </button>

            {isAccordionOpen && (
                <>
                    {children}
                </>
            )}
        </div>
    );
};

export default Accordion;
