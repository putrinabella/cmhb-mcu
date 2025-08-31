import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";

interface Props {
  examinations: ExaminationItem[];
  page: number;
}

export default function BatchDetailDesktop({ examinations, page }: Props) {
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
            <th>Usia</th>
            <th>Kontak</th>
          </tr>
        </thead>
        <tbody className="align-middle">
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
              </td>
              <td className="text-center">
                {exm.company_employee_id.age_detail}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
