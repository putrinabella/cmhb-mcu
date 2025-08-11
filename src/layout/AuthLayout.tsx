export default function AuthLayout({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Left - Logo or Illustration */}
            <div className="hidden md:flex items-center justify-center bg-[#f6f7fb] relative">
                <div className="text-center px-8">
                    <img
                        src="/images/logo.png"
                        alt="Ciputra Mitra Hospital"
                        className="w-full max-w-xs md:max-w-lg h-auto object-contain mx-auto"
                    />
                </div>
            </div>

            {/* Right - Form */}
            <div className="relative flex items-center justify-center bg-center p-6 overflow-hidden">
                {/* Transparent background image layer */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url('/images/pattern.png')",
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "contain",
                        opacity: 0.2,
                    }}
                />

                {/* Content layer */}
                <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl ring-1 ring-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-gray-600 text-sm mb-6 text-center">
                            {subtitle}
                        </p>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
