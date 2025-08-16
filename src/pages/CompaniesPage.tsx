import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCompanies, type CompanyItem } from "@/services/companiesAPI";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPage, setLastPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getCompanies({
          page,
          per_page: 10,
          sort_by: "name",
          sort_order: "asc",
        });
        setCompanies(res.data.data);
        setLastPage(res.data.last_page);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setSearchParams({ page: String(newPage) });
    }
  };

  return (
    <div className="p-8 mx-auto min-h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold mb-4">Daftar Perusahaan</h1>

      {loading && <p>Memuat data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="space-y-2 mb-6">
            {companies.map((company) => (
              <li
                key={company.id}
                className="p-4 border rounded-lg shadow-sm bg-base-200"
              >
                <h2 className="font-semibold">{company.name}</h2>
                <p>Kode: {company.code}</p>
                <p>Alamat: {company.address}</p>
                <p>Telp: {company.phone}</p>
                <p>Email: {company.email}</p>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              «
            </button>

            {Array.from({ length: lastPage }, (_, i) => i + 1)
              .slice(0, 5)
              .map((p) => (
                <button
                  key={p}
                  className={`join-item btn ${p === page ? "btn-active" : ""}`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              ))}

            {lastPage > 5 && (
              <>
                <button className="join-item btn btn-disabled">...</button>
                <button
                  className={`join-item btn ${
                    lastPage === page ? "btn-active" : ""
                  }`}
                  onClick={() => handlePageChange(lastPage)}
                >
                  {lastPage}
                </button>
              </>
            )}

            <button
              className="join-item btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === lastPage}
            >
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
}
