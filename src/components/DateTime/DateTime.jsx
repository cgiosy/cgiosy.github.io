import React from "react";
import "./DateTime.css"

const DateTime = ({ children }) => (
  <time className="datetime">{children}</time>
);

export default DateTime;
