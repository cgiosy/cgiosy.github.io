import React from "react";
import { Link } from "gatsby";
import _ from "lodash";
import "./PostTag.css";

const PostTag = ({ tag }) => (
  <Link
    className="post-tag"
    to={`/tags/${_.kebabCase(tag)}`}
  >
    {tag}
  </Link>
);

export default PostTag;
