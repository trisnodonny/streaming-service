import { useState } from "react";
import eye from "@assets/icons/eye.png";
import eyeCrossed from "@assets/icons/eye-crossed.png";

export default function InputField({
  type = "text",
  name,
  label,
  value,
  onChange,
  isError,
  onError,
  errorMsg,
  onKeyDown,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputClass =
    type === "password"
      ? "text-white bg-black bg-opacity-20 border border-zinc-700 rounded-md w-full pt-6 pb-2 pl-4 pr-10"
      : "text-white bg-black bg-opacity-20 border border-zinc-700 rounded-md w-full pt-6 pb-2 px-4";
  const baseLabelClass = "absolute left-4 pointer-events-none transition-all";
  const labelClass =
    isFocus || value
      ? `${baseLabelClass} top-2 text-xs`
      : `${baseLabelClass} top-1/2 -translate-y-1/2`;

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    onChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFocus = () => {
    setIsFocus(true);
    onError((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleOnKeyDown = (ev) => {
    if (onKeyDown) {
      onKeyDown(ev);
    }
  };

  return (
    <div className="w-full text-zinc-300">
      <div className="relative">
        <p className={labelClass}>{label}</p>
        {type === "password" && value && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <button
              type="button"
              className="flex p-2 w-[35px] hover:bg-zinc-800 rounded-full"
              onClick={handleShowPassword}
            >
              <img
                src={showPassword ? eyeCrossed : eye}
                alt="toggle password visibility"
              />
            </button>
          </div>
        )}
        <input
          className={inputClass}
          name={name}
          type={showPassword ? "text" : type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleOnKeyDown}
        />
      </div>
      {isError && (
        <p className="mt-1 text-rose-600 text-xs sm:text-[14px]">{errorMsg}</p>
      )}
    </div>
  );
}
