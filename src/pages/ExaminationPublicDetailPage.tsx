import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PdfViewer from "@/components/PdfViewer";
import {
  getExaminationDetail,
  downloadExaminationResult,
  isExaminationResultObject,
  type ExaminationDetail,
} from "@/services/employeesAccessApi";
import { HeartPlus, Pin } from "lucide-react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Header } from "@/components/Header";

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

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="p-6 text-error">{error}</div>;
  if (!exam) return <div className="p-6 text-error">Data tidak ditemukan</div>;
  console.log(exam);
  const fileName = `${exam.company_employee.nik} - ${exam.company_employee.name}.pdf`;

  return (
    <div className="bg-base-100 text-base-content p-6 space-y-6">
      <Header
        greeting="Hasil MCU"
        name={
          typeof exam.mcu_package === "string"
            ? exam.mcu_package
            : exam.mcu_package.name
        }
        icon={HeartPlus}
      />

      {fileUrl && fileBlob ? (
        <PdfViewer fileUrl={fileUrl} fileBlob={fileBlob} fileName={fileName} />
      ) : (
        <div className="bg-base-100 border-2 border-dashed border-primary/50 rounded-2xl p-6 shadow-md w-full">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <Pin className="w-6 h-6 text-primary" />
            {typeof exam.result === "string" ? exam.result : "Belum ada hasil"}
          </h2>
        </div>
      )}
    </div>
  );
}
