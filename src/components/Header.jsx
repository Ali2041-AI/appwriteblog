import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import LogoutBtn from "./LogoutBtn";

function Header() {
    const userLogInStatus = useSelector((state) => state.auth.logInStatus);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Handle scroll to add effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { item: 'Home', slug: '/', active: true },
        { item: 'Login', slug: '/login', active: !userLogInStatus },
        { item: 'SignUp', slug: '/signup', active: !userLogInStatus },
        { item: 'Add Post', slug: '/add-post', active: userLogInStatus },
    ];

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300  bg-gradient-to-r from-indigo-600 to-purple-500
            ${isScrolled ? 'bg-gradient-to-r from-indigo-600 to-purple-500 shadow-lg' : 'bg-gradient-to-r from-purple-700 to-purple-800'}
            border-b-2 border-transparent transition-all duration-300 
            ${isScrolled ? 'border-white' : 'border-transparent'} h-16`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <h1 onClick={()=>navigate('/')} className="font-bold text-white tracking-wide cursor-pointer text-lg sm:text-3xl">Blog Website</h1>
                    
                    {/* Hamburger Icon for Mobile */}
                    <button 
                        className="md:hidden focus:outline-none" 
                        onClick={toggleNav}
                        aria-label="Toggle Navigation"
                    >
                        {/* Hamburger Icon */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    {/* Navigation Items for Larger Screens */}
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            item.active ? (
                                <button
                                    key={item.item}
                                    onClick={() => navigate(item.slug)}
                                    className={`text-white px-4 py-2 font-medium rounded-lg transition-all duration-300 
                                    hover:bg-yellow-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-yellow-300`}
                                >
                                    {item.item}
                                </button>
                            ) : null
                        ))}
                        {userLogInStatus && <LogoutBtn />}
                    </nav>
                </div>
            </div>

            {/* Full-Screen Overlay Menu for Mobile */}
            <div className={`fixed inset-0 bg-black bg-opacity-80 transition-transform duration-300 ${isNavOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className={`fixed top-0 right-0 h-full w-1/2 bg-white transition-transform duration-300 transform ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col items-start justify-center h-full p-6">
                        <button 
                            className="absolute top-4 right-4 text-black" 
                            onClick={toggleNav}
                            aria-label="Close Navigation"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-8 w-8" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="flex flex-col space-y-6">
                            {navItems.map((item) => (
                                item.active ? (
                                    <li key={item.item}>
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                setIsNavOpen(false); // Close nav when an item is clicked
                                            }}
                                            className={`text-black text-2xl transition-transform duration-300 
                                            hover:scale-105 focus:outline-none`}
                                        >
                                            {item.item}
                                        </button>
                                    </li>
                                ) : null
                            ))}
                            {userLogInStatus && (
                                <li>
                                    <LogoutBtn closeNav={()=>setIsNavOpen(false)} />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
