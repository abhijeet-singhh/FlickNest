import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { APP_TITLE } from "../../utils/constants";

const linkClass = "hover:text-violet-400 hover:-translate-y-1 transition-all duration-300"

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#191826] text-gray-300 pt-3 sm:pt-12 mb-5 sm:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center sm:text-left mb-4 sm:mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 sm:mb-4">🎬 {APP_TITLE}</h2>
            <p className="text-sm text-violet-400 max-w-xs mx-auto sm:mx-0">
              Your backstage pass to movies —<br /> all the movie magic before the show.
            </p>
          </div>

          {/* Browse */}
          <div className="hidden sm:block pl-20">
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/explore/movies" className="hover:text-violet-400">Movies</a></li>
              <li><a href="/explore/tvshows" className="hover:text-violet-400">TV Shows</a></li>
              <li><a href="/new" className="hover:text-violet-400">New Releases</a></li>
              <li><a href="/explore/trending" className="hover:text-violet-400">Trending</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="hidden sm:block pl-12">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-violet-400">Watchlist</a></li>
              <li><a href="#" className="hover:text-violet-400">Reviews</a></li>
              <li><a href="#" className="hover:text-violet-400">Blog</a></li>
              <li><a href="#" className="hover:text-violet-400">Community</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-2 sm:mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4 text-xl">
              <a href="https://x.com/abhijeet_tw" target="_blank" rel="noopener noreferrer" aria-label="X" className={linkClass}><FaXTwitter /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={linkClass}><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={linkClass}><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-3 sm:pt-6">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved. <br />
            <span className="text-gray-500 text-[10px] opacity-60 hidden sm:inline-block">
              Developed by Abhijeet Singh
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
