import React, { type ChangeEventHandler } from "react";

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
      <button
        onClick={onDownloadTemplate}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Download Template Excel
      </button>

      <fieldset className="fieldset mb-8 border border-gray-300 rounded-md p-4">
        <legend className="fieldset-legend text-sm font-semibold text-gray-700">
          Pick a file
        </legend>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={onFileChange}
          className="file-input block w-full text-gray-600
                     file:mr-4 file:py-3 file:px-5
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <label className="label text-xs text-gray-500 mt-1 block">
          Max size 2MB
        </label>
      </fieldset>
    </>
  );
}
