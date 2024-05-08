import React from 'react';
import './css/Footer.css'
import { FaPhoneAlt, FaEnvelope, FaSearchLocation, FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaPinterestP, FaVimeoV, FaPaperPlane  } from "react-icons/fa";
import logoLight from "/images/logoLight.png";
import americanExpress from "/images/American-Express-logo.png";
import discover from "/images/Discover-logo.png";
import masterCard from "/images/master-card-logo.jpg";
import payPal from "/images/pay-pal-logo.png";
import visa from "/images/visa-logo.png";

function Footer() {
    return (
        <>
        <footer>
            <div className="container">
                <div className="footer-section">
                    <div className="main-footer">
                        <div className="first-part">
                            <div className="title picture"><img src={logoLight} alt="Logo Light" /></div>
                            <div className="writing"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna lacus porta, augue eget sagittis.</p></div>
                            <div className="contact">
                                <div className="contact-part"><FaPhoneAlt className="react-icons react-phone" /><a href="tel:+994507431951">(+994)-50-743-1951</a></div>
                                <div className="contact-part"><FaSearchLocation className="react-icons react-envelope" /><a href="#">Azerbaijan, Baku</a></div>
                                <div className="contact-part"><FaEnvelope className="react-icons react-envelope" /><a href="mailto:fuadeb@code.edu.az">fuadeb@code.edu.az</a></div>
                            </div>
                        </div>

                        <div className="second-part">
                            <div className="title"><p>Latest Posts</p></div>
                            <div className="writing">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam augue eget sagittis.</p>
                                <span>April 21, 2024</span>
                            </div>
                            <div className="writing">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna lacus porta.</p>
                                <span>May 7, 2024</span>
                            </div>
                        </div>

                        <div className="third-part">
                            <div className="title"><p>Information</p></div>
                            <div className="writing">
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">All Collections</a></li>
                                    <li><a href="#">Fashion</a></li>
                                    <li><a href="#">Privacy policy Us</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="forth-part">
                            <div className="title"><p>Subscribe now</p></div>
                            <div className="writing"><p>Subscribe our newsletter get 10% off your first update.</p></div>
                            <div className="input">
                                <input type="text" name="" className='footer-input' placeholder='Email Address' />
                                <div className="footer-input-icon"><FaPaperPlane  className="react-icons react-paperPlane" /></div>
                            </div>
                            <div className="logs">
                                <div className="icons"><a href=""><FaFacebookF className="react-icons react-facebook" /></a></div>
                                <div className="icons"><a href=""><FaTwitter className="react-icons react-twitter" /></a></div>
                                <div className="icons"><a href=""><FaInstagram  className="react-icons react-instagram" /></a></div>
                                <div className="icons"><a href=""><FaLinkedinIn className="react-icons react-linkEdin" /></a></div>
                                <div className="icons"><a href=""><FaPinterestP  className="react-icons react-pinterest" /></a></div>
                                <div className="icons"><a href=""><FaVimeoV  className="react-icons react-vimeo" /></a></div>
                            </div>
                        </div>

                    </div>

                    <div className="second-footer">
                            <div className="img"><img src={americanExpress} alt="American Express" /></div>
                            <div className="img"><img src={discover} alt="Discover" /></div>
                            <div className="img"><img src={masterCard} alt="Master Card" /></div>
                            <div className="img"><img src={payPal} alt="Pay Pal" /></div>
                            <div className="img"><img src={visa} alt="Visa" /></div>
                    </div><hr />
                    <div className="third-footer"><p>© 2024 <span>Copyright</span>, All Rights Reserved</p></div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer
