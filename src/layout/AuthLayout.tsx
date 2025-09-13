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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-base-100 text-base-content">
      {/* Left - Logo or Illustration */}
      <div className="hidden md:flex items-center justify-center bg-base-200 relative w-full h-full">
        <div className="text-center w-full h-full">
          <img
            src="/images/mcu-icon.png"
            alt="Ciputra Mitra Hospital"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right - Form */}
      <div className="relative flex items-center justify-center bg-center p-6 overflow-hidden">
        {/* Transparent background image layer */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/images/pattern.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "contain",
          }}
        />

        {/* Content layer */}
        <div className="relative z-10 w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-300">
          <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
          {subtitle && (
            <p className="text-sm mb-6 text-center text-base-content/70">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
