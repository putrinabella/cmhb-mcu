export default function SafeWebView({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-center mb-4">
        <p className="text-lg font-medium">
          Website ini tidak bisa ditampilkan langsung.
        </p>
        <p className="text-sm text-gray-500">
          Klik tombol di bawah untuk membuka di tab baru.
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Buka Website
      </a>
    </div>
  );
}
