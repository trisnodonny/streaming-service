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
  onBlurError,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputClass =
    type === "password"
      ? "text-white bg-black bg-opacity-20 border border-zinc-700 rounded-md border border-black w-full pt-6 pb-2 pl-4 pr-10"
      : "text-white bg-black bg-opacity-20 border border-zinc-700 rounded-md border border-black w-full pt-6 pb-2 px-4";
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
    onError((prevData) => ({
      ...prevData,
      [name]: true,
    }));
    if (value) {
      let hasError = false;
      if (
        (name === "firstname" && value.length < 2) ||
        (name === "lastname" && value.length < 2) ||
        (name === "username" && (value.length < 4 || value.length > 20)) ||
        (name === "password" && (value.length < 4 || value.length > 60))
      ) {
        hasError = true;
      }

      onError((prevData) => ({
        ...prevData,
        [name]: hasError,
      }));
    }
    if (onBlurError) {
      onBlurError();
    }
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="w-full text-zinc-300">
      <div className="relative">
        <p className={labelClass}>{label}</p>
        {type === "password" && value && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <button
              className="flex p-2 w-[35px] hover:bg-zinc-800 rounded-full"
              onMouseDown={handleShowPassword}
            >
              <img src={showPassword ? eyeCrossed : eye} alt="" />
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
        />
      </div>
      {isError && (
        <p className="mt-1 text-rose-600 text-xs sm:text-[14px]">{errorMsg}</p>
      )}
    </div>
  );
}
