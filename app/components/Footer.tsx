import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub, faDiscord, faYoutube, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-6 mt-8">
          <div className="grid grid-cols-2">
            {/* Contact Us */}
            <div className='text-left ml-12'>
              <h4 className="text-gray-600 py-2 text-lg mt-12">McMaster University</h4>
              <a className="text-gray-600 py-2 text-lg cursor-pointer hover:text-indigo-900" href='mailto:dsc.mcmaster@gmail.com'>dsc.mcmasteru@gmail.com</a> {/* Smaller font for small screens */}
            </div>
            <div className="grid grid-cols-3 gap-4 sm:text-left text-center mr-10">
              {/* Follow Us */}
              <div>
                <h4 className="font-bold mb-2">Follow Us</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faInstagram} className="mr-2 h-5 w-5" />
                    <a href="https://www.instagram.com/gdscmcmasteru/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Instagram</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faLinkedin} className="mr-2 h-5 w-5" />
                    <a href="https://www.linkedin.com/company/gdscmcmasteru/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">LinkedIn</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faGithub} className="mr-2 h-5 w-5" />
                    <a href="https://github.com/DSC-McMaster-U/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">GitHub</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                    <a href="https://discord.com/invite/gdscmcmasteru" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Discord</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faYoutube} className="mr-2 h-5 w-5" />
                    <a href="https://www.youtube.com/channel/UCyxVVPDEYRCjL0lcwoX9lzA/videos" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">YouTube</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faFacebook} className="mr-2 h-5 w-5" />
                    <a href="https://www.facebook.com/GDSCMcMasterU" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Facebook</a>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faTwitter} className="mr-2 h-5 w-5" />
                    <a href="https://twitter.com/dscmcmasteru" className="hover:underline text-gray-600">Twitter</a>
                  </li>
                </ul>
              </div>
    
              {/* Site Map */}
              <div>
                <h4 className="font-bold mb-2">Site Map</h4>
                <ul className="space-y-1">
                  <li><a href="/home" className="hover:underline text-gray-600">Home</a></li>
                  <li><a href="/events" className="hover:underline text-gray-600">Events</a></li>
                  <li><a href="/newsletter" className="hover:underline text-gray-600">Newsletter</a></li>
                </ul>
              </div>
    
              {/* Programs */}
              <div>
                <h4 className="font-bold mb-2">Programs</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline text-gray-600">Solutions Challenge</a></li>
                </ul>
              </div>
            </div>
          </div>
    
          <div className="container mx-auto text-left mt-4 ml-12">
            <p className="text-sm">&copy; {new Date().getFullYear()} | All rights reserved.</p>
          </div>
        </footer>
      )  
    }

export default Footer;