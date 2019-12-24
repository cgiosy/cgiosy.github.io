import React from "react";
import Helmet from "react-helmet";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteLinks from "../components/SiteLinks/SiteLinks";
import Footer from "../components/SiteFooter/SiteFooter";
import config from "../../data/SiteConfig";
import "./index.css";

const Layout = ({ children, isRoot }) => (
  <>
  <Helmet>
    <html lang="ko" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
    <meta name="description" content={config.siteDescription} />
    <link rel="icon" type="image/png" href={config.siteLogo} />
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR|Noto+Serif+KR:500|Playfair+Display:400,700|Roboto+Mono&display=swap&subset=korean" rel="stylesheet" />
  </Helmet>
  <SiteHeader config={config} />
  <SiteLinks isRoot={isRoot} />
  <div className="layout-container">
    {children}
  </div>
  <Footer config={config} />
  </>
);

export default Layout;
