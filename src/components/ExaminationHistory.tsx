import { HeartPlus } from "lucide-react";
import {
  getMyEmployee,
  isValidResultId,
  type Batch,
  type ExaminationDetail,
} from "@/services/employeesAccessApi";
import HistoryList from "./HistoryList";
import type { HistoryItem } from "@/types/history";
import { useNavigate } from "react-router-dom";
import { formatTanggalHari } from "@/utils/dateUtils";

export default function ExaminationHistory() {
  const navigate = useNavigate();

  const fetchExaminationHistory = async (): Promise<HistoryItem[]> => {
    const res = await getMyEmployee();

    const rawBatches = res.data.batches;
    const batches: Batch[] = Array.isArray(rawBatches)
      ? rawBatches
      : Object.values(rawBatches);

    // const batches: Batch[] = res.data.batches;
    console.log(batches);
    // return batches
    //   .filter((batch) => typeof batch.examination === "object")
    //   .map((batch) => {
    //     const exam = batch.examination as ExaminationDetail;

    //     return {
    //       id: exam.id,
    //       title:
    //         typeof exam.mcu_package === "string"
    //           ? exam.mcu_package
    //           : exam.mcu_package.name || "MCU Event",
    //       timestamp: formatTanggalHari(batch.exam_date),
    //       icon: <HeartPlus size={20} />,
    //       titleClassName:
    //         typeof exam.mcu_package === "string" &&
    //         exam.mcu_package === "Paket Belum Ditentukan"
    //           ? "text-red-500"
    //           : "",
    //       badge: isValidResultId(exam.result) ? (
    //         <span className="badge bg-primary/20 text-base-content text-xs p-0">
    //           Hasil tersedia
    //         </span>
    //       ) : undefined,
    //     };
    //   });

    return batches
      .filter((batch) => typeof batch.examination === "object")
      .map((batch) => {
        const exam = batch.examination as ExaminationDetail;

        return {
          id: exam.id, // examId
          batchId: batch.id, // simpan batchId
          title:
            typeof exam.mcu_package === "string"
              ? exam.mcu_package
              : exam.mcu_package.name || "MCU Event",
          timestamp: formatTanggalHari(batch.exam_date),
          icon: <HeartPlus size={20} />,
          titleClassName:
            typeof exam.mcu_package === "string" &&
            exam.mcu_package === "Paket Belum Ditentukan"
              ? "text-red-500"
              : "",
          badge: isValidResultId(exam.result) ? (
            <span className="badge bg-primary/20 text-base-content text-xs p-0">
              Hasil tersedia
            </span>
          ) : undefined,
        };
      });
  };

  return (
    <HistoryList
      fetchData={fetchExaminationHistory}
      emptyMessage="Belum ada riwayat MCU"
      onItemClick={
        (item) =>
          item.batchId
            ? navigate(
                `/dashboard/batch/${item.batchId}/examination/${item.id}`
              )
            : navigate(`/examinations/${item.id}`) // fallback kalau batchId kosong
      }
    />
  );
}
