import { useState } from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  const [reasons, setReasons] = useState([
    "Exclusive Content",
    "Personalized Recommendations",
    "Ad-Free Experience",
    "Offline Viewing",
  ]);
  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-700 to-black min-h-screen">
        <header className="container mx-auto max-w-[1200px] text-white">
          <div className="flex items-center justify-between p-4">
            <div>logo</div>
            <Link
              className="flex items-center font-medium py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-600 transition-all"
              to={"/login"}
            >
              Sign In
            </Link>
          </div>
        </header>

        <div className="container mx-auto p-8 text-white sm:px-6 md:px-8">
          <div className="bg-blue-200 h-[450px] max-w-[968px] mx-auto mb-4 sm:mb-8"></div>
          <div className="max-w-[720px] mx-auto px-4">
            <p className="text-center text-2xl sm:text-4xl font-bold mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="max-w-[968px] mx-auto">
            <p className="text-3xl font-bold mb-6">Lorem ipsum dolor sit.</p>
            <div className="flex items-center w-full flex-wrap justify-between">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="w-full lg:w-[calc(25%-8px)] p-4 rounded-xl border border-gray-200"
                >
                  <p>{reason}</p>
                  <div className="w-[25px] h-[25px] bg-white mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
