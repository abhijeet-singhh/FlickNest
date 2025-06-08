import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { APP_TITLE } from "../../utils/constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">🎬 {APP_TITLE}</h2>
            <p className="text-sm text-violet-400 max-w-xs mx-auto sm:mx-0">
              Stream movies and shows you love — anytime, anywhere.
            </p>
          </div>

          {/* Browse */}
          <div className="pl-20">
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/movies" className="hover:text-violet-400">Movies</a></li>
              <li><a href="/series" className="hover:text-violet-400">TV Shows</a></li>
              <li><a href="/new" className="hover:text-violet-400">New Releases</a></li>
              <li><a href="/trending" className="hover:text-violet-400">Trending</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="pl-12">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/watchlist" className="hover:text-violet-400">Watchlist</a></li>
              <li><a href="/reviews" className="hover:text-violet-400">Reviews</a></li>
              <li><a href="/blog" className="hover:text-violet-400">Blog</a></li>
              <li><a href="/community" className="hover:text-violet-400">Community</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4 text-xl">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-violet-400"><FaXTwitter /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-violet-400"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-violet-400"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-violet-400"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} MovieMania. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
