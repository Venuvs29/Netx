import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="footer__inner">
            <p className="footer__contact">
                <a href="#">Questions? Contact us.</a>
            </p>
            <div className="footer__links">
                <a href="#">FAQ</a>
                <a href="#">Help Center</a>
                <a href="#">Account</a>
                <a href="#">Media Center</a>
                <a href="#">Investor Relations</a>
                <a href="#">Jobs</a>
                <a href="#">Ways to Watch</a>
                <a href="#">Terms of Use</a>
                <a href="#">Privacy</a>
                <a href="#">Cookie Preferences</a>
                <a href="#">Corporate Information</a>
                <a href="#">Contact Us</a>
                <a href="#">Speed Test</a>
                <a href="#">Legal Notices</a>
                <a href="#">Only on Netflix</a>
            </div>
            <p className="footer__copy">Netflix Clone · Built with TMDB API</p>
        </div>
    </footer>
);

export default Footer;
