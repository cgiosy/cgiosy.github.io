import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import "./404.css";

const NotFound = () => {
  return (
    <Layout>
      <Helmet title={`404 Not Found | ${config.siteTitle}`}></Helmet>
      <div className="notfound-container">
        <h1>404 Not Found</h1>
        <section>주소가 잘못되었거나 삭제된 페이지인 것 같아요! 다른 글을 보시는 건 어떨까요?</section>
      </div>
    </Layout>
  );
}

export default NotFound;
