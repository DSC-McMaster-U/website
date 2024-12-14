import { socialMedia } from '@/app/constants/socialMedia';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/app/icon.svg';

const Footer = () => {
  const pages = [
    { name: 'Home', href: '/home' },
    { name: 'Events', href: 'https://gdg.community.dev/gdg-on-campus-mcmaster-university-hamilton-canada/' },
    { name: 'Newsletters', href: '/newsletters' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <footer>        
      <div className='w-full grid grid-cols-1 md:grid-cols-2 py-8 gap-y-8'>
        <div id='information' className='order-2 md:order-none flex flex-col justify-between gap-y-4 md:gap-y-8'>
          <div className="flex flex-col gap-y-4"> 
            <Link href="/">
              <Image src={Icon} alt="Icon" className="h-12 w-auto" />
            </Link>
            <p>
              Google Developer Student Club
              <br />
              McMaster University
            </p>
            <ul className='flex flex-row gap-x-2 items-center'>
              { socialMedia.map((media, index) => (
                <li key={index}>
                  <Link
                    href={media.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-google-yellow"
                  >
                    {media.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>&copy; {new Date().getFullYear()} | All rights reserved.</div>
        </div>
        <div id='navigation' className="order-1 md:order-none grid grid-cols-2 gap-4">
          <nav className='flex flex-col gap-2 md:gap-4'>
            <p className='font-bold'>Pages</p>
            <ul className='flex flex-col gap-1 md:gap-2'>
              {pages.map((page, index) => (
                <li key={index}>
                  <Link href={page.href} className="hover:underline hover:text-google-yellow">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex flex-col gap-2 md:gap-4'>
            <p className='font-bold'>Programs</p>
            <ul className='flex flex-col gap-1 md:gap-2'>
              <li>
                <Link href="https://mac-a-thon.gdscmcmasteru.ca/" className="hover:underline hover:text-google-yellow">Mac-a-thon</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
