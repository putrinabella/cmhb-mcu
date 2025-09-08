import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import type { ExaminationItem } from "@/services/examinationsApi";
import { Calendar, Fingerprint, IdCard, Phone, HeartPulse } from "lucide-react";

interface Props {
  examinations: ExaminationItem[];
  page: number;
}

export default function BatchDetailMobile({ examinations, page }: Props) {
  return (
    <div className="block md:hidden space-y-3 py-4">
      {examinations.map((exm, index) => (
        <div
          key={exm.id}
          className="rounded-2xl border border-base-300 shadow-sm bg-base-100 overflow-hidden"
        >
          <div className="bg-primary/20 px-3 py-2">
            <h2 className="font-semibold text-base text-base-content">
              {index + 1 + (page - 1) * 10}. {exm.company_employee.name}
            </h2>
            <p className="text-xs text-base-content/70 mt-0.5">
              {exm.company_employee.gender} • {exm.company_employee.age_detail}
            </p>
          </div>

          <div className="p-3 space-y-2 text-sm">
            <div className="flex items-center text-base-content">
              <Fingerprint size={16} className="mr-2 text-primary" />
              <span>NIK: {exm.company_employee.nik}</span>
            </div>
            <div className="flex items-center text-base-content">
              <IdCard size={16} className="mr-2 text-primary" />
              <span>No Peg: {exm.company_employee.employee_number}</span>
            </div>
            <div className="flex items-center text-base-content">
              <Calendar size={16} className="mr-2 text-primary" />
              <span>
                Lahir: {getDateIndonesianFormat(exm.company_employee.dob)}
              </span>
            </div>
            <div className="flex items-center text-base-content">
              <Phone size={16} className="mr-2 text-primary" />
              {exm.company_employee.phone_number ? (
                <a
                  href={formatWhatsappLink(exm.company_employee.phone_number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {exm.company_employee.phone_number}
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
              <span className="break-words leading-tight">
                {exm.mcu_package.name}
              </span>
            </div>
            {exm.notes && (
              <p className="text-xs italic text-base-content/70">
                Catatan: {exm.notes}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
