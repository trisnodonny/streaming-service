export default function Footer() {
  const cta = [
    "FAQ",
    "Help Center",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
  ];
  return (
    <>
      <div className="border-t-2 border-zinc-700">
        <div className="container mx-auto p-8">
          <div className="w-full">
            <ul className="flex items-center justify-start flex-wrap">
              {cta.map((item, index) => (
                <li className="w-1/2 md:w-1/4 mb-4" key={index}>
                  <span className="w-full underline cursor-pointer text-sm sm:text-md">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
