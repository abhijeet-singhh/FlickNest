import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
}

const pageToggleButtonClass = "w-10 h-10 flex items-center justify-center border border-zinc-700 bg-zinc-800 rounded-full text-zinc-300 hover:bg-zinc-700 cursor-pointer"

const Pagination = ({ currentPage, totalPages, onPageChange, visiblePages = 3, }: PaginationProps) => {
  if (totalPages <= 1) return null;

  let start = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  let end = start + visiblePages - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - visiblePages + 1, 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-1 md:gap-2 mt-8 flex-wrap">
      {currentPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={pageToggleButtonClass}
            aria-label="First page"
          >
            <MdFirstPage />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={pageToggleButtonClass}
            aria-label="Previous page"
          >
            <MdKeyboardArrowLeft />
          </button>
        </>
      )}

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 border border-zinc-700 rounded-full text-sm font-semibold text-zinc-300 cursor-pointer ${currentPage === pageNum
            ? 'bg-zinc-700'
            : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          aria-label={`Page ${pageNum}`}
        >
          {pageNum}
        </button>
      ))}

      {currentPage < totalPages && (
        <>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={pageToggleButtonClass}
            aria-label="Next page"
          >
            <MdKeyboardArrowRight />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            className={pageToggleButtonClass}
            aria-label="Last page"
          >
            <MdLastPage />
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;