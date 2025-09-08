import { useState } from "react";
import { showSwal } from "@/lib/SwalHelper";
import { importEmployees } from "@/services/employeeAPI";
import type { RowError } from "@/components/ExcelTable";

export function useImportEmployees(examinationBatchId: string) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RowError[]>([]);

  const importData = async (file: File) => {
    setLoading(true);
    setErrors([]);

    try {
      const res = await importEmployees(file, examinationBatchId);

      // ✅ Jika import sukses penuh
      if (res.meta?.success) {
        showSwal({
          icon: "success",
          title: "Berhasil",
          text: "Data pegawai berhasil diimport!",
          timer: 2000,
          showConfirmButton: false,
        });
        return true;
      }

      const errorObj = res.errors || res.data?.errors;
      if (errorObj) {
        const mappedErrors: RowError[] = Object.entries(errorObj).map(
          ([row, messages]) => ({
            rowIndex: parseInt(row, 10) - 2, // excel baris 2 -> index 0
            messages: Array.isArray(messages) ? messages : [String(messages)],
          })
        );

        setErrors(mappedErrors);
        return false;
      }

      showSwal({
        icon: "error",
        title: "Gagal",
        text: res.meta?.message || "Terjadi kesalahan saat import.",
        confirmButtonText: "Coba lagi",
      });

      return false;
    } catch (err: any) {
      console.log("Import API failed:", err?.response?.data); // 🔑 cek struktur
      const responseData = err?.response?.data;

      if (responseData?.errors) {
        const mappedErrors: RowError[] = Object.entries(
          responseData.errors
        ).map(([row, messages]) => ({
          rowIndex: parseInt(row, 10) - 2,
          messages: Array.isArray(messages) ? messages : [String(messages)],
        }));

        setErrors(mappedErrors);
        return false;
      }
    } finally {
      setLoading(false);
    }
  };

  return { importData, loading, errors };
}
