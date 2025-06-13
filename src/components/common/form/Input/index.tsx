import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "~/utils/class-names";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  mask?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, onChange, ...rest }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      const value = e.target.value;

      console.log(value);

      onChange({
        ...e,
        target: {
          ...e.target,
        },
      });
    };

    return (
      <label className="flex flex-col w-full">
        <span className="text-sm text-green-800 font-semibold">{label}</span>
        <input
          className={classNames(
            "border  h-10 w-full bg-[#EAEAEA] rounded-md mt-1 px-2 text-black outline-none",
            error ? "border-red-500" : "border-gray-300"
          )}
          ref={ref}
          {...rest}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
