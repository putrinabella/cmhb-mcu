import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileInput } from "@/components/form/FileInput";
import { ExcelTable } from "@/components/ExcelTable";
import { useExcelData } from "@/hooks/use-excel";
import { useImportEmployees } from "@/hooks/use-import-employees";
import { Button } from "@/components/ui/button";
import { showSwal } from "@/lib/SwalHelper";
import { UploadCloud, X } from "lucide-react";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const employeeHeaders = [
  "employee_number",
  "nik",
  "name",
  "phone_number",
  "gender",
  "dob",
  "notes",
];

export default function BatchImportPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    data: excelData,
    handleFileUpload,
    resetData,
  } = useExcelData(employeeHeaders);
  const {
    importData,
    loading: loadingImport,
    errors,
  } = useImportEmployees(id || "");

  const handleImport = async () => {
    if (!selectedFile) {
      showSwal({
        icon: "warning",
        title: "Tidak ada file",
        text: "Silakan upload file Excel terlebih dahulu.",
      });
      return;
    }

    const success = await importData(selectedFile);

    if (success) {
      showSwal({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diimport.",
        timer: 2000,
        showConfirmButton: false,
      });
      resetData();
      navigate(`/batch/${id}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Import Karyawan</h1>
        <Button
          variant="outline"
          className="gap-2 rounded-lg bg-error/80 hover:bg-error border-0 text-base-content"
          onClick={() => navigate(-1)}
        >
          <X className="size-4" /> Kembali
        </Button>
      </div>

      <FileInput
        label="Upload File"
        infoText="Max size 2MB, format .xlsx/.xls"
        accept=".xlsx,.xls"
        onChange={(e) => {
          handleFileUpload(e);
          const file = e.target.files?.[0];
          if (file) setSelectedFile(file);
        }}
      />

      <div className="overflow-x-auto mt-4">
        <ExcelTable
          data={excelData}
          headers={employeeHeaders}
          errors={errors}
        />
      </div>

      <div className="flex justify-end">
        <Button
          disabled={loadingImport}
          className="gap-2 rounded-lg bg-primary/20 hover:bg-primary/80 text-base-content"
          onClick={handleImport}
        >
          {loadingImport && <LoadingIndicator />}
          <UploadCloud className="size-4" /> Import Data
        </Button>
      </div>
    </div>
  );
}
