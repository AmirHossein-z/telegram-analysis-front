import { JSX, useMemo } from "react";

// with the help of
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
// and some modification by me

interface IPaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount: number;
}

const DOTS = "...";
const PREVIOUS = "قبلی";
const NEXT = "بعدی";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: IPaginationProps): JSX.Element => {
  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      onPageChange: (newPage) => {
        // console.log(`Page changed to ${newPage}`);
      },
      pageSize,
    }) ?? [];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  return (
    <ul className="join" style={{ direction: "ltr" }}>
      <li
        className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
        onClick={onPrevious}
      >
        {PREVIOUS}
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li className="btn-disabled join-item btn" key={pageNumber}>
              ...
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={`join-item btn ${
              pageNumber === currentPage ? "bg-primary" : ""
            }`}
            onClick={() => {
              if (typeof pageNumber === "string") {
                onPageChange(parseInt(pageNumber, 10));
              } else if (typeof pageNumber === "number") {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`join-item btn ${
          currentPage === lastPage ? "btn-disabled" : ""
        }`}
        onClick={onNext}
      >
        {NEXT}
      </li>
    </ul>
  );
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: IPaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export default Pagination;
