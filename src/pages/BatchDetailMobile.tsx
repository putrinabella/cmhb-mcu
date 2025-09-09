import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";
import { useToggleExaminationAccess } from "@/hooks/use-examination-access";
import { downloadExaminationResult } from "@/services/employeeAPI";
import {
  Calendar,
  Fingerprint,
  IdCard,
  Phone,
  HeartPulse,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Props {
  examinations: ExaminationItem[];
}

export default function BatchDetailMobile({ examinations }: Props) {
  const initialAccess = examinations.map((ex: any) => ({
    id: ex.id,
    isVisibleToEmployee:
      ex.is_visible_to_employee === 1 || ex.isVisibleToEmployee === 1,
  }));

  const { accessState, toggleAccess, loadingIds } =
    useToggleExaminationAccess(initialAccess);

  const handleViewResult = async (id: string) => {
    try {
      const blob = await downloadExaminationResult(id);
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Gagal memuat hasil pemeriksaan.");
    }
  };

  if (!examinations || examinations.length === 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        Tidak ada data pemeriksaan.
      </p>
    );
  }

  return (
    <div className="block md:hidden space-y-3 py-4">
      {examinations.map((exm, index) => {
        const employee = exm.company_employee;
        const resultObj =
          typeof exm.result === "object" &&
          exm.result !== null &&
          "id" in exm.result
            ? exm.result
            : null;

        return (
          <div
            key={exm.id}
            className="rounded-2xl border border-base-300 shadow-sm bg-base-100 overflow-hidden"
          >
            <div className="bg-primary/20 px-3 py-2">
              <h2 className="font-semibold text-base text-base-content">
                {index + 1}. {employee?.name || "-"}
              </h2>
              <p className="text-xs text-base-content/70 mt-0.5">
                {employee?.gender || "-"} • {employee?.age_detail || "-"}
              </p>
            </div>

            <div className="p-3 space-y-2 text-sm">
              <div className="flex items-center text-base-content">
                <Fingerprint size={16} className="mr-2 text-primary" />
                <span>NIK: {employee?.nik || "-"}</span>
              </div>
              <div className="flex items-center text-base-content">
                <IdCard size={16} className="mr-2 text-primary" />
                <span>No Peg: {employee?.employee_number || "-"}</span>
              </div>
              <div className="flex items-center text-base-content">
                <Calendar size={16} className="mr-2 text-primary" />
                <span>
                  Lahir:{" "}
                  {employee?.dob ? getDateIndonesianFormat(employee.dob) : "-"}
                </span>
              </div>
              <div className="flex items-center text-base-content">
                <Phone size={16} className="mr-2 text-primary" />
                {employee?.phone_number ? (
                  <a
                    href={formatWhatsappLink(employee.phone_number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {employee.phone_number}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>

              <hr className="border-base-300" />

              <div className="flex items-start text-base-content">
                <HeartPulse
                  size={16}
                  className="mr-2 mt-0.5 text-primary flex-shrink-0"
                />
                <span
                  className={`break-words leading-tight ${
                    !exm.mcu_package?.name ? "text-red-600 font-bold" : ""
                  }`}
                >
                  {exm.mcu_package?.name || "Paket MCU Belum Ditentukan"}
                </span>
              </div>

              {exm.notes && (
                <p className="text-xs italic text-base-content/70">
                  Catatan: {exm.notes}
                </p>
              )}

              {/* Tombol Lihat Hasil */}
              <div className="mt-2">
                {resultObj ? (
                  <button
                    className="btn btn-sm w-full rounded-full text-base-content bg-primary/20"
                    onClick={() => handleViewResult(resultObj.id)}
                  >
                    Lihat Hasil
                  </button>
                ) : (
                  <span className="text-gray-500">Belum ada hasil</span>
                )}
              </div>

              {/* Tombol Hak Akses */}
              <div className="mt-2">
                <button
                  className={`btn btn-sm flex items-center gap-2 w-full rounded-full text-base-content ${
                    accessState[exm.id] ? "bg-primary/20" : "bg-secondary/5"
                  }`}
                  disabled={loadingIds.has(exm.id)}
                  onClick={() => toggleAccess(exm.id)}
                >
                  {accessState[exm.id] ? (
                    <>
                      <CheckCircle size={16} /> Hasil dapat diakses pegawai
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Hasil tidak dapat diakses pegawai
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
