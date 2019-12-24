import React from "react";
import { Link } from "gatsby";
import "./SiteLinks.css";

const SiteLinks = ({ isRoot }) => (
  <div className="site-links">
    <Link to="/about" activeClassName="site-link-selected" partiallyActive={true}>About</Link>
    {
      isRoot
      ? <Link to="/posts" className="site-link-selected">Posts</Link>
      : <Link to="/posts" activeClassName="site-link-selected" partiallyActive={true}>Posts</Link>
    }
    <Link to="/tags" activeClassName="site-link-selected" partiallyActive={true}>Tags</Link>
  </div>
);

export default SiteLinks;
