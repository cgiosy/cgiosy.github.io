import React from "react";
import UserLinks from "../UserLinks/UserLinks";
import "./SiteFooter.css";

const SiteFooter = ({ config }) => {
  const { copyright, siteRss } = config;
  if (!copyright) {
    return null;
  }
  return (
    <footer className="site-footer">
      <div className="notice-container">
        {copyright}
      </div>
    </footer>
  );
}

export default SiteFooter;
