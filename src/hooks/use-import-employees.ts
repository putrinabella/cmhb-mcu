import { useState } from "react";
import { importEmployees } from "@/services/employeeAPI";
import { showSwal } from "@/lib/SwalHelper";

export function useImportEmployees() {
  const [loading, setLoading] = useState(false);

  const importData = async (file: File) => {
    try {
      setLoading(true);
      const userData = localStorage.getItem("user");
      let companyId = "";

      if (userData) {
        try {
          const user = JSON.parse(userData); // ubah string ke object
          companyId = user.company?.id || ""; // ambil company.id jika ada
        } catch (error) {
          console.error("Gagal parse user data:", error);
        }
      }

      console.log("Company ID:", companyId);

      if (!companyId) {
        showSwal({
          icon: "error",
          title: "Gagal",
          // text: "Company ID tidak ditemukan.",
          text: "Company ID tidak ditemukan di localStorage.",
          confirmButtonText: "Mengerti",
        });
        return false;
      }

      await importEmployees(file, companyId);

      showSwal({
        icon: "success",
        title: "Berhasil",
        text: "Data pegawai berhasil diimport!",
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (err: any) {
      console.error(err);
      showSwal({
        icon: "error",
        title: "Gagal",
        text:
          err?.response?.data?.message || "Terjadi kesalahan saat import data.",
        confirmButtonText: "Coba lagi",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { importData, loading };
}
