import React from "react";

interface ExcelTableProps {
  data: (string | number)[][];
  headers: string[];
}

export function ExcelTable({ data, headers }: ExcelTableProps) {
  if (!data.length)
    return <p className="text-center text-gray-400">No data loaded yet.</p>;

  return (
    <div className="overflow-x-auto max-h-[60vh] border border-gray-300 rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {headers.map((col, i) => (
              <th
                key={i}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300"
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
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-3 border border-gray-300 text-sm text-gray-700 whitespace-nowrap"
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
