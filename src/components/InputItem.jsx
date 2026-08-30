import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputComp = ({
  label,
  identity,
  changeFunct,
  value,
  placeholder,
  Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = identity === "password" || identity === "confirmPassword";
  const isUsername = identity === "username";

  // Determine input type
  const getInputType = () => {
    if (identity === "email") return "email";
    if (isPassword) return showPassword ? "text" : "password";
    return "text";
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={identity}
          className="text-xs font-semibold tracking-wider uppercase text-body-text"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative flex items-center w-full">
        <input
          type={getInputType()}
          name={identity}
          id={identity}
          placeholder={placeholder}
          value={value}
          onChange={changeFunct}
          className={`w-full h-10 sm:h-11 text-xs sm:text-sm font-medium transition-all duration-200 border rounded-xl border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 text-body-text peer ${
            isUsername || Icon ? "pl-9 sm:pl-10" : "pl-3 sm:pl-3.5"
          } ${isPassword ? "pr-10 sm:pr-11" : "pr-3 sm:pr-3.5"}`}
        />

        {/* Left Icon / Username Symbol */}
        {isUsername ? (
          <span className="absolute left-3.5 sm:left-4 pointer-events-none text-xs sm:text-sm font-semibold text-gray-400 transition-colors peer-focus:text-brand-accent">
            @
          </span>
        ) : (
          Icon && (
            <Icon
              strokeWidth={2}
              size={18}
              className="absolute left-3 sm:left-3.5 text-gray-400 transition-colors pointer-events-none peer-focus:text-brand-accent shrink-0"
            />
          )
        )}

        {/* Password Visibility Toggle */}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 sm:right-3.5 text-gray-400 transition-colors cursor-pointer hover:text-body-text focus:outline-none p-1 rounded-md"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2} className="shrink-0" />
            ) : (
              <Eye size={18} strokeWidth={2} className="shrink-0" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputComp;
