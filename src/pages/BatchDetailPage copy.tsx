import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBatchDetail, type BatchItem } from "@/services/batchAPI";
import {
  FolderOpen,
  Calendar,
  MapPin,
  FileText,
  IdCard,
  Phone,
  HeartPulse,
  Fingerprint,
} from "lucide-react";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import { formatWhatsappLink } from "@/utils/whatsappUtils";
import {
  getExamination,
  type ExaminationItem,
} from "@/services/examinationsApi";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import Pagination from "@/components/Pagination";

//
import { Button } from "@/components/ui/button";
import { Download, Search, Upload, UploadCloud, X } from "lucide-react";
import { FileInput } from "@/components/form/FileInput";
import { ExcelTable } from "@/components/ExcelTable";
import { useExcelData, templateHeader } from "@/hooks/use-excel";
import { useImportEmployees } from "@/hooks/use-import-employees";
import { downloadEmployeeTemplate } from "@/services/employeeAPI";
import { useFileDownload } from "@/hooks/use-file-download";
import { showSwal } from "@/lib/SwalHelper";
//

export default function BatchDetailLayout() {
  const { id } = useParams<{ id: string }>();
  const [batch, setBatch] = useState<BatchItem | null>(null);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchError, setBatchError] = useState<string | null>(null);

  // here
  const [searchKey, setSearchKey] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { data: excelData, handleFileUpload, resetData } = useExcelData();
  const { importData, loading: loadingImport } = useImportEmployees();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSearchButton = () => {
    handleSearch(searchKey);
    invalidateCache();
  };
  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadEmployeeTemplate();
      downloadBlob(blob, "employee_template.xlsx");
      showSwal({
        icon: "success",
        title: "Berhasil",
        text: "Template berhasil diunduh!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      showSwal({
        icon: "error",
        title: "Gagal",
        text: "Download gagal!",
        confirmButtonText: "Coba lagi",
      });
    }
  };
  const handleImport = async () => {
    if (!selectedFile) {
      showSwal({
        icon: "warning",
        title: "Tidak ada file",
        text: "Silakan upload file Excel terlebih dahulu.",
        confirmButtonText: "Mengerti",
      });
      return;
    }

    const success = await importData(selectedFile);
    if (success) {
      setOpenModal(false);
      setSelectedFile(null);
      resetData();
      invalidateCache();
    }
  };

  const handleResetSearch = () => {
    setSearchKey("");
    resetSearch();
    invalidateCache();
  };

  const { downloadBlob } = useFileDownload();
  // end here
  useEffect(() => {
    if (!id) return;
    setBatchLoading(true);
    getBatchDetail(id)
      .then((res) => setBatch(res.data))
      .catch((err) => setBatchError(err.message || "Terjadi kesalahan"))
      .finally(() => setBatchLoading(false));
  }, [id]);

  const {
    data: examinations,
    loading: exmLoading,
    error: exmError,
    page,
    lastPage,
    total,
    handleSearch,
    handlePageChange,
    resetSearch,
    invalidateCache,
  } = usePaginatedResource<ExaminationItem>({
    queryFn: getExamination,
    defaultParams: {},
  });

  if (batchLoading) return <LoadingIndicator />;
  if (batchError) return <p className="text-error">{batchError}</p>;
  if (!batch) return <p>Batch tidak ditemukan.</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="relative bg-primary/20 rounded-lg p-6 overflow-visible flex items-center">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-base-content">
            Batch {batch.batch_code}
          </h1>
        </div>
        <div className="absolute right-4 -top-6 w-20 h-20 sm:right-10 sm:-top-10 sm:w-32 sm:h-32 flex items-center justify-center opacity-60">
          <FolderOpen className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <Calendar className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {getDateIndonesianFormat(batch.exam_date)}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <MapPin className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {batch.location}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <FileText className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {batch.notes || "-"}
          </span>
        </div>
      </div>

      {/* Detail Table */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch m-0 gap-2">
        {/* Teks di kiri */}
        <div className="hidden md:flex flex-1 items-center overflow-hidden bg-primary/20 rounded-t-4xl justify-center border-t border-l border-r border-gray-300">
          <p className="break-words p-4 font-bold text-center sm:text-left">
            Daftar Karyawan
          </p>
        </div>

        {/* Tombol dan search di kanan */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mb-2 w-full sm:w-auto">
          {/* Search bar */}
          <div className="flex w-full sm:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="input input-ghost rounded-l-full w-full border border-gray-300 h-10 pr-10"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              {searchKey && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                  title="Reset"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="button"
              className="bg-primary text-primary-content hover:bg-primary-focus rounded-r-full h-10 flex items-center gap-2 px-4 w-auto"
              onClick={handleSearchButton}
            >
              <Search className="size-5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          {/* Baris kedua di mobile: download dan import sejajar */}
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Tombol Download */}
            <div
              className="tooltip flex-1 sm:flex-none"
              data-tip="Download Template"
            >
              <Button
                type="button"
                className="bg-primary text-primary-content hover:bg-primary-focus rounded-full h-10 flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={handleDownloadTemplate}
              >
                <Download className="size-5" />
                <span>Download</span>
              </Button>
            </div>

            {/* Tombol Import */}
            <div className="tooltip flex-1 sm:flex-none" data-tip="Import File">
              <Button
                type="button"
                className="bg-primary text-primary-content hover:bg-primary-focus rounded-full h-10 flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => setOpenModal(true)}
              >
                <Upload className="size-5" />
                <span>Import</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-6xl">
              <div className="py-4">
                <FileInput
                  label="Upload File"
                  infoText="Max size 2MB, format .xlsx/.xls"
                  accept=".xlsx,.xls"
                  onChange={(e) => {
                    handleFileUpload(e);
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                />
                <div className="overflow-x-auto mt-4">
                  <ExcelTable data={excelData} headers={templateHeader} />
                </div>
              </div>
              <div className="modal-action flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="gap-2 rounded-lg bg-error text-white hover:opacity-90"
                  onClick={() => setOpenModal(false)}
                >
                  <X className="size-4" />
                  Close
                </Button>

                <Button
                  disabled={loadingImport}
                  className="gap-2 rounded-lg bg-primary text-white hover:opacity-90"
                  onClick={handleImport}
                >
                  {loadingImport ? <LoadingIndicator /> : null}
                  <UploadCloud className="size-4" />
                  Import Data
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-bl-lg rounded-br-lg rounded-tr-lg md:border-l md:border-r md:border-b md:border-gray-300">
        {exmLoading ? (
          <LoadingIndicator />
        ) : exmError ? (
          <p className="text-error p-4">{exmError}</p>
        ) : (
          <>
            {/* Tabel untuk desktop */}
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
                      <td className="text-center">
                        {index + 1 + (page - 1) * 10}
                      </td>
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
                      <td className="text-center">
                        {exm.company_employee_id.nik}
                      </td>
                      <td>{exm.company_employee_id.name}</td>
                      <td className="text-center">
                        {exm.company_employee_id.gender}
                      </td>
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

            {/* Card-style untuk mobile */}
            <div className="block md:hidden space-y-3 py-4">
              {examinations.map((exm, index) => (
                <div
                  key={exm.id}
                  className="rounded-2xl border border-base-300 shadow-sm bg-base-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-primary/20 px-3 py-2">
                    <h2 className="font-semibold text-base text-base-content">
                      {index + 1 + (page - 1) * 10}.{" "}
                      {exm.company_employee_id.name}
                    </h2>
                    <p className="text-xs text-base-content/70 mt-0.5">
                      {exm.company_employee_id.gender} •{" "}
                      {exm.company_employee_id.age_detail}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-3 space-y-2 text-sm">
                    {/* NIK */}
                    <div className="flex items-center text-base-content">
                      <Fingerprint size={16} className="mr-2 text-primary" />
                      <span>NIK: {exm.company_employee_id.nik}</span>
                    </div>

                    {/* Nomor Pegawai */}
                    <div className="flex items-center text-base-content">
                      <IdCard size={16} className="mr-2 text-primary" />
                      <span>
                        No Peg: {exm.company_employee_id.employee_number}
                      </span>
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="flex items-center text-base-content">
                      <Calendar size={16} className="mr-2 text-primary" />
                      <span>
                        Lahir:{" "}
                        {getDateIndonesianFormat(exm.company_employee_id.dob)}
                      </span>
                    </div>

                    {/* Kontak */}
                    <div className="flex items-center text-base-content">
                      <Phone size={16} className="mr-2 text-primary" />
                      {exm.company_employee_id.phone_number ? (
                        <a
                          href={formatWhatsappLink(
                            exm.company_employee_id.phone_number
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {exm.company_employee_id.phone_number}
                        </a>
                      ) : (
                        <span>-</span>
                      )}
                    </div>

                    <hr className="border-base-300" />

                    {/* Paket MCU */}
                    <div className="flex items-start text-base-content">
                      <HeartPulse
                        size={16}
                        className="mr-2 mt-0.5 text-primary flex-shrink-0"
                      />
                      <span className="break-words leading-tight">
                        {exm.mcu_package.name}
                      </span>
                    </div>

                    {/* Catatan */}
                    {exm.notes && (
                      <p className="text-xs italic text-base-content/70">
                        Catatan: {exm.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Pagination
        page={page}
        lastPage={lastPage}
        onPageChange={handlePageChange}
        total={total}
      />
    </div>
  );
}
