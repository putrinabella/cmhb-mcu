export default function WelcomeScreen() {
    return (
        <div className="min-h-screen flex flex-col md:grid md:grid-cols-2 bg-blue-200 overflow-hidden">
            {/* Left (desktop) / Top 2/3 (mobile) */}
            <div className="flex flex-col justify-center items-center text-center px-6 py-10 flex-[2]">
                <div>
                    <h2 className="text-lg text-gray-700">Welcome to</h2>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
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
            <div className="flex flex-col justify-center items-center px-6 py-10 flex-[1] bg-blue-100">
                <div className="w-full max-w-sm space-y-4">
                    <p className="text-sm text-center text-gray-700">
                        Login as
                    </p>
                    <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-full shadow">
                        PIC
                    </button>
                    <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-full shadow">
                        Karyawan
                    </button>
                </div>
            </div>
        </div>
    );
}
