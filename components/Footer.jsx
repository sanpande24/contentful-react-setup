import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

const Footer = ({ footer }) => {
  
  return (
    <footer>
        <div class="footer">
            <div class="footer-column">
                <h3>Company</h3>
                <ul>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Leadership</a></li>
                    <li><a href="#">ESG</a></li>
                    <li><a href="#">Locations</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Products</h3>
                <ul>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Our Solutions</a></li>
                    <li><a href="#">Our Processes</a></li>
                    <li><a href="#">Our Products</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Customer Support</h3>
                <ul>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Technical Training</a></li>
                    <li><a href="#">MyLam</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Careers</h3>
                <ul>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Our Culture</a></li>
                    <li><a href="#">Benefits</a></li>
                    <li><a href="#">Search Jobs</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Investors</h3>
                <ul>
                    <li><a href="#">Overview</a></li>
                    <li><a href="#">Events & Presentations</a></li>
                    <li><a href="#">Financials</a></li>
                    <li><a href="#">Stock Information</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Newsroom</h3>
                <ul>
                    <li><a href="#">Newsroom Home</a></li>
                    <li><a href="#">Press Releases</a></li>
                    <li><a href="#">Media Center</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Media Contacts</a></li>
                </ul>
            </div>
        </div>

    </footer>
  );
};

export default Footer;
