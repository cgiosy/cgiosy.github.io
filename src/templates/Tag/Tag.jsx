import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import PostTitle from "../../components/PostTitle/PostTitle";
import PostList from "../../components/PostList/PostList";
import config from "../../../data/SiteConfig";
import "../Posts/Posts.css";

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Helmet title={`태그: ${tag} | ${config.siteTitle}`}></Helmet>
      <div className="posts-container">
        <PostTitle style={{fontSize: "1.25em", textDecoration: "underline"}}>태그: {tag}</PostTitle>
        <PostList postEdges={postEdges} />
      </div>
    </Layout>
  );
}

export default TagTemplate;

/* eslint no-undef: "off" */
export const tagQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
