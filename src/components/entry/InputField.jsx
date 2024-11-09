import { useState } from "react";

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
  const inputClass =
    type === "password"
      ? "border border-black w-full pt-8 pb-2 pl-4 pr-10"
      : "border border-black w-full pt-8 pb-2 px-4";

  const baseLabelClass = "absolute left-4 pointer-events-none transition-all";
  const labelClass =
    isFocus || value
      ? `${baseLabelClass} top-2`
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
  return (
    <div className="w-full ">
      <div className="relative">
        <p className={labelClass}>{label}</p>
        <input
          className={inputClass}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isError && (
        <p className="mt-1 text-rose-600 text-xs sm:text-md">{errorMsg}</p>
      )}
    </div>
  );
}
