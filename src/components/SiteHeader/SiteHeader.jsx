import React from "react";
import { Link } from "gatsby";
import "./SiteHeader.css";

const SiteHeader = ({ config }) => (
  <Link to="/">
    <header className="site-header">
      <div className="site-title">
        <h1>{config.siteDomain}</h1>
        <img src="/images/fluer_white.png" />
        <h3>- {config.siteTitle} -</h3>
      </div>
    </header>
  </Link>
);

export default SiteHeader;
