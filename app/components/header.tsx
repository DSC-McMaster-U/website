"use client"; // Ensures client-side behavior for this component

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/icon.svg";
import { SiDiscord, SiInstagram, SiLinkedin } from "react-icons/si";
import { FiCalendar, FiMenu, FiStar, FiX } from "react-icons/fi";
import Dropdown, { DropdownItem } from "./dropdown";
import Accordian, { AccordianItem } from "./accordian";

const Header = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Disables scrolling behind the popup when it's open
    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isPopupOpen]);

    const navLinks = [
        {
            name: "Events",
            links: [
                {
                    href: "/events",
                    label: "All Events",
                    description: "Workshops, socials, and more",
                    icon: <FiCalendar />,
                },
                {
                    href: "https://solutionchallenge.gdscmcmasteru.ca/",
                    label: "Solution Challenge",
                    description: "Test your skills",
                    icon: <FiStar />,
                },
            ],
        },
        {
            name: "Newsletters",
            href: "/newsletters",
        },
    ];

    const socialMedia = [
        {
            href: "https://www.instagram.com/gdscmcmasteru/",
            icon: <SiInstagram className="w-full h-full" />,
        },
        {
            href: "https://discord.gg/gdscmcmasteru",
            icon: <SiDiscord className="w-full h-full" />,
        },
        {
            href: "https://www.linkedin.com/company/gdscmcmasteru/",
            icon: <SiLinkedin className="w-full h-full" />,
        },
    ];

    return (
        <header className="flex flex-row justify-between fixed z-50 bg-white dark:bg-google-black w-full p-4">
            <div className="flex flex-row items-center h-full gap-x-8">
                <Link href="/">
                    <Image src={Icon} alt="Icon" className="h-6 w-auto" />
                </Link>
                <nav className="lg:flex hidden flex-row text-base">
                    <ul className="flex flex-row items-center justify-start">
                        {navLinks.map((navLink, index) => {
							return (
								<li key={index} className="relative cursor-default group text-google-black dark:text-white">
									{navLink.links ? (
										<Dropdown name={navLink.name}>
											<ul className="flex flex-col gap-y-4">
												{navLink.links.map((link, index) => (
													<li key={index}>
														<DropdownItem href={link.href} label={link.label} icon={link.icon} description={link.description} />
													</li>
												))}
											</ul>
										</Dropdown>
									) : (
										<Link href={navLink.href} className="flex items-center transition-colors duration-200 gap-x-1 rounded-full hover:text-google-grey cursor-pointer">
											{navLink.name}
										</Link>
									)}
								</li>
							)
						})}
                    </ul>
                </nav>
            </div>
            <div className="hidden lg:flex flex-row items-center space-x-4">
                {socialMedia.map((social, index) => (
                    <Link key={index} href={social.href} target="_blank" className="flex justify-center items-center w-6 h-6 cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200" >
                        {social.icon}
                    </Link>
                ))}
            </div>

            {/* Full-screen popup toggle */}
			<FiMenu onClick={() => setPopupOpen(true)} className="dark:text-google-grey dark:hover:text-white transition-colors duration-200 cursor-pointer lg:hidden w-6 h-6" />

            {/* Popup content */}
			{isPopupOpen && (
				<div
					className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
				>
					<div
						className="flex flex-col gap-y-8 bg-white dark:bg-google-black rounded-lg w-full min-h-screen max-h-screen overflow-auto p-4"
					>
						<div className="flex justify-between items-center">
							<Link href="/">
								<Image src={Icon} alt="Icon" className="h-6 w-auto" />
							</Link>
							<FiX onClick={() => setPopupOpen(false)} className="cursor-pointer w-6 h-6 text-google-black dark:text-white" />
						</div>
						<nav>
							<ul className="flex flex-col">
								{navLinks.map((navLink, index) => {
									const { name, links, href } = navLink;

									if (links) {
										return (
											<li key={index}>
												<Accordian key={index} title={name}>
													{links.map((link, index) => (
														<AccordianItem
															key={index}
															href={link.href}
															label={link.label}
															icon={link.icon}
														/>
													))}
												</Accordian>
											</li>
										);
									} else {
										return (
											<li key={index}>
												<span>
													{href && (
														<Link href={href} className="flex items-center transition-colors duration-200 py-1 rounded-full hover:text-google-grey cursor-pointer">
															{name}
														</Link>
													)}
												</span>
											</li>
										);
									}
								})}
							</ul>
						</nav>

						<div className="flex flex-row items-center space-x-4">
							{socialMedia.map((social, index) => (
								<Link key={index} href={social.href} target="_blank" className="flex justify-center items-center w-6 h-6 cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200" >
									{social.icon}
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
        </header>
    );
};

export default Header;
