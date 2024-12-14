import { SiInstagram, SiDiscord, SiLinkedin, SiGithub, SiYoutube, SiFacebook, SiX, SiGmail } from "react-icons/si";

export interface SocialMedia {
    name: string;
    href: string;
    icon: JSX.Element;
}

export const socialMedia = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/gdscmcmasteru/",
        icon: <SiInstagram className="w-full h-full min-h-6" />,
    },
    {
        name: "Discord",
        href: "https://discord.gg/gdscmcmasteru",
        icon: <SiDiscord className="w-full h-full min-h-6" />,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/gdscmcmasteru/",
        icon: <SiLinkedin className="w-full h-full min-h-6" />,
    },
    {
        name: "Github",
        href: "https://github.com/DSC-McMaster-U/", 
        icon: <SiGithub className="w-full h-full min-h-6" />
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/channel/UCyxVVPDEYRCjL0lcwoX9lzA/videos", 
        icon: <SiYoutube className="w-full h-full min-h-6" />
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/GDSCMcMasterU", 
        icon: <SiFacebook className="w-full h-full min-h-6" />
    },
    {
        name: "X",
        href: "https://twitter.com/dscmcmasteru", 
        icon: <SiX className="w-full h-full min-h-6" />
    },
    {
        name: "Gmail",
        href: "mailto:dsc.mcmaster@gmail.com",
        icon: <SiGmail className="w-full h-full min-h-6" />
    }
];