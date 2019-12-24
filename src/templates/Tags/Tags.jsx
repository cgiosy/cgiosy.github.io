import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO/SEO";
import PostTag from "../../components/PostTag/PostTag";
import Layout from "../../layout";
import "./Tags.css";

const Tags = ({ pageContext }) => {
  const { tagSet } = pageContext;

  return (
    <Layout>
      <Helmet title={`Tags | ${config.siteTitle}`}></Helmet>
      <SEO />
      <div className="tags-container">
        {
          Object.keys(tagSet).map((tag) =>
            <PostTag tag={tag} key={tag} />
          )
        }
      </div>
    </Layout>
  );
}

export default Tags;
