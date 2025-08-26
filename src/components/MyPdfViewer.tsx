import type { FC } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface MyPdfViewerProps {
  fileUrl: string;
}

const MyPdfViewer: FC<MyPdfViewerProps> = ({ fileUrl }) => {
  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "750px",
      }}
    >
      <Viewer fileUrl={fileUrl} />
    </div>
  );
};

export default MyPdfViewer;
