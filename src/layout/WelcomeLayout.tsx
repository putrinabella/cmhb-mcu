export default function WelcomeScreen() {
  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-base-200 text-base-content overflow-hidden">
      {/* Left (desktop) / Top 2/3 (mobile) */}
      <div className="flex flex-col justify-center items-center text-center px-6 py-10 flex-[2]">
        <div>
          <h2 className="text-lg text-base-content/70">Welcome to</h2>
          <h1 className="text-2xl font-bold mb-6 text-base-content">
            Online Medical Check-up
          </h1>
        </div>
        <img
          src="/images/cmh.jpeg"
          alt="Illustration"
          className="mask mask-heart"
        />
      </div>

      {/* Right (desktop) / Bottom 1/3 (mobile) */}
      <div className="flex flex-col justify-center items-center px-6 py-10 flex-[1] bg-base-100">
        <div className="w-full max-w-sm space-y-4">
          <p className="text-sm text-center text-base-content/70">Login as</p>
          <button className="w-full bg-base-100 text-primary font-semibold py-3 rounded-full shadow hover:bg-base-200">
            PIC
          </button>
          <button className="w-full bg-base-100 text-primary font-semibold py-3 rounded-full shadow hover:bg-base-200">
            Karyawan
          </button>
        </div>
      </div>
    </div>
  );
}
