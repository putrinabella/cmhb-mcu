// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getBatchDetail, type BatchItem } from "@/services/batchAPI";
// import { FolderOpen, Calendar, MapPin, FileText } from "lucide-react";
// import { getDateIndonesianFormat } from "@/utils/dateUtils";

// import {
//   getExamination,
//   type ExaminationItem,
// } from "@/services/examinationsApi";
// import { usePaginatedResource } from "@/hooks/use-paginated-resource";
// import { LoadingIndicator } from "@/components/LoadingIndicator";
// import Pagination from "@/components/Pagination";

// export default function BatchDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const [batch, setBatch] = useState<BatchItem | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     getBatchDetail(id)
//       .then((res) => setBatch(res.data))
//       .catch((err) => setError(err.message || "Terjadi kesalahan"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p>Memuat detail batch...</p>;
//   if (error) return <p className="text-error">{error}</p>;
//   if (!batch) return <p>Batch tidak ditemukan.</p>;

//   const {
//     data: examinations,
//     loading,
//     error,
//     page,
//     lastPage,
//     total,
//     handlePageChange,
//   } = usePaginatedResource<ExaminationItem>({
//     queryFn: getExamination,
//     defaultParams: {},
//   });
//   return (
//     <div className="p-8 space-y-6">
//       {/* Header */}
//       <div className="relative bg-primary/20 rounded-lg p-6 overflow-visible flex items-center">
//         <div className="flex-1 flex flex-col justify-center">
//           <h1 className="text-3xl font-bold text-base-content">
//             Batch {batch.batch_code}
//           </h1>
//         </div>
//         <div className="absolute right-10 -top-10 w-32 h-32 flex items-center justify-center">
//           <FolderOpen className="w-32 h-32 text-primary/50" />
//         </div>
//       </div>

//       {/* Info Card */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
//           <Calendar className="w-6 h-6 text-primary" />
//           <span className="font-medium text-base-content">
//             {getDateIndonesianFormat(batch.exam_date)}
//           </span>
//         </div>

//         <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
//           <MapPin className="w-6 h-6 text-primary" />
//           <span className="font-medium text-base-content">
//             {batch.location}
//           </span>
//         </div>

//         <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
//           <FileText className="w-6 h-6 text-primary" />
//           <span className="font-medium text-base-content">
//             {batch.notes || "-"}
//           </span>
//         </div>
//       </div>

//       {/* Detail Table */}
//       <div className="overflow-x-auto bg-base-100 rounded-lg shadow-sm border border-base-200">
//         <table className="table w-full">
//           <thead className="bg-primary/20 text-base-content">
//             <tr>
//               <th>No</th>
//               <th>Paket MCU</th>
//               <th>Nomor Pegawai</th>
//               <th>Nama</th>
//               <th>Gender</th>
//               <th>Tanggal Lahir</th>
//               <th>Usia</th>
//               <th>Kontak</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {examinations.map((exm, index) => (
//               <tr key={exm.id} className="hover:bg-base-200">
//                 <td>{index + 1}</td>
//                 <td>
//                   {exm.package}
//                   {exm.notes && (
//                     <div className="text-xs text-base-content/70 mt-1">
//                       Catatan: {exm.notes}
//                     </div>
//                   )}
//                 </td>
//                 <td>{exm.exmloyee_number}</td>
//                 <td>{exm.name}</td>
//                 <td>{exm.gender}</td>
//                 <td>{exm.birth_date}</td>
//                 <td>{exm.age}</td>
//                 <td>{exm.contact}</td>
//                 <td>
//                   <button className="btn btn-sm btn-primary">Detail</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Pagination
//         page={page}
//         lastPage={lastPage}
//         onPageChange={handlePageChange}
//         total={total}
//       />
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBatchDetail, type BatchItem } from "@/services/batchAPI";
import { FolderOpen, Calendar, MapPin, FileText } from "lucide-react";
import { getDateIndonesianFormat } from "@/utils/dateUtils";

import {
  getExamination,
  type ExaminationItem,
} from "@/services/examinationsApi";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import Pagination from "@/components/Pagination";

export default function BatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [batch, setBatch] = useState<BatchItem | null>(null);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchError, setBatchError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setBatchLoading(true);
    getBatchDetail(id)
      .then((res) => setBatch(res.data))
      .catch((err) => setBatchError(err.message || "Terjadi kesalahan"))
      .finally(() => setBatchLoading(false));
  }, [id]);

  const {
    data: examinations,
    loading: exmLoading,
    error: exmError,
    page,
    lastPage,
    total,
    handlePageChange,
  } = usePaginatedResource<ExaminationItem>({
    queryFn: getExamination,
    defaultParams: {}, // pastikan API support param ini
  });

  if (batchLoading) return <p>Memuat detail batch...</p>;
  if (batchError) return <p className="text-error">{batchError}</p>;
  if (!batch) return <p>Batch tidak ditemukan.</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="relative bg-primary/20 rounded-lg p-6 overflow-visible flex items-center">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-base-content">
            Batch {batch.batch_code}
          </h1>
        </div>
        <div className="absolute right-10 -top-10 w-32 h-32 flex items-center justify-center opacity-60">
          <FolderOpen className="w-32 h-32 text-primary" />
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <Calendar className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {getDateIndonesianFormat(batch.exam_date)}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <MapPin className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {batch.location}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <FileText className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {batch.notes || "-"}
          </span>
        </div>
      </div>

      {/* Detail Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-sm border border-base-200">
        {exmLoading ? (
          <LoadingIndicator />
        ) : exmError ? (
          <p className="text-error p-4">{exmError}</p>
        ) : (
          <table className="table w-full">
            <thead className="bg-primary/20 text-base-content">
              <tr className="text-center align-middle">
                <th>No</th>
                <th className="max-w-[200px]">Paket MCU</th>
                <th>Nomor Pegawai</th>
                <th>NIK</th>
                <th>Nama</th>
                <th>Gender</th>
                <th>Tanggal Lahir</th>
                <th>Usia</th>
                <th>Kontak</th>
                {/* <th>Aksi</th> */}
              </tr>
            </thead>
            <tbody className="align-middle">
              {examinations.map((exm, index) => (
                <tr key={exm.id} className="hover:bg-base-200">
                  <td className="text-center">{index + 1 + (page - 1) * 10}</td>
                  <td className="max-w-[200px] text-center">
                    {exm.mcu_package.name}
                    {exm.notes && (
                      <div className="text-xs text-base-content/70 mt-1">
                        Catatan: {exm.notes}
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    {exm.company_employee_id.employee_number}
                  </td>
                  <td className="text-center">{exm.company_employee_id.nik}</td>
                  <td>{exm.company_employee_id.name}</td>
                  <td className="text-center">
                    {exm.company_employee_id.gender}
                  </td>
                  <td className="text-center">{exm.company_employee_id.dob}</td>
                  <td className="text-center">
                    {exm.company_employee_id.age_detail}
                  </td>
                  <td className="text-center">
                    {exm.company_employee_id.phone_number}
                  </td>
                  {/* <td>
        <button className="btn btn-sm btn-primary">Detail</button>
      </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        page={page}
        lastPage={lastPage}
        onPageChange={handlePageChange}
        total={total}
      />
    </div>
  );
}
