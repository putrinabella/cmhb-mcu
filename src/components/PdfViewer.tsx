// export default PdfViewer;

// import type { FC } from "react";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import {
//   getFilePlugin,
//   type RenderDownloadProps,
// } from "@react-pdf-viewer/get-file";
// import { Download as DownloadIcon } from "lucide-react";

// interface PdfViewerProps {
//   fileUrl: string;
// }

// const PdfViewer: FC<PdfViewerProps> = ({ fileUrl }) => {
//   const getFilePluginInstance = getFilePlugin();
//   const { Download } = getFilePluginInstance;
//   return (
//     <div className="border border-black/30 rounded-lg overflow-hidden">
//       {/* HEADER */}
//       <div className="bg-gray-800 text-white px-4 py-[10px] flex justify-between items-center">
//         <span className="font-bold">PDF Viewer</span>

//         <Download>
//           {(props: RenderDownloadProps) => (
//             <button
//               onClick={props.onClick}
//               className="bg-primary/80 text-white px-3 py-1.5 flex items-center gap-1.5 rounded cursor-pointer hover:bg-primary transition"
//             >
//               <DownloadIcon size={18} />
//               <span className="text-sm font-medium">Download</span>
//             </button>
//           )}
//         </Download>
//       </div>

//       {/* VIEWER */}
//       <div className="h-[700px]">
//         <Viewer fileUrl={fileUrl} plugins={[getFilePluginInstance]} />
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;

// import type { FC } from "react";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import {
//   getFilePlugin,
//   type RenderDownloadProps,
// } from "@react-pdf-viewer/get-file";
// import { Download as DownloadIcon } from "lucide-react";

// interface PdfViewerProps {
//   fileUrl: string;
// }

// const PdfViewer: FC<PdfViewerProps> = ({ fileUrl }) => {
//   const getFilePluginInstance = getFilePlugin();
//   const { Download } = getFilePluginInstance;

//   return (
//     <div className="border border-black/30 rounded-lg overflow-hidden">
//       {/* HEADER */}
//       <div className="bg-gray-800 text-white px-4 py-[10px] flex justify-between items-center">
//         <span className="font-bold">PDF Viewer</span>

//         <Download>
//           {(props: RenderDownloadProps) => (
//             <button
//               onClick={props.onClick}
//               className="bg-primary/80 text-white px-3 py-1.5 flex items-center gap-1.5 rounded cursor-pointer hover:bg-primary transition"
//             >
//               <DownloadIcon size={18} />
//               <span className="text-sm font-medium">Download</span>
//             </button>
//           )}
//         </Download>
//       </div>

//       {/* VIEWER */}
//       <div className="h-[700px]">
//         <Viewer fileUrl={fileUrl} plugins={[getFilePluginInstance]} />
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
import type { FC } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  getFilePlugin,
  type RenderDownloadProps,
} from "@react-pdf-viewer/get-file";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { Download as DownloadIcon } from "lucide-react";
import { Plus, Minus } from "lucide-react";

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: FC<PdfViewerProps> = ({ fileUrl }) => {
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;

  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

  return (
    <div className="border border-black/30 rounded-lg overflow-hidden">
      {/* HEADER */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-bold">PDF Viewer</span>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <ZoomOut>
            {(props) => (
              <button
                onClick={props.onClick}
                className="bg-primary/80 hover:bg-primary transition text-white p-2 rounded flex items-center justify-center"
                title="Zoom Out"
              >
                <Minus size={16} />
              </button>
            )}
          </ZoomOut>

          <CurrentScale>
            {(props) => (
              <span className="text-sm px-2 min-w-[40px] text-center">
                {Math.round(props.scale * 100)}%
              </span>
            )}
          </CurrentScale>

          <ZoomIn>
            {(props) => (
              <button
                onClick={props.onClick}
                className="bg-primary/80 hover:bg-primary transition text-white p-2 rounded flex items-center justify-center"
                title="Zoom In"
              >
                <Plus size={16} />
              </button>
            )}
          </ZoomIn>

          {/* Download button */}
          <Download>
            {(props: RenderDownloadProps) => (
              <button
                onClick={props.onClick}
                className="bg-primary/80 text-white px-3 py-1.5 flex items-center gap-1.5 rounded cursor-pointer hover:bg-primary transition"
              >
                <DownloadIcon size={18} />
                <span className="text-sm font-medium">Download</span>
              </button>
            )}
          </Download>
        </div>
      </div>

      {/* VIEWER */}
      <div className="h-[700px]">
        <Viewer
          fileUrl={fileUrl}
          plugins={[getFilePluginInstance, zoomPluginInstance]}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
