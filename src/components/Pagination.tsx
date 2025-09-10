type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (newPage: number) => void;
  perPage?: number;
  total?: number;
};

// export default function Pagination({
//   page,
//   lastPage,
//   onPageChange,
//   perPage = 10,
//   total = 0,
// }: PaginationProps) {
//   const from = total === 0 ? 0 : (page - 1) * perPage + 1;
//   const to = total === 0 ? 0 : Math.min(page * perPage, total);

//   const pages: (number | "...")[] = [];
//   const delta = 2;
//   for (let p = 1; p <= lastPage; p++) {
//     if (p === 1 || p === lastPage || (p >= page - delta && p <= page + delta)) {
//       pages.push(p);
//     } else if (pages[pages.length - 1] !== "...") {
//       pages.push("...");
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
//       {/* Info teks */}
//       <p className="text-sm text-base-content">
//         {total === 0 ? (
//           <>Menampilkan 0 data</>
//         ) : (
//           <>
//             Menampilkan <span className="font-medium">{from}</span> sampai{" "}
//             <span className="font-medium">{to}</span> dari{" "}
//             <span className="font-medium">{total}</span> data
//           </>
//         )}
//       </p>

//       {/* Pagination buttons */}
//       <div className="flex items-center gap-2 flex-wrap">
//         {/* Prev */}
//         <button
//           onClick={() => onPageChange(page - 1)}
//           disabled={page === 1}
//           className={`btn btn-sm ${
//             page === 1 ? "btn-disabled" : "btn-outline"
//           }`}
//         >
//           «
//         </button>

//         {/* Page numbers */}
//         {pages.map((p, i) =>
//           p === "..." ? (
//             <span
//               key={`ellipsis-${i}`}
//               className="btn btn-sm btn-outline cursor-default"
//             >
//               ...
//             </span>
//           ) : (
//             <button
//               key={p}
//               onClick={() => onPageChange(p as number)}
//               className={`btn btn-sm ${
//                 p === page ? "btn-primary" : "btn-outline"
//               }`}
//             >
//               {p}
//             </button>
//           )
//         )}

//         {/* Next */}
//         <button
//           onClick={() => onPageChange(page + 1)}
//           disabled={page === lastPage}
//           className={`btn btn-sm ${
//             page === lastPage ? "btn-disabled" : "btn-outline"
//           }`}
//         >
//           »
//         </button>
//       </div>
//     </div>
//   );
// }
export default function Pagination({
  page,
  lastPage,
  onPageChange,
  perPage = 10,
  total = 0,
}: PaginationProps) {
  if (lastPage <= 1) {
    // kalau cuma ada 1 halaman, jangan tampilkan pagination sama sekali
    return <p className="text-sm text-base-content mt-6"></p>;
  }

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = total === 0 ? 0 : Math.min(page * perPage, total);

  const pages: (number | "...")[] = [];
  const delta = 2;
  for (let p = 1; p <= lastPage; p++) {
    if (p === 1 || p === lastPage || (p >= page - delta && p <= page + delta)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      {/* Info teks */}
      <p className="text-sm text-base-content">
        {total === 0 ? (
          <>Menampilkan 0 data</>
        ) : (
          <>
            Menampilkan <span className="font-medium">{from}</span> sampai{" "}
            <span className="font-medium">{to}</span> dari{" "}
            <span className="font-medium">{total}</span> data
          </>
        )}
      </p>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`btn btn-sm ${
            page === 1 ? "btn-disabled" : "btn-outline"
          }`}
        >
          «
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="btn btn-sm btn-outline cursor-default"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`btn btn-sm ${
                p === page ? "btn-primary" : "btn-outline"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === lastPage}
          className={`btn btn-sm ${
            page === lastPage ? "btn-disabled" : "btn-outline"
          }`}
        >
          »
        </button>
      </div>
    </div>
  );
}
