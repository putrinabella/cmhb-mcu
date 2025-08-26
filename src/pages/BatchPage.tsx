import { Folder } from "lucide-react";
import { getBatch, type BatchItem } from "@/services/batchAPI";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import Pagination from "@/components/Pagination";
import { getDateIndonesianFormat } from "@/utils/dateUtils";
import { useNavigate } from "react-router-dom";
export default function BatchPage() {
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

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-primary">
        Batch MCU
      </h2>

      {loading && <LoadingIndicator />}
      {error && <p className="text-error text-center">{error}</p>}

      {!loading && !error && (
        <>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="group flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer bg-base-100 hover:bg-primary/30 transition-colors tooltip"
                onClick={() => navigate(`/batch/${batch.id}`)}
                data-tip={`${getDateIndonesianFormat(
                  batch.exam_date
                )} | Lokasi: ${batch.location}`}
              >
                <Folder className="w-12 h-12 text-yellow-400 group-hover:text-black transition-colors" />
                <span
                  className="mt-2 text-sm text-center font-medium truncate w-full text-base-content transition-colors"
                  title={batch.batch_code}
                >
                  {batch.batch_code}
                </span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            lastPage={lastPage}
            onPageChange={handlePageChange}
            total={total}
          />
        </>
      )}
    </div>
  );
}
