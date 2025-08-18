export default function DashboardPage() {
  return (
    <div className="bg-base-100 text-base-content p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hi Putri Nabella</h1>
        <p className="text-gray-500">
          How is your day? Below we show your sales report for this month
        </p>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="card bg-primary text-primary-content p-4 rounded-xl">
          <h2 className="font-semibold">Available Balance</h2>
          <p className="text-2xl font-bold">$27,980.24</p>
        </div>
        <div className="card bg-secondary text-secondary-content p-4">
          <h2 className="font-semibold">Pending Balance</h2>
          <p className="text-2xl font-bold">$3,980.23</p>
        </div>
      </div>

      {/* Sales Target */}
      <div className="card bg-base-200 p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Sales Target</span>
          <span className="text-xl font-bold text-error">%32</span>
        </div>
        <div className="flex justify-between mt-4 text-gray-500">
          <span>Shopee</span>
          <span>Tokopedia</span>
          <span>Amazon</span>
        </div>
        <div className="h-2 bg-gray-300 rounded-full mt-2">
          <div className="h-2 bg-primary rounded-full w-1/3"></div>
        </div>
      </div>

      {/* Product Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Sales</h3>
          <div className="h-24 flex items-end gap-2">
            <div className="w-5 bg-gray-400 h-16"></div>
            <div className="w-5 bg-gray-400 h-20"></div>
            <div className="w-5 bg-accent h-24"></div>
            <div className="w-5 bg-gray-400 h-18"></div>
            <div className="w-5 bg-gray-400 h-14"></div>
          </div>
        </div>
        <div className="card bg-base-200 p-4 flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-2">Growth</h3>
          <div className="radial-progress text-primary">32%</div>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Customer</h3>
          <p className="text-3xl font-bold">2135</p>
          <button className="btn btn-sm btn-primary mt-2">View Details</button>
        </div>
      </div>

      {/* Feedback */}
      <div className="card bg-base-200 p-4">
        <h3 className="font-semibold mb-2">
          Does our dashboard help your business?
        </h3>
        <div className="flex gap-4 mt-2">
          <button className="btn btn-circle btn-primary">😃</button>
          <button className="btn btn-circle btn-secondary">🙂</button>
          <button className="btn btn-circle btn-accent">😐</button>
          <button className="btn btn-circle btn-info">🙁</button>
          <button className="btn btn-circle btn-error">😢</button>
        </div>
      </div>
    </div>
  );
}
