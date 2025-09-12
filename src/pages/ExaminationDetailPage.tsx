import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PdfViewer from "@/components/PdfViewer";
import {
  getExaminationDetail,
  downloadExaminationResult,
  isExaminationResultObject,
  type ExaminationDetail,
} from "@/services/employeesAccessApi";
import {
  CalendarDays,
  Fingerprint,
  HeartPlus,
  IdCard,
  Mars,
  Pin,
  User,
  Venus,
} from "lucide-react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Header } from "@/components/Header";
import { getDateIndonesianFormat } from "@/utils/dateUtils";

export default function ExaminationResultPage() {
  const { exmId } = useParams<{ exmId: string }>();
  const [exam, setExam] = useState<ExaminationDetail | null>(null);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileUrlRef = useRef<string | null>(null); // simpan supaya bisa direvoke di unmount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!exmId) {
      setError("ID pemeriksaan tidak ditemukan");
      setLoading(false);
      return;
    }

    console.log(exmId);
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await getExaminationDetail(exmId);
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
  }, [exmId]);

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
      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Nama */}
        <div className="order-1 flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <User className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {exam.company_employee.name}
          </span>
        </div>

        {/* NIK */}
        <div className="order-2 flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <IdCard className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {exam.company_employee.nik}
          </span>
        </div>

        {/* Nomor Pegawai */}
        <div className="order-3 flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <Fingerprint className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {exam.company_employee.employee_number}
          </span>
        </div>

        {/* Notes (posisi terakhir di mobile, row-span-2 di desktop) */}
        <div className="order-6 md:order-4 flex items-start gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200 md:row-span-2">
          <Pin className="w-6 h-6 text-primary mt-1" />
          <div>
            <p className="text-sm text-base-content/60">Catatan MCU</p>
            <p className="font-medium text-base-content">
              {exam.notes ?? "Tidak ada catatan"}
            </p>
          </div>
        </div>

        {/* Tanggal Lahir + Umur */}
        <div className="order-4 md:order-5 flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200 md:col-span-2">
          <CalendarDays className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content whitespace-pre-line md:whitespace-normal">
            {getDateIndonesianFormat(exam.company_employee.dob)}
            {"\n"}
            <span className="block md:inline text-sm md:text-base">
              ({exam.company_employee.age_detail})
            </span>
          </span>
        </div>

        {/* Gender */}
        <div className="order-5 md:order-6 flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          {exam.company_employee.gender === "Perempuan" ? (
            <Venus className="w-6 h-6 text-primary" />
          ) : (
            <Mars className="w-6 h-6 text-primary" />
          )}
          <span className="font-medium text-base-content">
            {exam.company_employee.gender}
          </span>
        </div>
      </div>

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
