import { SiInstagram, SiDiscord, SiLinkedin } from "react-icons/si";

export interface SocialMedia {
    href: string;
    icon: JSX.Element;
}

export const socialMedia = [
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