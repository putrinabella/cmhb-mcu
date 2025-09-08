import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";
import { downloadExaminationResult } from "@/services/employeeAPI";
interface Props {
  examinations: ExaminationItem[];
  page: number;
}

export default function BatchDetailDesktop({ examinations, page }: Props) {
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
  return (
    <div className="hidden md:block">
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
          <div>
            <pre>{JSON.stringify(examinations, null, 2)}</pre>
          </div>

          {examinations.map((exm, index) => (
            <tr key={exm.id} className="hover:bg-base-200">
              <td className="text-center">{index + 1 + (page - 1) * 10}</td>
              <td className="max-w-[200px]">
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
              <td className="text-center">{exm.company_employee_id.gender}</td>
              <td className="text-center">
                {getDateIndonesianFormat(exm.company_employee_id.dob)}
                <br className="m-0 p-0" />
                <small> {exm.company_employee_id.age_detail}</small>{" "}
              </td>
              <td>
                {exm.company_employee_id.phone_number ? (
                  <a
                    href={formatWhatsappLink(
                      exm.company_employee_id.phone_number
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exm.company_employee_id.phone_number}
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    handleDownload(
                      exm.id,
                      `${exm.company_employee_id.name}-hasil.xlsx`
                    )
                  }
                >
                  Lihat Hasil
                </button>
                <button>Hak Akses Hasil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
