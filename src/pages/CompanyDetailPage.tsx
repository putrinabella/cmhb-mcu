import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyDetail, type CompanyItem } from "@/services/companiesAPI";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCompanyDetail(id)
      .then((res) => setCompany(res.data))
      .catch((err) => setError(err.message || "Terjadi kesalahan"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!company) return <p>Perusahaan tidak ditemukan.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <p>Kode: {company.code}</p>
      <p>Alamat: {company.address}</p>
      <p>Telp: {company.phone}</p>
      <p>Email: {company.email}</p>
    </div>
  );
}
