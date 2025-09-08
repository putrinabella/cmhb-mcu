export interface RowError {
  rowIndex: number; // index baris di excel
  messages: string[]; // pesan error untuk baris tersebut
}

interface ExcelTableProps {
  data: (string | number)[][];
  headers: string[]; // wajib dikirim dari excel
  errors?: RowError[];
}

export function ExcelTable({ data, headers, errors }: ExcelTableProps) {
  if (!data.length)
    return (
      <p className="text-center text-base-content/50">Data belum diinput</p>
    );

  // Selalu tambahkan number di awal, error di akhir
  const finalHeaders = ["number", ...headers, "error"];

  return (
    <div className="overflow-x-auto max-h-[60vh] border rounded-md border-base-content/20">
      <table className="min-w-full divide-y divide-base-content/20">
        <thead className="bg-base-200 sticky top-0">
          <tr>
            {finalHeaders.map((col, i) => (
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
          {data.map((row, rowIndex) => {
            const rowErrors =
              errors?.find((e) => e.rowIndex === rowIndex)?.messages ?? [];
            return (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-base-100" : "bg-base-200"}
              >
                {finalHeaders.map((header, cellIndex) => {
                  let cellValue: string | number = "";

                  if (header === "number") {
                    cellValue = rowIndex + 1;
                  } else if (header === "error") {
                    cellValue = rowErrors.length ? rowErrors.join(", ") : "-";
                  } else {
                    // index disesuaikan (karena ada "number" di awal)
                    const originalIndex = cellIndex - 1;
                    cellValue = row[originalIndex] ?? "-";
                  }

                  return (
                    <td
                      key={cellIndex}
                      className="px-6 py-3 border border-base-content/20 text-sm"
                    >
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
