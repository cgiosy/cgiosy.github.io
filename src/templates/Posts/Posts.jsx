import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO/SEO";
import Layout from "../../layout";
import PostList from "../../components/PostList/PostList";
import PostPagination from "../../components/PostPagination/PostPagination";
import "./Posts.css";

const Posts = ({ data, pageContext }) => {
  const postEdges = data.allMarkdownRemark.edges;
  const isRoot = pageContext.isRoot;

  return (
    <Layout isRoot={isRoot}>
      <Helmet title={config.siteTitle}></Helmet>
      <SEO />
      <div className="posts-container">
        <PostList postEdges={postEdges} />
        <PostPagination pageContext={pageContext} />
      </div>
    </Layout>
  );
}

export default Posts;

/* eslint no-undef: "off" */
export const postsQuery = graphql`
  query PostsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          html
          timeToRead
          fields {
            slug
            date
          }
          frontmatter {
            title
            tags
            cover
            date(formatString: "YYYY-MM-DD hh:mm")
          }
        }
      }
    }
  }
`;
