export default function Button({ label, onClick }) {
  const buttonClass =
    "text-white font-bold w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 transition-all";
  return (
    <>
      <button className={buttonClass} onClick={onClick}>
        {label}
      </button>
    </>
  );
}
