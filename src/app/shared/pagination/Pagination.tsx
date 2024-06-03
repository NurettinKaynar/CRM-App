import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  total: number;
  current: number;
  onChangePage: (page: number) => void;
}

const CustomPagination = ({
  total,
  current,
  onChangePage,
}: PaginationProps) => {
  const maxPagesToShow = 10;
  let startPage, endPage;

  if (total <= maxPagesToShow) {
    startPage = 1;
    endPage = total - 1;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

    if (current <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow - 1;
    } else if (current + maxPagesAfterCurrentPage >= total) {
      startPage = total - maxPagesToShow;
      endPage = total - 1;
    } else {
      startPage = current - maxPagesBeforeCurrentPage;
      endPage = current + maxPagesAfterCurrentPage;
    }
  }

  const items = [];
  if (current > 0) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
    );
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === current}
        onClick={()=>onChangePage(page)}>
        {page }
      </Pagination.Item>
    );
  }

  if (current < total - 1) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
    );
  }

  return <Pagination>{items}</Pagination>;
};

export default CustomPagination;
