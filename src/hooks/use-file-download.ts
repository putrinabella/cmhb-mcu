import { useCallback } from "react";

export function useFileDownload() {
  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const fileUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(fileUrl);
  }, []);

  return { downloadBlob };
}
