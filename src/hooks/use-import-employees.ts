import { useState } from "react";
import { showSwal } from "@/lib/SwalHelper";
import { importEmployees } from "@/services/employeeAPI";
import type { RowError } from "@/components/ExcelTable";

// export function useImportEmployees(examinationBatchId: string) {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<RowError[]>([]);

//   const importData = async (file: File) => {
//     setLoading(true);
//     setErrors([]);
//     try {
//       const res = await importEmployees(file, examinationBatchId);
//       console.log("RAW response:", res);

//       const errorObj = res.errors || res.data?.errors;

//       // ✅ kalau sukses penuh
//       if (res.meta?.success) {
//         showSwal({
//           icon: "success",
//           title: "Berhasil",
//           text: "Data pegawai berhasil diimport!",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return true;
//       }

//       // ⚠️ kalau ada error per-baris
//       if (errorObj) {
//         const mappedErrors: RowError[] = Object.entries(errorObj).map(
//           ([row, messages]) => ({
//             rowIndex: Number(row) - 2, // Excel baris 2 → data index 0
//             messages: messages as string[],
//           })
//         );

//         console.log("Mapped errors:", mappedErrors);
//         setErrors(mappedErrors);

//         showSwal({
//           icon: "warning",
//           title: "Sebagian gagal",
//           text: "Beberapa baris gagal diimport, silakan cek tabel error.",
//           confirmButtonText: "Mengerti",
//         });
//       }

//       return false;
//     } catch (err: any) {
//       console.error("Import error:", err);
//       showSwal({
//         icon: "error",
//         title: "Gagal",
//         text: err.message || "Terjadi kesalahan",
//         confirmButtonText: "Coba lagi",
//       });
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { importData, loading, errors };
// }

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

      // ⚠️ Jika response meta tidak success, tapi bukan exception
      const errorObj = res.errors || res.data?.errors;
      if (errorObj) {
        const mappedErrors: RowError[] = Object.entries(errorObj).map(
          ([row, messages]) => ({
            rowIndex: Number(row) - 2, // baris Excel dimulai dari 2 (baris 1 = header)
            messages: messages as string[],
          })
        );

        setErrors(mappedErrors);

        // ❌ Jangan tampilkan Swal karena error sudah ditampilkan di tabel
        return false;
      }

      // ❌ Jika gagal tapi tidak ada detail errors, tampilkan pesan umum
      showSwal({
        icon: "error",
        title: "Gagal",
        text: res.meta?.message || "Terjadi kesalahan saat import.",
        confirmButtonText: "Coba lagi",
      });

      return false;
    } catch (err: any) {
      console.error("Import error:", err);

      const responseData = err?.response?.data;

      // ⚠️ Tangani error validasi dari API (status 400) di catch block
      if (responseData?.errors) {
        const mappedErrors: RowError[] = Object.entries(
          responseData.errors
        ).map(([row, messages]) => ({
          rowIndex: Number(row) - 2,
          messages: messages as string[],
        }));

        setErrors(mappedErrors);
        return false;
      }

      // ❌ Error fatal
      showSwal({
        icon: "error",
        title: "Gagal",
        text: responseData?.meta?.message || err.message || "Terjadi kesalahan",
        confirmButtonText: "Coba lagi",
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { importData, loading, errors };
}
