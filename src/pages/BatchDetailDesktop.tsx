import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";
import { downloadExaminationResult } from "@/services/employeeAPI";

interface Props {
  examinations: ExaminationItem[];
  page: number;
  perPage?: number;
}

export default function BatchDetailDesktop({
  examinations,
  page,
  perPage = 10,
}: Props) {
  const handleDownload = async (id: string, filename: string) => {
    try {
      const blob = await downloadExaminationResult(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal mendownload hasil pemeriksaan.");
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
    <div className="hidden md:block overflow-x-auto">
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
            <th>Kontak</th>
            <th>Hasil</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {examinations.map((exm, index) => {
            const employee = exm.company_employee;
            const packageName =
              typeof exm.mcu_package === "string"
                ? exm.mcu_package
                : exm.mcu_package?.name || "-";

            // Type guard untuk result
            const resultObj =
              typeof exm.result === "object" &&
              exm.result !== null &&
              "id" in exm.result
                ? exm.result
                : null;

            return (
              <tr key={exm.id} className="hover:bg-base-200">
                <td className="text-center">
                  {index + 1 + (page - 1) * perPage}
                </td>
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
                <td className="text-center flex flex-col gap-1">
                  {resultObj ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        handleDownload(
                          resultObj.id,
                          `${employee?.nik || "unknown"} - ${
                            employee?.name || "hasil"
                          }.pdf`
                        )
                      }
                    >
                      Lihat Hasil
                    </button>
                  ) : (
                    <span className="text-gray-500">Belum ada hasil</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
