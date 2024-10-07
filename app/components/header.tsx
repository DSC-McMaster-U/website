import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/icon.svg";
import { SiDiscord, SiInstagram, SiLinkedin } from "react-icons/si";
import { FiCalendar, FiChevronDown, FiStar } from "react-icons/fi";

// Updated interface to include icon and description
interface NavLinkProps {
    name: string;
    links?: { href: string; label: string; description: string; icon: JSX.Element }[]; // Add icon and description here
    href?: string;
}

const NavLink = ({ name, links, href }: NavLinkProps) => {
    return (
        <li className="relative group">
            {href ? (
                <Link href={href} className="flex items-center cursor-pointer transition-colors duration-200 gap-x-1 dark:text-google-grey dark:group-hover:text-white dark:group-hover:bg-google-grey px-3 py-1 rounded-full">
                    {name}
                    {links && (
                        <FiChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 transform group-hover:rotate-180" />
                    )}
                </Link>
            ) : (
                <span className="flex items-center cursor-pointer transition-colors duration-200 gap-x-1 dark:text-google-grey dark:group-hover:text-white dark:group-hover:bg-google-grey px-3 py-1 rounded-full">
                    {name}
                    {links && (
                        <FiChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 transform group-hover:rotate-180" />
                    )}
                </span>
            )}
            {links && (
                <div className="absolute left-0 hidden group-hover:block p-4 dark:bg-google-black rounded-lg border dark:border-google-grey">
                    <ul className="flex flex-col gap-y-4">
                        {links.map((link, index) => (
                            <li key={index} className="flex items-center">
                                <Link
                                    href={link.href}
                                    className="block whitespace-nowrap w-full dark:text-google-grey dark:hover:text-white transition-colors duration-200"
                                >
                                    <div className="flex flex-row items-center gap-x-2">
                                        {link.icon}
                                        <div className="flex flex-col">
                                            <span className="text-base dark:text-white">{link.label}</span>
                                            <span className="text-xs">{link.description}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

const Header = () => {
    const navLinks = [
        { 
            name: "Events", 
            links: [
                { 
                    href: "/events", 
                    label: "All Events", 
                    description: "Workshops, socials, and more", 
                    icon: <FiCalendar />
                },
                { 
                    href: "https://solutionchallenge.gdscmcmasteru.ca/", 
                    label: "Solution Challenge", 
                    description: "Test your skills", 
                    icon: <FiStar />
                }
            ] 
        },
        { 
            name: "Newsletters", 
            href: "/newsletters",
        },
    ];

    return (
        <header className="flex flex-row justify-between fixed z-50 bg-google-black w-full p-4">
            <div className="flex flex-row items-center h-full gap-x-8">
                <Link href="/">
                    <Image
                        src={Icon}
                        alt={"Icon"}
                        width={50}
                        height={50}
                    />
                </Link>
                <nav className="lg:flex hidden flex-row text-base">
                    <ul className="flex flex-row">
                        {navLinks.map((navLink, index) => (
                            <NavLink key={index} name={navLink.name} links={navLink.links} href={navLink.href} />
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex flex-row items-center space-x-4">
                <SiDiscord className="cursor-pointer text-google-grey hover:text-white transition-colors duration-200" />
                <SiInstagram className="cursor-pointer text-google-grey hover:text-white transition-colors duration-200" />
                <SiLinkedin className="cursor-pointer text-google-grey hover:text-white transition-colors duration-200" />
            </div>
            <nav className="flex lg:hidden flex-row">
                {/* hamburger menu navigation */}
            </nav>
        </header>
    );
};

export default Header;
