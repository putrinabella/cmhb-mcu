type LoadingIndicatorProps = {
  text?: string;
};

export function LoadingIndicator({
  text = "Memuat Data",
}: LoadingIndicatorProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-base-100 bg-opacity-70 z-50">
      <span className="loading loading-dots loading-xl mb-2"></span>
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}
