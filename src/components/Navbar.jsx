import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    const searchInputRef = useRef(null);
    const profileRef = useRef(null);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const tabs = ['Home', 'Series', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchToggle = () => {
        setSearchOpen(prev => !prev);
        if (searchOpen) setSearchQuery('');
    };

    const handleSearchBlur = () => {
        if (!searchQuery) setSearchOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__left">
                <div className="navbar__logo">
                    <span className="navbar__logo-text">NetX</span>
                </div>
                <ul className="navbar__tabs">
                    {tabs.map((tab) => (
                        <li
                            key={tab}
                            className={`navbar__tab ${activeTab === tab ? 'navbar__tab--active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar__right">
                <div className={`navbar__search ${searchOpen ? 'navbar__search--open' : ''}`}>
                    <button
                        className="navbar__icon navbar__search-icon"
                        aria-label="Search"
                        onClick={handleSearchToggle}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </button>
                    {searchOpen && (
                        <input
                            ref={searchInputRef}
                            className="navbar__search-input"
                            type="text"
                            placeholder="Titles, people, genres"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onBlur={handleSearchBlur}
                        />
                    )}
                </div>
                <button className="navbar__icon navbar__bell" aria-label="Notifications">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                </button>

                {/* Profile dropdown with user name and Sign Out */}
                <div className="navbar__profile" ref={profileRef}>
                    <div
                        className="navbar__avatar"
                        onClick={() => setProfileOpen(prev => !prev)}
                        id="navbar-profile-toggle"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" />
                        <span className="navbar__caret">{profileOpen ? '▴' : '▾'}</span>
                    </div>
                    {profileOpen && (
                        <div className="navbar__dropdown">
                            <div className="navbar__dropdown-user">
                                👤 {user?.displayName || user?.email}
                            </div>
                            <hr className="navbar__dropdown-divider" />
                            <button
                                id="navbar-signout"
                                className="navbar__dropdown-signout"
                                onClick={handleLogout}
                            >
                                Sign out of NetX
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
