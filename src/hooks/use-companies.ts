// hooks/useCompanies.ts
import { useEffect, useState } from "react";
import { getCompanyList, type CompanyItem } from "@/services/companiesListAPI";

export function useCompanies(search?: string) {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!search || search.length < 2) {
      setCompanies([]);
      return;
    }

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await getCompanyList(search);
        console.log("Companies API result:", res); // 👈 cek di console
        setCompanies(res ?? []);
      } catch (err: any) {
        setError(err.message ?? "Gagal memuat data perusahaan");
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [search]);

  return { companies, loading, error };
}
