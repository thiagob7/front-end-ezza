import { SelectHTMLAttributes, forwardRef } from "react";
import { classNames } from "~/utils/class-names";

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
  formatLabel?: (option: { label: string; value: string }) => string;
}

const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  ({ label, error, options, formatLabel, ...rest }, ref) => {
    return (
      <label className="flex flex-col w-full relative">
        <span className="text-sm font-semibold">{label}</span>
        <div
          className={classNames(
            "flex items-center border h-10 w-full bg-white rounded-md mt-1 px-2 text-black outline-none text-gray-900 z-0",
            error ? "border-red-500" : "border-gray-300"
          )}
        >
          {formatLabel
            ? formatLabel({ label, value: String(rest.value) })
            : label}
        </div>
        <select
          id="select"
          className="opacity-0 z-10 absolute top-0 w-full h-full bg-red-400"
          ref={ref}
          {...rest}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </label>
    );
  }
);

InputSelect.displayName = "InputSelect";

export { InputSelect };
