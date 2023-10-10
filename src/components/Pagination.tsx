import React from 'react';
import { usePagination, DOTS } from '@/helpers/usePagination';
import styles from '@/styles/pagination.module.css'

type Props = {
  onPageChange: (item : number | string ) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = (props : Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={styles.pagination__container}
    >
      <li
        className={`${styles.pagination__item} ${currentPage === 1 ? styles.pagination__item_disabled : ''}`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.arrow_left}`} />
      </li>
      {paginationRange.map((pageNumber, id) => {
        if (pageNumber === DOTS) {
          return <li key={`${pageNumber}_${id}`} className={`${styles.pagination__item} ${styles.pagination__item_dots} `}>&#8230;</li>;
        }

        return (
          <li
            key={`${pageNumber}_${id}`}
            className={`${styles.pagination__item} ${pageNumber === currentPage ? styles.pagination__item_selected : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.pagination__item} ${currentPage === lastPage ? styles.pagination__item_disabled : ''}`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.arrow_right}`} />
      </li>
    </ul>
  );
};

export default Pagination;