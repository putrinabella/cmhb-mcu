import { useParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { getExaminationDetail } from "@/services/examinationsApi";
const PdfViewer = lazy(() => import("@/components/PdfViewer"));

export default function ExaminationDetailPage() {
  const { id: batchId, exmId } = useParams<{ id: string; exmId: string }>();
  const [examination, setExamination] = useState<any>(null);

  useEffect(() => {
    if (!batchId || !exmId) return;

    // Panggil API dengan batchId + exmId
    getExaminationDetail(batchId).then(setExamination);
  }, [batchId, exmId]);

  if (!examination) return <div>Loading...</div>;

  const employee = examination.company_employee;
  const pdfUrl = examination.result?.file_url || null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Detail Pemeriksaan</h1>
      <div className="mb-6 space-y-1">
        <p>
          <strong>Nama:</strong> {employee?.name || "-"}
        </p>
        <p>
          <strong>NIK:</strong> {employee?.nik || "-"}
        </p>
        <p>
          <strong>Nomor Pegawai:</strong> {employee?.employee_number || "-"}
        </p>
        <p>
          <strong>Gender:</strong> {employee?.gender || "-"}
        </p>
        <p>
          <strong>Tanggal Lahir:</strong> {employee?.dob}
        </p>
        <p>
          <strong>Paket MCU:</strong>{" "}
          {typeof examination.mcu_package === "string"
            ? examination.mcu_package
            : examination.mcu_package?.name}
        </p>
        {examination.notes && (
          <p>
            <strong>Catatan:</strong> {examination.notes}
          </p>
        )}
      </div>

      {pdfUrl ? (
        <Suspense fallback={<div>Loading PDF Viewer...</div>}>
          <PdfViewer fileUrl={pdfUrl} />
        </Suspense>
      ) : (
        <p className="text-gray-500">Belum ada hasil</p>
      )}
    </div>
  );
}
