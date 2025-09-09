import { useState } from "react";
import { toggleExaminationAccess } from "@/services/examinationsApi";
import { showSwal } from "@/lib/SwalHelper";

export function useToggleExaminationAccess(
  items: { id: string; isVisibleToEmployee: boolean }[]
) {
  const [accessState, setAccessState] = useState<Record<string, boolean>>(() =>
    items.reduce((acc, item) => {
      acc[item.id] = item.isVisibleToEmployee;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const toggleAccess = async (id: string) => {
    const newValue = !accessState[id];
    try {
      setLoadingIds((prev) => new Set(prev).add(id));
      await toggleExaminationAccess(id, newValue ? 1 : 0);
      setAccessState((prev) => ({ ...prev, [id]: newValue }));
      showSwal({
        title: "Berhasil",
        text: `Hak akses ${newValue ? "diaktifkan" : "dinonaktifkan"}.`,
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error(err);
      showSwal({
        title: "Gagal",
        text: err?.meta?.message || "Gagal memperbarui hak akses",
        icon: "error",
      });
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return { accessState, toggleAccess, loadingIds };
}
