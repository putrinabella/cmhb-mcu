// import type { FC } from "react";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
// import "@react-pdf-viewer/zoom/lib/styles/index.css";
// import { Download as DownloadIcon, Plus, Minus } from "lucide-react";

// interface PdfViewerProps {
//   fileUrl: string; // object URL dari Blob
//   fileBlob: Blob; // blob hasil fetch
//   fileName: string; // custom nama file (ex: "123456 - John Doe.pdf")
// }

// const PdfViewer: FC<PdfViewerProps> = ({ fileUrl, fileBlob, fileName }) => {
//   const zoomPluginInstance = zoomPlugin();
//   const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

//   const handleDownload = () => {
//     const url = URL.createObjectURL(fileBlob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = fileName;
//     a.style.display = "none";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="border border-base-300 rounded-lg overflow-hidden">
//       {/* HEADER */}
//       <div className="bg-base-300 text-base-content px-4 py-2 flex justify-between items-center">
//         <span className="font-bold">PDF Viewer</span>

//         <div className="flex items-center gap-2">
//           {/* Zoom controls */}
//           <ZoomOut>
//             {(props) => (
//               <button
//                 onClick={props.onClick}
//                 className="bg-primary hover:bg-primary/90 transition text-primary-content p-2 rounded flex items-center justify-center"
//                 title="Zoom Out"
//               >
//                 <Minus size={16} />
//               </button>
//             )}
//           </ZoomOut>

//           <CurrentScale>
//             {(props) => (
//               <span className="text-sm px-2 min-w-[40px] text-center">
//                 {Math.round(props.scale * 100)}%
//               </span>
//             )}
//           </CurrentScale>

//           <ZoomIn>
//             {(props) => (
//               <button
//                 onClick={props.onClick}
//                 className="bg-primary hover:bg-primary/90 transition text-primary-content p-2 rounded flex items-center justify-center"
//                 title="Zoom In"
//               >
//                 <Plus size={16} />
//               </button>
//             )}
//           </ZoomIn>

//           {/* Custom Download button */}
//           <button
//             onClick={handleDownload}
//             className="bg-primary hover:bg-primary/90 text-primary-content px-3 py-1.5 flex items-center gap-1.5 rounded transition"
//           >
//             <DownloadIcon size={18} />
//             <span className="text-sm font-medium">Download</span>
//           </button>
//         </div>
//       </div>

//       {/* VIEWER */}
//       <div className="h-[700px] bg-base-100">
//         <Viewer fileUrl={fileUrl} plugins={[zoomPluginInstance]} />
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
import type { FC } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { Download as DownloadIcon, Plus, Minus } from "lucide-react";

interface PdfViewerProps {
  fileUrl: string; // object URL dari Blob
  fileBlob: Blob; // blob hasil fetch
  fileName: string; // custom nama file (ex: "123456 - John Doe.pdf")
}

const PdfViewer: FC<PdfViewerProps> = ({ fileUrl, fileBlob, fileName }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

  const handleDownload = () => {
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-base-300 rounded-lg overflow-hidden">
      {/* HEADER */}
      <div className="bg-base-300 text-base-content px-2 md:px-4 py-2 flex flex-wrap justify-between items-center gap-2">
        <span className="font-bold text-sm md:text-base">PDF Viewer</span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom controls */}
          <ZoomOut>
            {(props) => (
              <button
                onClick={props.onClick}
                className="bg-primary hover:bg-primary/90 transition text-primary-content p-2 rounded flex items-center justify-center"
                title="Zoom Out"
              >
                <Minus size={16} />
              </button>
            )}
          </ZoomOut>

          <CurrentScale>
            {(props) => (
              <span className="text-xs md:text-sm px-2 min-w-[36px] md:min-w-[40px] text-center">
                {Math.round(props.scale * 100)}%
              </span>
            )}
          </CurrentScale>

          <ZoomIn>
            {(props) => (
              <button
                onClick={props.onClick}
                className="bg-primary hover:bg-primary/90 transition text-primary-content p-2 rounded flex items-center justify-center"
                title="Zoom In"
              >
                <Plus size={16} />
              </button>
            )}
          </ZoomIn>

          {/* Download button (icon only) */}
          <button
            onClick={handleDownload}
            className="bg-primary hover:bg-primary/90 text-primary-content p-2 rounded flex items-center justify-center transition"
            title="Download PDF"
          >
            <DownloadIcon size={18} />
          </button>
        </div>
      </div>

      {/* VIEWER */}
      <div className="h-[70vh] md:h-[700px] bg-base-100">
        <Viewer fileUrl={fileUrl} plugins={[zoomPluginInstance]} />
      </div>
    </div>
  );
};

export default PdfViewer;
