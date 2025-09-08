export interface RowError {
  rowIndex: number; // index baris di excel (0-based)
  messages: string[]; // pesan error untuk baris tersebut
}

interface ExcelTableProps {
  data: (string | number)[][];
  headers: string[];
  errors?: RowError[];
}

export function ExcelTable({ data, headers, errors }: ExcelTableProps) {
  // Debug
  console.log("ExcelTable data:", data);
  console.log("ExcelTable errors:", errors);

  // Ubah errors[] jadi object lookup agar gampang
  const errorMap: Record<number, string[]> = {};
  (errors ?? []).forEach((e) => {
    errorMap[e.rowIndex] = e.messages;
  });

  console.log("ErrorMap:", errorMap);

  if (!data.length) {
    return (
      <p className="text-center text-base-content/50">Data belum diinput</p>
    );
  }

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
            const rowErrors = errorMap[rowIndex] ?? [];
            const hasError = rowErrors.length > 0;

            return (
              <tr
                key={rowIndex}
                className={
                  hasError
                    ? "bg-red-50 text-red-700"
                    : rowIndex % 2 === 0
                    ? "bg-base-100"
                    : "bg-base-200"
                }
              >
                {finalHeaders.map((header, cellIndex) => {
                  let cellValue: string | number = "";

                  if (header === "number") {
                    cellValue = rowIndex + 1;
                  } else if (header === "error") {
                    cellValue = hasError ? rowErrors.join(", ") : "-";
                  } else {
                    const originalIndex = cellIndex - 1;
                    cellValue = row[originalIndex] ?? "-";
                  }

                  return (
                    <td
                      key={cellIndex}
                      className={`px-6 py-3 border border-base-content/20 text-sm ${
                        hasError && header === "error"
                          ? "text-error font-semibold"
                          : ""
                      }`}
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
