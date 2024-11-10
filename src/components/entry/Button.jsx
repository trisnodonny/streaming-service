export default function Button({ label, onClick }) {
  const buttonClass =
    "text-white font-semibold w-full py-2 px-4 bg-sky-700 hover:bg-sky-800 transition-all rounded-md";
  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        {label}
      </button>
    </>
  );
}
