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

  const isPassword = identity === "pass";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={identity}
        className="text-xs font-semibold tracking-wider uppercase text-body-text"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={
            identity === "email"
              ? "email"
              : isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
          }
          name={identity}
          id={identity}
          placeholder={placeholder}
          className={`w-full h-10 text-sm font-medium transition-all border rounded-lg pl-9 ${
            isPassword ? "pr-10" : "pr-3"
          } border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text peer`}
          value={value}
          onChange={changeFunct}
        />
        {identity === "uname" ? (
          <span className="text-gray-300 absolute left-3.5 pointer-events-none text-sm font-semibold peer-focus:text-brand-accent transition-colors">
            @
          </span>
        ) : (
          Icon && (
            <Icon
              strokeWidth={2}
              size={18}
              className="absolute text-gray-300 transition-colors pointer-events-none left-3 peer-focus:text-brand-accent"
            />
          )
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-gray-400 hover:text-body-text transition-colors focus:outline-none cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2} />
            ) : (
              <Eye size={18} strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputComp;
