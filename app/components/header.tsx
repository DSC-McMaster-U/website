import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/icon.svg";
import { SiDiscord, SiInstagram, SiLinkedin } from "react-icons/si";
import { FiCalendar, FiChevronDown, FiStar } from "react-icons/fi";

interface NavLinkProps {
    name: string;
    links?: { href: string; label: string; description: string; icon: JSX.Element }[];
    href?: string;
}

const NavLink = ({ name, links, href }: NavLinkProps) => {
    return (
        <li className="relative cursor-default group text-google-black dark:text-white group-hover:text-google-grey">
            {href ? (
                <Link href={href} className="flex items-center transition-colors duration-200 gap-x-1 px-3 py-1 rounded-full group-hover:text-google-grey">
                    {name}
                    {links && (
                        <FiChevronDown className="w-4 h-4 transition-transform duration-200 transform group-hover:rotate-180" />
                    )}
                </Link>
            ) : (
                <span className="flex items-center transition-colors duration-200 gap-x-1 px-3 py-1 rounded-full group-hover:text-google-grey">
                    {name}
                    {links && (
                        <FiChevronDown className="w-4 h-4 transition-transform duration-200 transform group-hover:rotate-180" />
                    )}
                </span>
            )}
            {links && (
                <div id="dropdown" className="shadow absolute left-0 hidden group-open:block group-hover:block p-4 rounded-lg">
                    <ul className="flex flex-col gap-y-4">
                        {links.map((link, index) => (
                            <li key={index} className="flex items-center">
                                <Link
                                    href={link.href}
                                    className="block whitespace-nowrap w-full text-google-grey hover:text-google-black dark:hover:text-white transition-colors duration-200"
                                >
                                    <div className="flex flex-row items-center gap-x-2">
                                        {link.icon}
                                        <div className="flex flex-col">
                                            <span className="text-base text-google-black dark:text-white">{link.label}</span>
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
        <header className="flex flex-row justify-between fixed z-50 bg-white dark:bg-google-black w-full p-4">
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
            <div className="hidden lg:flex flex-row items-center space-x-4">
                <SiDiscord className="cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200" />
                <SiInstagram className="cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200" />
                <SiLinkedin className="cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200" />
            </div>
            <nav className="flex lg:hidden flex-row">
                {/* hamburger menu navigation */}
            </nav>
        </header>
    );
};

export default Header;
