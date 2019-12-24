import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../layout";
import UserInfo from "../../components/UserInfo/UserInfo";
import Disqus from "../../components/Disqus/Disqus";
import PostTags from "../../components/PostTags/PostTags";
import PostTitle from "../../components/PostTitle/PostTitle";
import SEO from "../../components/SEO/SEO";
import config from "../../../data/SiteConfig";
import "./prism-default.css";
import "./Post.css";

const PostTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  return (
    <Layout>
      <Helmet title={`${post.title} | ${config.siteTitle}`}></Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO={true} />
      <div className="post-container">
        <header className="post-header">
          <Link to={slug}>
            <PostTitle path={slug}>{post.title}</PostTitle>
          </Link>
        </header>
        <article className="post-content" dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <footer className="post-footer">
          <PostTags tags={post.tags} />
          <UserInfo config={config} />
          <Disqus postNode={postNode} />
        </footer>
      </div>
    </Layout>
  );
}

export default PostTemplate;

/* eslint no-undef: "off" */
export const postQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
