import Tabs from "@/components/Tabs";

export default function ProfilePage() {
  const tabData = [
    {
      label: "Data Diri",
      apiUrl: "https://www.ciputramitrahospital.id/api/v1/client/promotions",
    },
    {
      label: "Histori MCU",
      apiUrl: "https://www.ciputramitrahospital.id/api/v1/client/article",
    },
  ];

  return (
    <div className="h-full overflow-y-auto lg:h-auto w-full p-4">
      <div className="bg-gradient-to-r from-purple-300 to-blue-300 mt-18 mb-4 p-6 rounded-3xl text-center">
        <div className="flex justify-center -mt-20 mb-4">
          <img
            src="/images/user.png"
            alt="User Profile"
            className="w-28 h-28 rounded-full bg-white p-2 mask mask-circle"
          />
        </div>
        <h1 className="text-xl font-semibold">Putri Nabella</h1>
        <p className="text-sm text-gray-700 mt-2 mb-4">
          Ciputra Mitra Hospital Banjarmasin
        </p>
      </div>
      <Tabs tabs={tabData} />
    </div>
  );
}
