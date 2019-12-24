/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug = "/posts";
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")) {
        slug += `/${_.kebabCase(node.frontmatter.slug)}`;
      } else if (Object.prototype.hasOwnProperty.call(node.frontmatter, "title")) {
        slug += `/${_.kebabCase(node.frontmatter.title)}`;
      } else if (parsedFilePath.dir === "") {
        slug += `/${parsedFilePath.name}/`;
      } else if (parsedFilePath.name === "index") {
        slug += `/${parsedFilePath.dir}/`;
      } else {
        slug += `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
      }

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const Posts = path.resolve("./src/templates/Posts/Posts.jsx");
  const Post = path.resolve("src/templates/Post/Post.jsx");
  const About = path.resolve("src/templates/About/About.jsx");
  const Tag = path.resolve("src/templates/Tag/Tag.jsx");
  const Tags = path.resolve("src/templates/Tags/Tags.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = {};

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Posts
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(postsEdges.length / postsPerPage);

  createPage({
    path: "/",
    component: Posts,
    context: {
      isRoot: true,
      limit: postsPerPage,
      skip: 0,
      pageCount,
      currentPage: 1
    }
  });

  createPage({
    path: "/posts",
    component: Posts,
    context: {
      limit: postsPerPage,
      skip: 0,
      pageCount,
      currentPage: 1
    }
  });

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: `/posts/${pageNum + 1}/`,
      component: Posts,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPage: pageNum + 1
      }
    });
  });

  // Post page creating
  postsEdges.forEach((edge, index) => {
    const date = moment(
      edge.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        const info = tagSet[tag] || { count: 0 };
        info.count += 1;
        if (!info.updated || info.updated.isBefore(date)) {
          info.updated = date;
        }
        tagSet[tag] = info;
      });
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: Post,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug
      }
    });
  });

  // About
  createPage({
    path: "/about",
    component: About
  });

  //  Create tag pages
  createPage({
    path: `/tags`,
    component: Tags,
    context: {
      tagSet
    }
  });

  for (const tag in tagSet) {
    const { count, updated } = tagSet[tag];
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: Tag,
      context: {
        tag,
        count,
        updated
      }
    });
  }
};
