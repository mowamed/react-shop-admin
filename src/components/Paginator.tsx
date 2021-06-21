import React from "react";

const Paginator = (props: {
  page: number;
  lastPage: number;
  pageChanged: (page: number) => void;
}) => {
  const next = () => {
    if (props.page <= props.lastPage) {
      props.pageChanged(props.page + 1);
    }
  };

  const prev = () => {
    if (props.page >= 1) {
      props.pageChanged(props.page - 1);
    }
  };

  return (
    <nav className="d-flex justify-content-center" aria-label="Pagination">
      <button className="btn btn-outline-primary" onClick={prev}>
        Previous
      </button>
      &nbsp;&nbsp;&nbsp;
      <button className="btn btn-outline-primary" onClick={next}>
        Next
      </button>
    </nav>
  );
};

export default Paginator;
