import React from "react";
import { Link } from "gatsby";
import "./PostPagination.css";

const paginationRadius = 1;

const Page = ({ current, page, children }) => (
  <Link
    className={"pagination-item" + (page === current ? " pagination-selected" : "")}
    to={page === 1 ? "/posts" : `/posts/${page}/`}
  >
    {children}
  </Link>
)

const PostPagination = ({ pageContext }) => {
  const { currentPage, pageCount } = pageContext;
  const firstPage = 1;
  const lastPage = pageCount;
  const startPage = Math.max(currentPage - paginationRadius, firstPage);
  const endPage = Math.min(currentPage + paginationRadius, lastPage);

  return (
    <div className="pagination-container">
      {startPage > firstPage && <Page current={currentPage} page={1}>1</Page>}

      {startPage > firstPage + 1 && <Page current={currentPage} page={startPage - 1}>...</Page>}

      {[...Array(endPage - startPage + 1)].map((_val, index) => {
        const page = startPage + index;
        return (
          <Page current={currentPage} page={page} key={page}>{page}</Page>
        )
      }
      )}

      {endPage + 1 < lastPage && <Page current={currentPage} page={endPage + 1}>...</Page>}

      {endPage < lastPage && <Page current={currentPage} page={lastPage}>{lastPage}</Page>}
    </div>
  );
}

export default PostPagination;
