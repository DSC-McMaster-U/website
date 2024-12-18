"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/app/icon.svg";
import { FiMenu, FiX, FiCalendar, FiStar } from "react-icons/fi";
import { socialMedia } from "@/app/constants/socialMedia";
import Dropdown, { DropdownItem } from "@/app/components/Dropdown";
import Accordion, { AccordionItem } from "@/app/components/Accordion";

interface DropdownMenuProps {
	name: string;
	links: { href: string; label: string; description: string; icon: JSX.Element }[];
}
  
const DropdownMenu = ({ name, links }: DropdownMenuProps) => (
	<Dropdown name={name}>
		<ul className="flex flex-col">
		{links.map((link, index) => (
			<li key={index}>
				<DropdownItem href={link.href} label={link.label} icon={link.icon} description={link.description} />
			</li>
		))}
		</ul>
	</Dropdown>
);

interface AccordionMenuProps {
	name: string;
	links: { href: string; label: string; icon: JSX.Element }[];
}
  
const AccordionMenu = ({ name, links }: AccordionMenuProps) => (
	<Accordion title={name}>
		{links.map((link, index) => (
			<AccordionItem key={index} href={link.href} label={link.label} icon={link.icon} />
		))}
	</Accordion>
);

const SocialMediaIcons = () => (
	<div className="flex flex-row items-center space-x-4">
		{socialMedia.map((social, index) => (
			<Link key={index} href={social.href} target="_blank" className="flex justify-center items-center w-6 h-6 cursor-pointer text-google-black hover:text-google-grey dark:text-white transition-colors duration-200">
				{social.icon}
			</Link>
		))}
	</div>
);

const Header = () => {
	const [isPopupOpen, setPopupOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isPopupOpen ? "hidden" : "";
	}, [isPopupOpen]);

	const navLinks = [
		{
			name: "Events",
			links: [
				{ href: "https://gdg.community.dev/gdg-on-campus-mcmaster-university-hamilton-canada/", label: "All Events", description: "Workshops, socials, and more", icon: <FiCalendar /> },
				{ href: "https://mac-a-thon.gdscmcmasteru.ca/", label: "Mac-a-thon", description: "Test your skills", icon: <FiStar /> },
			],
		},
		{ name: "Newsletters", href: "/newsletters" },
		{ name: "Team", href: "/team" },
	];

  	return (
		<div className="flex justify-center fixed z-50 bg-google-lightGrey dark:bg-google-black w-full">
			<header className="flex flex-row justify-between w-full">
				<div className="flex flex-row items-center h-full gap-x-8">
					<Link href="/">
						<Image src={Icon} alt="Icon" className="h-6 w-auto" />
					</Link>
					<nav className="lg:flex hidden flex-row text-base">
						<ul className="flex flex-row items-center justify-start">
							{navLinks.map((navLink, index) => (
								<li key={index} className="relative cursor-default group text-google-black dark:text-white">
									{navLink.links ? (
										<DropdownMenu name={navLink.name} links={navLink.links} />
									) : (
										<Link href={navLink.href} className="flex items-center transition-colors duration-200 py-1 px-3 hover:text-google-grey cursor-pointer">
											{navLink.name}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			<div className="hidden lg:flex">
				<SocialMediaIcons />
			</div>
			<button
				tabIndex={0}
				role="button"
				aria-label="Close popup"
				onClick={() => setPopupOpen(true)} 
				className="dark:text-white hover:text-google-grey transition-colors duration-200 cursor-pointer lg:hidden" 
			>
				<FiMenu className="w-6 h-6"/>
			</button>
			{isPopupOpen && (
				<div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
					<div className="flex flex-col gap-y-8 bg-google-lightGrey dark:bg-google-black rounded-lg w-full min-h-screen max-h-screen overflow-auto p-4">
						<div className="flex justify-between items-center">
							<Link href="/" onClick={() => setPopupOpen(false)}>
								<Image src={Icon} alt="Icon" className="h-6 w-auto" />
							</Link>	
							<button
								role="button"
								aria-label="Close popup"
								onClick={() => setPopupOpen(false)} 
								className="cursor-pointer text-google-black dark:text-white hover:text-google-grey transition-colors duration-200" 
							>
								<FiX className="w-6 h-6"/>
							</button>
						</div>
						<nav>
							<ul className="flex flex-col">
								{navLinks.map((navLink, index) => (
									<li key={index} className="group">
										{navLink.links ? (
											<AccordionMenu name={navLink.name} links={navLink.links} />
										) : (
										navLink.href && (
											<Link href={navLink.href} className="flex items-center transition-colors duration-200 py-1 hover:text-google-grey cursor-pointer">
												{navLink.name}
											</Link>
										)
										)}
									</li>
								))}
							</ul>
						</nav>
						<SocialMediaIcons />
					</div>
				</div>
			)}
			</header>
		</div>
  );
};

export default Header;
