import React from "react";
import PostListItem from "../PostListItem/PostListItem";
import "./PostList.css";

const PostList = ({ postEdges }) => (
  <div className="post-list">
    {
      postEdges.map(postEdge => ({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      })).map(post => (
        <PostListItem post={post} key={post.path} />
      ))
    }
  </div>
);

export default PostList;
