import { useParams } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { getBatchDetail, type BatchItem } from "@/services/batchAPI";
import {
  FolderOpen,
  Calendar,
  MapPin,
  FileText,
  Download,
  Search,
  Upload,
  X,
  FolderCog,
} from "lucide-react";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { downloadEmployeeTemplate } from "@/services/employeeAPI";
import { useFileDownload } from "@/hooks/use-file-download";
import { showSwal } from "@/lib/SwalHelper";
import { useIsMobile } from "@/hooks/use-mobile";
import { capitalizeEachWord } from "@/utils/stringUtils";

const BatchDetailDesktop = lazy(() => import("../pages/BatchDetailDesktop"));
const BatchDetailMobile = lazy(() => import("../pages/BatchDetailMobile"));

export default function BatchDetailLayout() {
  const { id } = useParams<{ id: string }>();
  const [batch, setBatch] = useState<BatchItem | null>(null);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { downloadBlob } = useFileDownload();

  // ambil batch detail + examinations
  useEffect(() => {
    if (!id) return;
    setBatchLoading(true);
    getBatchDetail(id)
      .then((res) => setBatch(res.data))
      .catch((err) => setBatchError(err.message || "Terjadi kesalahan"))
      .finally(() => setBatchLoading(false));
  }, [id]);

  const handleSearchButton = () => {
    // filter sederhana di client-side
    if (!batch) return;
    if (!searchKey) return;
    const filtered = {
      ...batch,
      examinations: batch.examinations.filter((exm: any) =>
        JSON.stringify(exm).toLowerCase().includes(searchKey.toLowerCase())
      ),
    };
    setBatch(filtered);
  };

  const handleResetSearch = () => {
    setSearchKey("");
    if (!id) return;
    // reload ulang batch dari API
    setBatchLoading(true);
    getBatchDetail(id)
      .then((res) => setBatch(res.data))
      .catch((err) => setBatchError(err.message || "Terjadi kesalahan"))
      .finally(() => setBatchLoading(false));
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <FolderCog className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {capitalizeEachWord(batch.status) || "-"}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
          <FileText className="w-6 h-6 text-primary" />
          <span className="font-medium text-base-content">
            {batch.notes || "-"}
          </span>
        </div>
      </div>

      {/* Search + actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch m-0 gap-2">
        <div className="hidden md:flex flex-1 items-center overflow-hidden bg-primary/20 rounded-t-4xl justify-center border-t border-l border-r border-gray-300">
          <p className="break-words p-4 font-bold text-center sm:text-left">
            Daftar Karyawan
          </p>
        </div>

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
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content hover:text-red-500"
                  title="Reset"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="button"
              className="bg-primary/20 text-base-content hover:bg-primary-focus rounded-r-full h-10 flex items-center gap-2 px-4 w-auto"
              onClick={handleSearchButton}
            >
              <Search className="size-5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Download */}
            <div
              className="tooltip flex-1 sm:flex-none"
              data-tip="Download Template"
            >
              <Button
                type="button"
                className="bg-primary/20 text-base-content hover:bg-primary-focus rounded-full h-10 flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={handleDownloadTemplate}
              >
                <Download className="size-5" />
                <span>Download</span>
              </Button>
            </div>

            {/* Import */}
            <div className="tooltip flex-1 sm:flex-none" data-tip="Import File">
              <Button
                type="button"
                className="bg-primary/20 text-base-content hover:bg-primary-focus rounded-full h-10 flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => navigate(`/dashboard/batch/${id}/import`)}
              >
                <Upload className="size-5" />
                <span>Import</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="overflow-x-auto bg-base-100 rounded-bl-lg rounded-br-lg rounded-tr-lg md:border-l md:border-r md:border-b md:border-gray-300">
        <Suspense fallback={<LoadingIndicator />}>
          {isMobile ? (
            <BatchDetailMobile examinations={batch.examinations || []} />
          ) : (
            <BatchDetailDesktop examinations={batch.examinations || []} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
