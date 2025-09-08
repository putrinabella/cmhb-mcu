import { showSwal } from "@/lib/SwalHelper";
import { useState, type ChangeEvent } from "react";
import * as XLSX from "xlsx";

type ExcelData = (string | number)[][];

export function useExcelData(templateHeader: string[]) {
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

  const downloadTemplate = (filename = "template-data.xlsx") => {
    const wb = XLSX.utils.book_new();

    // Sheet Template
    const wsTemplate = XLSX.utils.aoa_to_sheet([templateHeader]);
    XLSX.utils.book_append_sheet(wb, wsTemplate, "Template");

    XLSX.writeFile(wb, filename);
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
