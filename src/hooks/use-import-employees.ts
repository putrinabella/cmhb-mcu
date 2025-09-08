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

      // jika import sukses
      if (res.meta?.success) {
        return true;
      }

      // jika API return success false tapi ada validation errors
      if (res.errors) {
        const mappedErrors: RowError[] = Object.entries(res.errors).map(
          ([row, messages]) => ({
            rowIndex: parseInt(row, 10) - 2, // header row = 1
            messages: Array.isArray(messages) ? messages : [String(messages)],
          })
        );
        setErrors(mappedErrors);

        showSwal({
          icon: "error",
          title: "Gagal Import",
          text: res.meta?.message || "Ada kesalahan di data",
        });

        return false;
      }

      // fallback error lain
      showSwal({
        icon: "error",
        title: "Gagal",
        text: res.meta?.message || "Terjadi kesalahan saat import.",
      });
      return false;
    } catch (err: any) {
      // err langsung berisi {meta, errors} dari apiRequest
      if (err?.errors) {
        const mappedErrors: RowError[] = Object.entries(err.errors).map(
          ([row, messages]) => ({
            rowIndex: parseInt(row, 10) - 2,
            messages: Array.isArray(messages) ? messages : [String(messages)],
          })
        );
        setErrors(mappedErrors);

        showSwal({
          icon: "error",
          title: "Gagal Import",
          text: err.meta?.message || "Ada kesalahan di data",
        });

        return false;
      }

      // fallback network / unknown error
      showSwal({
        icon: "error",
        title: "Error",
        text: err?.message || "Terjadi kesalahan jaringan atau server",
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { importData, loading, errors };
}
