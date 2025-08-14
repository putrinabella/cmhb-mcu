interface ExcelTableProps {
  data: (string | number)[][];
  headers: string[];
}

export function ExcelTable({ data, headers }: ExcelTableProps) {
  if (!data.length)
    return (
      <p className="text-center text-base-content/50">No data loaded yet.</p>
    );

  return (
    <div className="overflow-x-auto max-h-[60vh] border rounded-md border-base-content/20">
      <table className="min-w-full divide-y divide-base-content/20">
        <thead className="bg-base-200 sticky top-0">
          <tr>
            {headers.map((col, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-base-content/20"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-base-100" : "bg-base-200"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-3 border border-base-content/20 text-sm"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
