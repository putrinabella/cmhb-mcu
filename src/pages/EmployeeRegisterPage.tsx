import { useState } from "react";
import { FileInput } from "@/components/form/FileInput";
import { ExcelTable } from "@/components/ExcelTable";
import { Button } from "@/components/ui/button";
import { Download, Search, Upload, UploadCloud, X } from "lucide-react";
import { useImportEmployees } from "@/hooks/use-import-employees";
import { useExcelData, templateHeader } from "@/hooks/use-excel";
import { useFileDownload } from "@/hooks/use-file-download";
import {
  downloadEmployeeTemplate,
  getEmployees,
  type EmployeeItem,
} from "@/services/employeeAPI";
import { showSwal } from "@/lib/SwalHelper";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import Pagination from "@/components/Pagination";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import { formatWhatsappLink } from "@/utils/whatsappUtils";
import { useAuth } from "@/routes/AuthContext";

export default function EmployeeRegisterPage() {
  const { downloadBlob } = useFileDownload();
  const { data: excelData, handleFileUpload, resetData } = useExcelData();
  const { importData, loading: loadingImport } = useImportEmployees();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useAuth();
  const {
    data: employees,
    loading,
    error,
    page,
    lastPage,
    total,
    handlePageChange,
    handleSearch,
    resetSearch,
    invalidateCache,
  } = usePaginatedResource<EmployeeItem>({
    queryFn: getEmployees,
    defaultParams: {
      per_page: 10,
      sort_by: "name",
      sort_order: "asc",
    },
  });

  const handleSearchButton = () => {
    handleSearch(searchKey);
    invalidateCache();
  };

  const handleResetSearch = () => {
    setSearchKey("");
    resetSearch();
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

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-base-content">
        <p className="text-lg">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content p-2">
      <h3 className="text-3xl mb-6">Data Pegawai</h3>
      <div className="flex justify-between items-stretch">
        {/* Teks di kiri */}
        <div className="flex-1 flex items-center overflow-hidden bg-base-200/40 rounded-t-4xl p-2 justify-center">
          <p className="break-words p-4 just">{user.company?.name || "-"}</p>
        </div>

        {/* Tombol di kanan */}
        <div className="flex-shrink-0 flex gap-2 items-center px-2">
          <div className="flex gap-2 items-center">
            {/* Input + X */}
            <div className="flex items-center">
              {/* Input + Reset X */}
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

              {/* Tombol Search */}
              <Button
                type="button"
                className="bg-accent text-accent-content hover:bg-accent-focus rounded-r-full h-10 flex items-center gap-2"
                onClick={handleSearchButton}
              >
                <Search className="size-5" />
                Search
              </Button>
            </div>

            {/* Tombol Download */}
            <div className="tooltip" data-tip="Download template Excel">
              <Button
                type="button"
                className="bg-primary text-primary-content hover:bg-primary-focus rounded-full h-10 flex items-center gap-2"
                onClick={handleDownloadTemplate}
              >
                <Download className="size-5" />
                Download Template
              </Button>
            </div>
          </div>

          <div className="tooltip" data-tip="Upload File Excel">
            <Button
              type="button"
              className="bg-secondary text-accent-content hover:bg-accent-focus rounded-full gap-2"
              onClick={() => setOpenModal(true)}
            >
              <Upload className="size-5" />
              Import
            </Button>
          </div>

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
      </div>

      {/* Konten bawah */}
      <div className="bg-base-200/40 rounded-4xl rounded-tl-none">
        <div className="p-4 ">
          {loading && <LoadingIndicator />}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="overflow-x-auto mb-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor Pegawai</th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>No. HP</th>
                    <th>Tanggal Lahir</th>
                    <th>Usia</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, idx) => (
                    <tr className="hover:bg-secondary" key={emp.id}>
                      <td>{(page - 1) * 10 + idx + 1}</td>
                      <td>{emp.employee_number}</td>
                      <td>{emp.nik}</td>
                      <td>{emp.name}</td>
                      <td>
                        {emp.phone_number ? (
                          <a
                            href={formatWhatsappLink(emp.phone_number)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:underline"
                          >
                            {emp.phone_number}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {emp.dob ? getDateIndonesianFormat(emp.dob) : "-"}
                      </td>
                      <td>{emp.age_detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {employees.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Tidak ada data pegawai
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            page={page}
            lastPage={lastPage}
            onPageChange={handlePageChange}
            total={total}
          />
        </div>
      </div>
      <div className="bg-base-200/40 rounded-4xl rounded-tl-none">
        {/* Loading / Error */}

        {/* Employee Table */}
      </div>
    </div>
  );
}
