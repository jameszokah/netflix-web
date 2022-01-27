import React from "react";
import {
  FaFacebookSquare,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div classNameName="footer">
      <section className="footer__link">
        <div className="footer__logos">
          <a href="https://facebook.com/james.zokah">
            <FaFacebookSquare color="#686868" className="footer__logo" />
          </a>
          <a href="https://instagram.com">
            <FaInstagram color="#686868" className="footer__logo" />
          </a>
          <a href="https://twitter.com/james.zokah">
            {" "}
            <FaTwitter color="#686868" className="footer__logo" />
          </a>
          <a href="https://twitter.com/james.zokah">
            <FaYoutube color="#686868" className="footer__logo" />
          </a>
        </div>
        <div className="sub-links">
          <ul>
            <li>
              <a href="#">Audio and Subtitles</a>
            </li>
            <li>
              <a href="#">Audio Description</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <p>&copy; 2021-{new Date().getFullYear()} Netflix, Inc.</p>
        <p>
          <a href="https://github.com/jameszokah" target="_blank">
            James Zokah
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
