import { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  // Function to generate pagination numbers with ellipsis
  const getPagination = () => {
    const pages: (number | "...")[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const shouldShowLeftEllipsis = currentPage > 4;
    const shouldShowRightEllipsis = currentPage < totalPages - 3;

    pages.push(1);

    if (shouldShowLeftEllipsis) pages.push("...");

    const middleStart = Math.max(2, currentPage - 1);
    const middleEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }

    if (shouldShowRightEllipsis) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <section className="flex pt-6 pb-3 justify-center items-center border-t border-gray-200 bg-white px-4  sm:px-6 w-[100%]">
        <div className="flex gap-2">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-0 bg-[#F6F6F6] rounded-md border-2 border-[#C2BCB8] focus:z-20 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers with Ellipsis */}
          {getPagination().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-4 py-2 text-sm font-semibold text-gray-700">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => goToPage(page)}
                className={`relative inline-flex items-center px-3 py-0 text-sm font-semibold  ${
                  currentPage !== page
                    ? "bg-[#F6F6F6] rounded-md border-2 border-[#C2BCB8] "
                    : "border-[#EB9305] rounded-md border-2"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-0 bg-[#F6F6F6] rounded-md border-2 border-[#C2BCB8]  focus:z-20 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
  );
};

export default Pagination;
