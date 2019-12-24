import React, { Component } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookShareCount,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import "./SocialLinks.css";

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props;
    const post = postNode.frontmatter;
    const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
    const iconSize = mobile ? 36 : 48;
    const filter = count => (count > 0 ? count : "");
    const renderShareCount = count => (
      <div className="share-count">{filter(count)}</div>
    );

    return (
      <div className="social-links">
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={postNode.excerpt}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {count => renderShareCount(count)}
          </FacebookShareCount>
        </FacebookShareButton>
      </div>
    );
  }
}

export default SocialLinks;
