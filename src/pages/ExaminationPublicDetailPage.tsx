import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PdfViewer from "@/components/PdfViewer";
import {
  getExaminationDetail,
  downloadExaminationResult,
  isExaminationResultObject,
  type ExaminationDetail,
} from "@/services/employeesAccessApi";

export default function ExaminationResultPage() {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<ExaminationDetail | null>(null);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileUrlRef = useRef<string | null>(null); // simpan supaya bisa direvoke di unmount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!examId) {
      setError("ID pemeriksaan tidak ditemukan");
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await getExaminationDetail(examId);
        if (!mounted) return;

        setExam(res.data);

        // cek apakah result adalah object (dengan id)
        if (isExaminationResultObject(res.data.result)) {
          const blob = await downloadExaminationResult(res.data.result.id);
          if (!mounted) {
            // kalau sudah unmounted, revoke blob url dan return
            const tmpUrl = URL.createObjectURL(blob);
            URL.revokeObjectURL(tmpUrl);
            return;
          }

          setFileBlob(blob);

          // buat object URL satu kali untuk viewer
          const url = URL.createObjectURL(blob);
          fileUrlRef.current = url;
          setFileUrl(url);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError("Gagal mengambil detail pemeriksaan");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [examId]);

  // revoke object URL hanya saat unmount komponen
  useEffect(() => {
    return () => {
      if (fileUrlRef.current) {
        try {
          URL.revokeObjectURL(fileUrlRef.current);
        } catch (e) {
          // ignore
        }
        fileUrlRef.current = null;
      }
    };
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-error">{error}</div>;
  if (!exam) return <div className="p-6 text-error">Data tidak ditemukan</div>;

  const fileName = `${exam.company_employee.nik} - ${exam.company_employee.name}.pdf`;

  return (
    <div className="p-6 space-y-4">
      {/* Identitas Pegawai */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-semibold text-lg mb-2">Identitas Pegawai</h2>
        <p>
          <strong>Nama:</strong> {exam.company_employee.name}
        </p>
        <p>
          <strong>NIK:</strong> {exam.company_employee.nik}
        </p>
        <p>
          <strong>Nomor Pegawai:</strong>{" "}
          {exam.company_employee.employee_number}
        </p>
        <p>
          <strong>Jenis Kelamin:</strong> {exam.company_employee.gender}
        </p>
        <p>
          <strong>Tanggal Lahir:</strong> {exam.company_employee.dob} (
          {exam.company_employee.age_detail})
        </p>
        <p>
          <strong>Perusahaan:</strong> {exam.company_employee.company_name}
        </p>
        <p>
          <strong>Paket MCU:</strong> {exam.mcu_package}
        </p>
        <p>
          <strong>Catatan:</strong> {exam.notes || "-"}
        </p>
      </div>

      {/* Hasil MCU */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-semibold text-lg mb-2">Hasil MCU</h2>

        {fileUrl && fileBlob ? (
          <PdfViewer
            fileUrl={fileUrl}
            fileBlob={fileBlob}
            fileName={fileName}
          />
        ) : (
          <div className="text-gray-500">
            {typeof exam.result === "string" ? exam.result : "Belum ada hasil"}
          </div>
        )}
      </div>
    </div>
  );
}
