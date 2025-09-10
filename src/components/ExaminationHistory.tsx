import { HeartPlus } from "lucide-react";
import { getMyEmployee, type Batch } from "@/services/employeesAccessApi";
import HistoryList from "./HistoryList";
import type { HistoryItem } from "@/types/history";
import { useNavigate } from "react-router-dom";
import { formatTanggalHari } from "@/utils/dateUtils";
export default function ExaminationHistory() {
  const navigate = useNavigate();

  const fetchExaminationHistory = async (): Promise<HistoryItem[]> => {
    const res = await getMyEmployee();
    const batches: Batch[] = res.data.batches;

    return batches
      .filter((batch) => typeof batch.examination === "object")
      .map((batch) => {
        const exam = batch.examination as {
          id: string;
          mcu_package: string;
          notes: string;
          result: string;
        };

        return {
          id: exam.id,
          title: exam.mcu_package || "MCU Event",
          // description: exam.notes,
          timestamp: formatTanggalHari(batch.exam_date),
          icon: <HeartPlus size={20} />,
          titleClassName:
            exam.mcu_package === "Paket Belum Ditentukan" ? "text-red-500" : "",
          badge:
            exam.result && exam.result !== "Hasil Belum Bisa Diakses" ? (
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
      onItemClick={(item) => navigate(`/examinations/${item.id}`)}
    />
  );
}

// import React, { useEffect, useState } from "react";
// import { List } from "./List";
// import { getMyEmployee, type Batch } from "@/services/employeesAccessApi";
// import { HeartPlus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { LoadingIndicator } from "./LoadingIndicator";

// type HistoryItem = {
//   id: string | number;
//   title: string;
//   description?: string;
//   timestamp: string;
//   icon?: React.ReactNode;
// };

// export default function ExaminationHistory() {
//   const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await getMyEmployee();
//         const batches: Batch[] = res.data.batches;

//         // Ambil examination dari batch
//         const historyItems: HistoryItem[] = batches
//           .filter((batch) => typeof batch.examination === "object")
//           .map((batch) => {
//             const exam = batch.examination as {
//               id: string;
//               mcu_package: string;
//               notes: string;
//               result: string;
//             };
//             return {
//               id: exam.id,
//               title: exam.mcu_package || "MCU Event",
//               description: exam.notes,
//               timestamp: batch.exam_date,
//               icon: <HeartPlus size={20} />,
//             };
//           });

//         setHistoryData(historyItems);
//       } catch (err) {
//         console.error("Failed to fetch history:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) return <LoadingIndicator />;

//   return (
//     <List
//       items={historyData}
//       emptyMessage="Belum ada riwayat MCU"
//       onItemClick={(item) => navigate(`/examinations/${item.id}`)}
//     />
//   );
// }

// // import React, { useEffect, useState } from "react";
// // import { List } from "./List";
// // import { getMyEmployee, type Batch } from "@/services/employeesAccessApi";
// // import { HeartPlus } from "lucide-react";

// // type HistoryItem = {
// //   id: string | number;
// //   title: string;
// //   description?: string;
// //   timestamp: string;
// //   icon?: React.ReactNode;
// // };

// // export default function ExaminationHistory() {
// //   const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         const res = await getMyEmployee();
// //         const batches: Batch[] = res.data.batches;

// //         const historyItems: HistoryItem[] = batches.map((batch) => {
// //           const examTitle =
// //             typeof batch.examination === "object"
// //               ? batch.examination.mcu_package || "MCU Event"
// //               : "MCU Event";

// //           const description =
// //             typeof batch.examination === "object"
// //               ? batch.examination.notes
// //               : undefined;

// //           return {
// //             id: batch.id,
// //             title: `${batch.batch_code} - ${examTitle}`,
// //             description,
// //             timestamp: batch.exam_date,
// //             icon: <HeartPlus size={20} />,
// //           };
// //         });

// //         setHistoryData(historyItems);
// //       } catch (err) {
// //         console.error("Failed to fetch history:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHistory();
// //   }, []);

// //   if (loading) return <p>Memuat riwayat...</p>;

// //   return <List items={historyData} emptyMessage="Belum ada riwayat MCU" />;
// // }
