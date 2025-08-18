import { List } from "@/components/List";
export default function McuPage() {
  const historyData = Array.from({ length: 10 }, (_, i) => {
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
  return (
    <div className="p-8 mx-auto min-h-screen bg-base-100 text-base-content">
      <List items={historyData} />
      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>
    </div>
  );
}
