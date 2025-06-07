import { FaXTwitter } from "react-icons/fa6";
import { FaLink, FaReddit, FaFacebook } from "react-icons/fa";


// Prepare the URL and text for sharing (safely encoded for use in query params)
const shareUrl = encodeURIComponent(window.location.href);
const shareText = encodeURIComponent("Check out this awesome site!");

const PromoBadge = () => {
  return (
    <div className="flex items-center gap-4 bg-[#191826] animate-fade-in justify-start flex-wrap py-3 md:py-7 px-2 md:px-0">
      {/* Animated Avatar */}
      <div className="hidden md:block w-14 h-14 rounded-full border-2 border-violet-500 shadow-lg overflow-hidden flex-shrink-0">
        <img
          src="/assets/anya.webp"
          alt="Animated Avatar"
          className="w-full h-full object-cover opacity-95"
        />
      </div>

      {/* Text and Share Buttons Container */}
      <div className="flex items-center gap-6 text-sm text-gray-300 flex-wrap max-w-[calc(100%-80px)]">
        <p className="flex flex-col whitespace-nowrap">
          🚀 Love this site?{" "}
          <span className="text-violet-400 font-semibold">Share it with your friends!</span>
        </p>

        <div className="flex gap-4 flex-wrap">
          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer" // Security best practice to prevent reverse tabnabbing
            className="flex items-center gap-3 bg-black text-white py-[6px] px-4 rounded-full transform transition-transform duration-200 hover:-translate-y-1"
            aria-label="Share on Twitter"
          >
            <FaXTwitter size={16} />
            <span className="hidden md:block font-semibold text-[14px]">Tweet</span>
          </a>

          <a
            href={`https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#ff4d00] text-white py-[6px] px-4 rounded-full transform transition-transform duration-200 hover:-translate-y-1"
            aria-label="Share on Reddit"
          >
            <FaReddit size={18} />
            <span className="hidden md:block font-semibold text-[14px]">Share</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-400 text-white py-[6px] px-4 rounded-full transform transition-transform duration-200 hover:-translate-y-1"
            aria-label="Share on Facebook"
          >
            <FaFacebook size={18} />
            <span className="hidden md:block font-semibold text-[14px]">Share</span>
          </a>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href); // Copy current URL to clipboard
              alert("Link copied to clipboard!");
            }}
            className="flex items-center gap-3 bg-zinc-200 text-black py-[6px] px-4 rounded-full transform transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            aria-label="Copy link"
          >
            <FaLink size={18} />
            <span className="hidden md:block font-semibold text-[14px]">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBadge;