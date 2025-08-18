import { getCompanies, type CompanyItem } from "@/services/companiesAPI";
import Pagination from "@/components/Pagination";
import { usePaginatedResource } from "@/hooks/use-paginated-resource";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "@/components/LoadingIndicator";
export default function CompaniesPage() {
  const {
    data: companies,
    loading,
    error,
    page,
    lastPage,
    total,
    refetch,
    invalidateCache,
    handlePageChange,
  } = usePaginatedResource<CompanyItem>({
    queryFn: getCompanies,
    defaultParams: {
      per_page: 10,
      sort_by: "name",
      sort_order: "asc",
    },
  });
  const navigate = useNavigate();
  return (
    <div className="p-8 mx-auto min-h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold mb-4">Daftar Perusahaan</h1>

      <div className="flex gap-2 mb-4">
        <button className="btn btn-sm" onClick={() => refetch()}>
          🔄 Refresh
        </button>

        <button className="btn btn-sm" onClick={invalidateCache}>
          ❌ Clear Cache
        </button>
      </div>

      {loading && <LoadingIndicator />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="space-y-2 mb-6">
            {companies.map((company) => (
              <li
                key={company.id}
                className="p-4 border rounded-lg shadow-sm bg-base-200 cursor-pointer hover:bg-base-300 transition"
                onClick={() => navigate(`/company-profile/${company.id}`)} // navigasi ke detail
              >
                <h2 className="font-semibold">{company.name}</h2>
                <p>Kode: {company.code}</p>
                <p>Alamat: {company.address}</p>
                <p>Telp: {company.phone}</p>
                <p>Email: {company.email}</p>
              </li>
            ))}
          </ul>

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
