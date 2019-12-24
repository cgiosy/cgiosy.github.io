import React from "react";
import { Link } from "gatsby";
import PostTitle from "../PostTitle/PostTitle";
import PostPreview from "../PostPreview/PostPreview";
import DateTime from "../DateTime/DateTime";
import "./PostListItem.css";

const PostListItem = ({ post }) => (
  <Link className="post-list-item" to={post.path}>
    <PostTitle path={post.path}>{post.title}</PostTitle>
    <DateTime>{post.date} · {post.timeToRead} min read</DateTime>
    <PostPreview></PostPreview>
  </Link>
)

export default PostListItem;
