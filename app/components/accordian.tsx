import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordianItemProps {
    href: string;
    label: string;
    icon?: JSX.Element;
}

export const AccordianItem = ({href, label, icon}: AccordianItemProps) => {

	return (
		<Link href={href} className="block whitespace-nowrap w-full text-base text-google-black dark:text-white dark:hover:text-google-grey py-2">
			<div className="flex flex-row items-center gap-x-2">
				{icon && <>{icon}</>}
				<span className="  transition-colors duration-200 ">{label}</span>
			</div>
		</Link>
	)
}

interface AccordianProps {
	children: React.ReactNode,
	title: string
}

const Accordian = ({children, title}: AccordianProps) => {
	const [isAccordianOpen, setAccordianOpen] = useState(false);

    const handleToggle = () => {
        setAccordianOpen(!isAccordianOpen);
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className="flex w-full items-center justify-between py-2 hover:text-google-grey cursor-pointer transition-colors duration-200"
            >
                {title}
                <FiChevronDown className={`w-6 h-6 transition-transform duration-200 ${isAccordianOpen ? "rotate-180" : ""}`} />
            </button>

            {isAccordianOpen && (
                <div className="flex flex-col left-0 rounded-lg bg-white dark:bg-google-black">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordian;
