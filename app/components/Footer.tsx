import { socialMedia } from '../constants/socialMedia';


const Footer = () => {
  return (
    <footer className="bg-google-lightGrey dark:bg-google-black text-google-black dark:text-google-lightGrey py-6 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
        
        {/* Contact Us */}
        <div className="sm:text-left text-center sm:col-span-1 col-span-full">  
          <h4 className="text-lg sm:text-xl font-bold text-google-black dark:text-google-lightGrey py-2">
            McMaster University
          </h4>
          <a
            className="text-base sm:text-lg text-google-grey hover:text-google-mediumBlue dark:hover:text-google-lightBlue cursor-pointer"
            href="mailto:dsc.mcmaster@gmail.com">
            dsc.mcmasteru@gmail.com
          </a>
        </div>

        {/* Follow Us / Site Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:text-left text-center">
          
          {/* Follow Us */}
          <div className="sm:text-left text-center sm:col-span-1 col-span-full">  
            <h4 className="font-bold text-google-black dark:text-google-lightGrey mb-2">Follow Us</h4>
            <ul className="space-y-1">
              {socialMedia.map((media, index) => (
                <li key={index} className="flex items-center justify-center sm:justify-start">
                  <div className="mr-2 h-5 w-5">
                    {media.icon}
                  </div>
                  <a
                    href={media.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-google-grey hover:text-google-mediumBlue dark:hover:text-google-lightBlue"
                  >
                    {media.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Map */}
          <div>
            <h4 className="font-bold text-google-black dark:text-google-lightGrey mb-2">Site Map</h4>
            <ul className="space-y-1">
              <li><a href="/home" className="hover:underline text-google-grey hover:text-google-mediumBlue">Home</a></li>
              <li><a href="/events" className="hover:underline text-google-grey hover:text-google-mediumBlue">Events</a></li>
              <li><a href="/newsletter" className="hover:underline text-google-grey hover:text-google-mediumBlue">Newsletter</a></li>
              <li><a href="/team" className="hover:underline text-google-grey hover:text-google-mediumBlue">Team</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-google-black dark:text-google-lightGrey mb-2">Programs</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-google-grey hover:text-google-mediumBlue">Solutions Challenge</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-7xl mx-auto text-left mt-4 px-4">
        <p className="text-sm text-google-grey dark:text-google-lightGrey">&copy; {new Date().getFullYear()} | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;