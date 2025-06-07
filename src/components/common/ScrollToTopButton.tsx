import { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show button when user scrolls down 300px
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll smoothly to top when button clicked
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-18 lg:bottom-6 right-5 bg-white/8 text-black p-3 rounded-full shadow-lg transition z-50 cursor-pointer"
            aria-label="Scroll to top"
        >
            <IoIosArrowUp className='font-bold' />
        </button>
    );
}
