import { tv, VariantProps } from "tailwind-variants";

export const buttonVariant = tv({
  base: "h-[40px] cursor-pointer rounded-[8px] text-white flex items-center justify-center transition-all duration-300 px-[12px]",
  variants: {
    variant: {
      disabled: "cursor-not-allowed bg-green-500 opacity-[50%] text-gray-100",
      default: "bg-green-500 hover:bg-green-500/90",
      light:
        "bg-none border font-bold border-green-500 text-green-500 items-center text-center hover:bg-green-500/95 hover:text-white",
      edit: "bg-blue-200 px-[32px] py-[10px] text-[16px] font-semibold text-white hover:bg-blue-200/95",
      danger:
        "bg-red-200 text-[16px] font-semibold text-white hover:bg-red-200/95",
      white: "bg-white text-[14px] text-gray-950 hover:bg-gray-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariant>;
