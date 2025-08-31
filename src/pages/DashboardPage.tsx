import { useAuth } from "@/routes/AuthContext";
import { Activity, Folder, Pin } from "lucide-react";
import { getBatch, type BatchItem } from "@/services/batchAPI";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import { List } from "@/components/List";
import React, { Suspense } from "react";

const PdfViewer = React.lazy(() => import("@/components/PdfViewer"));

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: batches,
    loading,
    error,
  } = usePaginatedResource<BatchItem>({
    queryFn: getBatch,
    defaultParams: {},
  });

  const historyData = Array.from({ length: 5 }, (_, i) => {
    const id = i + 1;
    const day = (i % 28) + 1;
    const month = "Agustus";
    const year = 2025;
    const hour = String((8 + i) % 24).padStart(2, "0");
    const minute = String((i * 7) % 60).padStart(2, "0");

    return {
      id,
      title: `MCU Event ${id}`,
      timestamp: `${day} ${month} ${year}, ${hour}:${minute}`,
    };
  });

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-base-content">
        <p className="text-lg">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content p-6 space-y-6">
      {/* Greeting Card */}
      <div className="relative bg-primary/20 rounded-2xl p-6 flex items-center shadow-md">
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-base-content">
            Hi {user.name}
          </h1>
          <p className="text-base-content/70 text-sm mt-1">
            {/* Selamat datang kembali! Lihat daftar batch MCU terbaru di bawah ini. */}
          </p>
        </div>
        <div className="absolute right-4 -top-6 w-20 h-20 sm:right-10 sm:-top-10 sm:w-32 sm:h-32 opacity-60">
          <Activity className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Batch Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batch MCU */}
        <div className="bg-base-100 border-2 border-dashed border-primary/50 rounded-2xl p-6 shadow-md w-full">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-base-content">
            <Pin className="w-6 h-6 text-primary" />
            Batch MCU
          </h2>

          {/* Loading / Error States */}
          {loading && <LoadingIndicator />}
          {error && <p className="text-error text-center">{error}</p>}

          {/* Grid Data */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="group flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer bg-base-100 hover:bg-primary hover:text-primary-content shadow-sm transition-all duration-200 tooltip tooltip-bottom"
                  data-tip={`${getDateIndonesianFormat(
                    batch.exam_date
                  )} | Lokasi: ${batch.location}`}
                  onClick={() => navigate(`/dashboard/batch/${batch.id}`)}
                >
                  <Folder className="w-12 h-12 text-yellow-400 group-hover:text-yellow-100 transition-colors" />
                  <span
                    className="mt-2 text-sm text-center font-medium truncate w-full transition-colors"
                    title={batch.batch_code}
                  >
                    {batch.batch_code}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History List */}
        <div className="bg-base-100 border-2 border-dashed border-primary/50 rounded-2xl p-6 shadow-md w-full">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-base-content">
            <Pin className="w-6 h-6 text-primary" />
            Hasil Medical Check-Up
          </h2>
          <List items={historyData} />
        </div>
      </div>

      <div className="pt-4">
        <Suspense fallback={<div>Loading PDF Viewer...</div>}>
          <PdfViewer fileUrl="/docs/Dummy.pdf" />
        </Suspense>
      </div>
    </div>
  );
}
