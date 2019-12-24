import React from "react";
import PostTag from "../PostTag/PostTag";
import "./PostTags.css";

const PostTags = ({ tags }) => tags && (
  <div className="post-tag-container">
    {
      tags.map(tag =>
        <PostTag tag={tag} key={tag} />
      )
    }
  </div>
)

export default PostTags;
