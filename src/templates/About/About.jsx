import React from "react";
import Helmet from "react-helmet";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import "./About.css";

const About = () => {
  return (
    <Layout>
      <Helmet title={`About cgiosy | ${config.siteTitle}`}></Helmet>
      <div className="about-container">
        <section>
          백준: <a href="https://www.acmicpc.net/user/cgiosy">cgiosy</a><br />
          코드포스: <a href="https://codeforces.com/profile/cgiosy0" className="codeforces-id">cgiosy0</a> (max. 2051)<br />
          한줄소개: 컴퓨터를 좋아하는 03년생 인남캐
        </section>
        <h3>수상 내역</h3>
        <section>무엇을 써야 좋을까요?</section>
        <h3>기타</h3>
        <section>개발 초기라 일부 페이지가 많이 부실해요!</section>
      </div>
    </Layout>
  );
}

export default About;
