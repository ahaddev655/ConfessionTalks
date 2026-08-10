import React from "react";

const InputComp = ({
  label,
  identity,
  changeFunct,
  value,
  placeholder,
  Icon,
}) => {
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
              : identity === "pass"
                ? "password"
                : "text"
          }
          name={identity}
          id={identity}
          placeholder={placeholder}
          className="w-full h-10 pr-3 text-sm font-medium transition-all border rounded-lg pl-9 border-border-color focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent text-body-text peer"
          value={value}
          onChange={changeFunct}
        />
        {identity === "uname" ? (
          <span className="text-gray-300 absolute left-3.5 pointer-events-none text-sm font-semibold peer-focus:text-brand-accent transition-colors">
            @
          </span>
        ) : (
          <Icon
            strokeWidth={2}
            size={18}
            className="absolute text-gray-300 transition-colors pointer-events-none left-3 peer-focus:text-brand-accent"
          />
        )}
      </div>
    </div>
  );
};

export default InputComp;
