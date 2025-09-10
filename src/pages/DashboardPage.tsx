import { useAuth } from "@/routes/AuthContext";
import { Activity, Folder, Pin } from "lucide-react";
import { getBatch, type BatchItem } from "@/services/batchAPI";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import Pagination from "@/components/Pagination";
import ExaminationHistory from "@/components/ExaminationHistory";
import { Header } from "@/components/Header";
export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: batches,
    loading,
    error,
    page,
    lastPage,
    total,
    handlePageChange,
  } = usePaginatedResource<BatchItem>({
    queryFn: getBatch,
    defaultParams: {},
  });

  if (!user) {
    return <LoadingIndicator />;
  }

  return (
    <div className="bg-base-100 text-base-content p-6 space-y-6">
      {/* Greeting Card */}
      <Header greeting="Selamat Datang," name={user.name} icon={Activity} />

      {/* Batch Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Section untuk Company PIC */}
        {user.role === "Company PIC" && (
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
                    data-tip={`${getDateIndonesianFormat(batch.exam_date)} | ${
                      batch.location
                    }`}
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
            <Pagination
              page={page}
              lastPage={lastPage}
              onPageChange={handlePageChange}
              total={total}
            />
          </div>
        )}

        {/* Section untuk Employee */}
        {user.role === "Employee" && (
          <div className="bg-base-100 border-2 border-dashed border-primary/50 rounded-2xl p-6 shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-base-content">
              <Pin className="w-6 h-6 text-primary" />
              Medical Check-Up
            </h2>
            <ExaminationHistory />
          </div>
        )}

        {/* Kalau role tidak sesuai */}
        {user.role !== "Company PIC" && user.role !== "Employee" && (
          <div className="bg-error/10 border-2 border-dashed border-error rounded-2xl p-6 shadow-md w-full text-center">
            <h2 className="text-xl font-semibold text-error">
              Anda tidak memiliki akses
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
