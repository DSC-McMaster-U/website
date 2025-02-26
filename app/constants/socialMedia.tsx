import { SiInstagram, SiDiscord, SiLinkedin, SiGithub, SiYoutube, SiFacebook, SiGmail } from "react-icons/si";

export interface SocialMedia {
    name: string;
    href: string;
    icon: JSX.Element;
}

export const socialMedia = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/gdscmcmasteru/",
        icon: <SiLinkedin className="w-full h-full min-h-6" />,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/gdscmcmasteru/",
        icon: <SiInstagram className="w-full h-full min-h-6" />,
    },
    {
        name: "Youtube",
        href: "https://www.youtube.com/@gdscmcmasteru",
        icon: <SiYoutube className="w-full h-full min-h-6"/>
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/GDSCMcMasterU",
        icon: <SiFacebook className="w-full h-full min-h-6"/>
    },
    {
        name: "Discord",
        href: "https://discord.gg/gdscmcmasteru",
        icon: <SiDiscord className="w-full h-full min-h-6" />,
    },
    {
        name: "Github",
        href: "https://github.com/DSC-McMaster-U/", 
        icon: <SiGithub className="w-full h-full min-h-6" />
    },
    {
        name: "Outlook",
        href: "",
        icon: <SiGmail className="w-full h-full min-h-6"/>
    },
];