import { showSwal } from "@/lib/SwalHelper";
import { useState, type ChangeEvent } from "react";
import * as XLSX from "xlsx";

type ExcelData = (string | number)[][];

// Definisikan di sini supaya jadi single source of truth
export const templateHeader = [
  "employee_number",
  "name",
  "phone_number",
  "gender",
  "dob",
];

export function useExcelData() {
  const [data, setData] = useState<ExcelData>([]);

  const formatDate = (value: any): string => {
    if (typeof value === "number") {
      const date = XLSX.SSF.parse_date_code(value);
      if (!date) return "";
      return `${String(date.d).padStart(2, "0")}/${String(date.m).padStart(
        2,
        "0"
      )}/${date.y}`;
    }
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`;
    }
    return String(value || "");
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    // 1. Sheet Template
    const wsTemplate = XLSX.utils.aoa_to_sheet([templateHeader]);
    XLSX.utils.book_append_sheet(wb, wsTemplate, "Template");

    // 2. Sheet Contoh
    const contohIsi = [
      templateHeader,
      ["03085459", "John Doe", "08123456789", "L", "1990-01-25"],
      ["03085460", "Jane Smith", "08234567890", "P", "1992-12-26"],
      ["03085461", "Michael Lee", "08345678901", "L", "1900-10-30"],
    ];
    const wsContoh = XLSX.utils.aoa_to_sheet(contohIsi);
    XLSX.utils.book_append_sheet(wb, wsContoh, "Contoh");

    XLSX.writeFile(wb, "template-data.xlsx");
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataArr = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(dataArr, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const header = (jsonData[0] as string[]) || [];
      const isValidTemplate = templateHeader.every(
        (col, i) =>
          col.toLowerCase() === (header[i]?.toString().toLowerCase() || "")
      );

      if (!isValidTemplate) {
        showSwal({
          icon: "warning",
          title: "Format Tidak Sesuai",
          text: "Silakan download template dan isi data sesuai format.",
          confirmButtonText: "Mengerti",
        });
        setData([]);
        return;
      }

      const filteredData = (jsonData.slice(1) as any[][]).map((row) =>
        row.map((cell, idx) => (idx === 1 ? formatDate(cell) : cell || ""))
      );

      setData(filteredData);
    };

    reader.readAsArrayBuffer(file);
  };

  const resetData = () => setData([]);

  return { data, downloadTemplate, handleFileUpload, resetData };
}
