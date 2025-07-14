import { ReactNode, MouseEvent, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof styles;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: MouseEvent) => void;
  customClass?: string;
}

const base =
  "inline-flex items-center justify-center text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const styles = {
  primary: `${base} rounded-md bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 px-4 py-2`,

  secondary: `${base} rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-300 px-4 py-2`,

  success: `${base} rounded-md bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 px-4 py-2`,

  danger: `${base} rounded-md bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 px-4 py-2`,

  warning: `${base} rounded-md bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-400 px-4 py-2`,

  info: `${base} rounded-md bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-500 px-4 py-2`,

  outline: `${base} rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400 px-4 py-2`,

  ghost: `${base} rounded-md text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400 px-4 py-2`,

  link: `${base} text-blue-600 underline hover:text-blue-700 focus-visible:ring-blue-500`,

  form: `${base} rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 px-5 py-2.5`,

  disabled: `${base} rounded-md bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 px-4 py-2`,
};

const Button = ({
  children,
  href,
  variant = "primary",
  disabled,
  isLoading = false,
  onClick,
  customClass = "",
  ...props
}: ButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      toast.error("Action is disabled.");
    } else {
      onClick?.(e);
    }
  };

  const classes = `${styles[variant]} ${customClass}`;

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={classes}
        aria-disabled={disabled || isLoading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
