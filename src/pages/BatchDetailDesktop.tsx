import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";
import { downloadExaminationResult } from "@/services/employeeAPI";
import { useToggleExaminationAccess } from "@/hooks/use-examination-access";
import { CheckCircle, XCircle } from "lucide-react";
import { showSwal } from "@/lib/SwalHelper";

interface Props {
  examinations: ExaminationItem[];
}
export default function BatchDetailDesktop({ examinations }: Props) {
  console.log("Isi examinations:", examinations);
  const handleViewResult = async (id: string) => {
    try {
      const blob = await downloadExaminationResult(id);
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank"); // buka di tab baru
    } catch (err) {
      showSwal({
        title: "Gagal",
        text: "Gagal memuat hasil pemeriksaan.",
        icon: "error",
      });
    }
  };

  const initialAccess = examinations.map((ex: any) => ({
    id: ex.id,
    isVisibleToEmployee:
      ex.is_visible_to_employee === 1 || ex.isVisibleToEmployee === 1,
  }));

  const { accessState, toggleAccess, loadingIds } =
    useToggleExaminationAccess(initialAccess);

  if (!examinations || examinations.length === 0) {
    return (
      <p className="p-4 text-center text-base-content">
        Tidak ada data pemeriksaan.
      </p>
    );
  }

  return (
    <div className="hidden md:block max-h-[56vh] overflow-y-auto">
      <table className="table w-full">
        <thead className="bg-primary/20 backdrop-blur-3xl text-base-content sticky top-0 z-10">
          <tr className="text-center align-middle">
            <th>No</th>
            <th className="max-w-[200px]">Paket MCU</th>
            <th>Nomor Pegawai</th>
            <th>NIK</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Tanggal Lahir</th>
            <th>Kontak</th>
            <th>Hasil</th>
            <th>Hak Akses</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {examinations.map((exm, idx) => {
            const employee = exm.company_employee;
            const packageName =
              typeof exm.mcu_package === "string"
                ? exm.mcu_package
                : exm.mcu_package?.name || "-";

            const resultObj =
              typeof exm.result === "object" &&
              exm.result !== null &&
              "id" in exm.result
                ? exm.result
                : null;

            return (
              <tr key={exm.id} className="hover:bg-base-200">
                <td className="text-center">{idx + 1}</td>
                <td className="max-w-[200px]">
                  {packageName}
                  {exm.notes && (
                    <div className="text-xs text-base-content/70 mt-1">
                      Catatan: {exm.notes}
                    </div>
                  )}
                </td>
                <td className="text-center">
                  {employee?.employee_number || "-"}
                </td>
                <td className="text-center">{employee?.nik || "-"}</td>
                <td>{employee?.name || "-"}</td>
                <td className="text-center">{employee?.gender || "-"}</td>
                <td className="text-center">
                  {employee?.dob ? getDateIndonesianFormat(employee.dob) : "-"}
                  <br />
                  <small>{employee?.age_detail || ""}</small>
                </td>
                <td className="text-center">
                  {employee?.phone_number ? (
                    <a
                      href={formatWhatsappLink(employee.phone_number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {employee.phone_number}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="text-center">
                  {resultObj ? (
                    <button
                      className="btn btn-sm rounded-full w-full text-base-content bg-primary/20"
                      onClick={() => handleViewResult(resultObj.id)}
                    >
                      Lihat Hasil
                    </button>
                  ) : (
                    <button className="btn btn-sm rounded-full w-full text-base-content bg-secondary/5">
                      Belum ada hasil
                    </button>
                  )}
                </td>
                <td className="text-center">
                  <button
                    className={`btn btn-sm flex items-center gap-2 rounded-full w-full text-base-content ${
                      accessState[exm.id] ? "bg-primary/20" : "bg-secondary/5"
                    }`}
                    disabled={loadingIds.has(exm.id)}
                    onClick={() => toggleAccess(exm.id)}
                  >
                    {accessState[exm.id] ? (
                      <>
                        <CheckCircle size={16} /> Aktif
                      </>
                    ) : (
                      <>
                        <XCircle size={16} /> Nonaktif
                      </>
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// untuk link ke halaman lain
// <button
//   className="btn btn-sm btn-primary"
//   onClick={() =>
//     navigate(
//       `/dashboard/batch/${batchId}/examination/${resultObj.id}`
//     )
//   }
// >
//   Lihat Hasil
// </button>
// import { formatWhatsappLink } from "@/utils/whatsappUtils";
// import { getDateIndonesianFormat } from "@/utils/dateUtils";
// import type { ExaminationItem } from "@/services/examinationsApi";
// import { downloadExaminationResult } from "@/services/employeeAPI";

// interface Props {
//   examinations: ExaminationItem[];
//   page: number;
//   perPage?: number;
// }

// export default function BatchDetailDesktop({
//   examinations,
//   page,
//   perPage = 10,
// }: Props) {
//   const handleDownload = async (id: string, filename: string) => {
//     try {
//       const blob = await downloadExaminationResult(id);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Gagal mendownload hasil pemeriksaan.");
//     }
//   };

//   if (!examinations || examinations.length === 0) {
//     return (
//       <p className="p-4 text-center text-base-content">
//         Tidak ada data pemeriksaan.
//       </p>
//     );
//   }

//   return (
//     <div className="hidden md:block max-h-[56vh] overflow-y-auto">
//       <table className="table w-full">
//         <thead className="bg-primary/20 backdrop-blur-3xl text-base-content sticky top-0 z-10">
//           <tr className="text-center align-middle">
//             <th>No</th>
//             <th className="max-w-[200px]">Paket MCU</th>
//             <th>Nomor Pegawai</th>
//             <th>NIK</th>
//             <th>Nama</th>
//             <th>Gender</th>
//             <th>Tanggal Lahir</th>
//             <th>Kontak</th>
//             <th>Hasil</th>
//           </tr>
//         </thead>
//         <tbody className="align-middle">
//           {examinations.map((exm, index) => {
//             const employee = exm.company_employee;
//             const packageName =
//               typeof exm.mcu_package === "string"
//                 ? exm.mcu_package
//                 : exm.mcu_package?.name || "-";

//             // Type guard untuk result
//             const resultObj =
//               typeof exm.result === "object" &&
//               exm.result !== null &&
//               "id" in exm.result
//                 ? exm.result
//                 : null;

//             return (
//               <tr key={exm.id} className="hover:bg-base-200">
//                 <td className="text-center">
//                   {index + 1 + (page - 1) * perPage}
//                 </td>
//                 <td className="max-w-[200px]">
//                   {packageName}
//                   {exm.notes && (
//                     <div className="text-xs text-base-content/70 mt-1">
//                       Catatan: {exm.notes}
//                     </div>
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {employee?.employee_number || "-"}
//                 </td>
//                 <td className="text-center">{employee?.nik || "-"}</td>
//                 <td>{employee?.name || "-"}</td>
//                 <td className="text-center">{employee?.gender || "-"}</td>
//                 <td className="text-center">
//                   {employee?.dob ? getDateIndonesianFormat(employee.dob) : "-"}
//                   <br />
//                   <small>{employee?.age_detail || ""}</small>
//                 </td>
//                 <td className="text-center">
//                   {employee?.phone_number ? (
//                     <a
//                       href={formatWhatsappLink(employee.phone_number)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline"
//                     >
//                       {employee.phone_number}
//                     </a>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="text-center flex flex-col gap-1">
//                   {resultObj ? (
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() =>
//                         handleDownload(
//                           resultObj.id,
//                           `${employee?.nik || "unknown"} - ${
//                             employee?.name || "hasil"
//                           }.pdf`
//                         )
//                       }
//                     >
//                       Lihat Hasil
//                     </button>
//                   ) : (
//                     <span className="text-base-content">Belum ada hasil</span>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
