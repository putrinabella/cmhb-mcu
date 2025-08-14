import { type ChangeEventHandler } from "react";

interface ExcelUploadProps {
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onDownloadTemplate: () => void;
}

export function ExcelUpload({
  onFileChange,
  onDownloadTemplate,
}: ExcelUploadProps) {
  return (
    <>
      <button onClick={onDownloadTemplate} className="btn btn-primary mb-6">
        Download Template Excel
      </button>

      <fieldset className="fieldset mb-8 border border-base-content/20 rounded-md p-4">
        <legend className="fieldset-legend text-sm font-semibold text-base-content">
          Pick a file
        </legend>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={onFileChange}
          className="file-input w-full
                     file:py-2 file:px-4 file:rounded-md
                     file:bg-primary file:text-primary-content
                     file:hover:bg-primary-focus"
        />

        <label className="label text-xs text-base-content/50 mt-1 block">
          Max size 2MB
        </label>
      </fieldset>
    </>
  );
}
