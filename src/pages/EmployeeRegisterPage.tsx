import { useExcelData } from "@/hooks/use-excel";
import { FileInput } from "@/components/form/FileInput";
import { ExcelTable } from "@/components/ExcelTable";
import { Button } from "@/components/ui/button";

export default function EmployeeRegisterPage() {
  const templateHeader = ["Nama", "Tanggal Lahir", "Nomor Telepon", "Email"];
  const { data, downloadTemplate, handleFileUpload } =
    useExcelData(templateHeader);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto ">
      <h3 className="text-3xl font-bold mb-6 text-center">
        Input Data Pegawai
      </h3>

      {/* Tombol Download Template */}
      <div className="mb-6 flex justify-center">
        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={downloadTemplate}
        >
          Download Template Excel
        </Button>
      </div>

      {/* Input File */}
      <FileInput
        label="Upload Excel File"
        infoText="Max size 2MB, format .xlsx/.xls"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />

      {/* Tabel Data Excel */}
      <ExcelTable data={data} headers={templateHeader} />
    </div>
  );
}
