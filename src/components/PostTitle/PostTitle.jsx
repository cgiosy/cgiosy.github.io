import React from "react";
import "./PostTitle.css"

const PostTitle = ({children, style}) => (
  <h1 className="post-title" style={style}>{children}</h1>
);

export default PostTitle;
