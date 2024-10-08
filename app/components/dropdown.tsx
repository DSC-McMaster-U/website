import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropdownItemProps {
    href: string;
    label: string;
    icon?: JSX.Element;
    description?: string;
}

export const DropdownItem = ({ href, label, icon, description }: DropdownItemProps) => {
    return (
        <Link href={href} className="block whitespace-nowrap w-full text-google-grey hover:text-google-black dark:hover:text-white transition-colors duration-200">
            <div className="flex flex-row items-center gap-x-2">
                {icon && <>{icon}</>}
                <div className="flex flex-col">
                    <span className="text-base text-google-black dark:text-white">{label}</span>
                    {description && <span className="text-xs">{description}</span>}
                </div>
            </div>
        </Link>
    );
};

interface DropdownProps {
    name: string;
    children: React.ReactNode;
}

const Dropdown = ({ name, children }: DropdownProps) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                onClick={handleToggle}
                className="flex items-center gap-x-1 px-3 py-1 rounded-full group group-hover:text-google-grey cursor-pointer transition-colors duration-200"
            >
                {name}
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
                <div className="shadow absolute left-0 p-4 rounded-lg bg-white dark:bg-google-black">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
