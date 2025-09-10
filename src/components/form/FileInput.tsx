import { type ChangeEventHandler } from "react";

interface FileInputProps {
  label?: string;
  infoText?: string;
  accept?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  multiple?: boolean;
}

export function FileInput({
  label = "Pick a file",
  infoText,
  accept,
  onChange,
  id = "file-input",
  multiple = false,
}: FileInputProps) {
  return (
    <fieldset className="fieldset mb-8 border border-gray-300 rounded-md p-4">
      <legend className="fieldset-legend text-sm font-semibold text-base-content">
        {label}
      </legend>

      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className="file-input block w-full text-base-content
                   file:mr-4 file:py-3 file:px-5
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {infoText && (
        <label
          htmlFor={id}
          className="label text-xs text-base-content mt-1 block"
        >
          {infoText}
        </label>
      )}
    </fieldset>
  );
}
