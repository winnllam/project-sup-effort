import React from "react";
import footerStyles from "./Footer.module.css";
import { HashLink as Link } from "react-router-hash-link";

const Footer = () => {
  return (
    <div className={footerStyles.footer}>
      <div id={footerStyles.footerText}>Copyright Winter 2023</div>
      <Link to="/credits" id={footerStyles.credits}>
        Credits
      </Link>
    </div>
  );
};
export default Footer;
