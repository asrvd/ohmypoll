import { useRouter } from "next/router";
import SiteFooter from "../components/footer";
import { useEffect, useState } from "react";
import { setTheme, getTheme } from "../lib/theme";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setTheme(getTheme());
    setCurrentTheme(getTheme());
    document.body.classList.add(getTheme());
  }, [currentTheme]);

  function switchTheme() {
    if (currentTheme === "light") {
      setTheme("dark");
      setCurrentTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      setCurrentTheme("light");
      document.body.classList.remove("dark");
    }
  }

  return (
    <div className="dark:bg-slate-800 bg-gray-100 relative flex flex-col justify-center items-center w-screen h-screen font-sans text-center p-3 gap-4">
      <button
        className="absolute top-8 right-8 text-xl hover:scale-110 duration-300 p-2 border-none bg-transparent rounded-full shadow-xl"
        onClick={switchTheme}
      >
        {currentTheme === "light" ? (
          <FiMoon className="text-gray-500 dark:text-gray-200" />
        ) : (
          <FiSun className="text-gray-500 dark:text-gray-200" />
        )}
      </button>
      <div className="flex flex-col mt-3 justify-center items-center lg:w-2/3 md:w-2/3 w-full text-center">
        <h2 className="w-full mb-0 text-shadow-lg text-[4rem] lg:text-[5rem] md:text-[5rem] font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          oh my poll !
        </h2>
        <p className="text-shadow-lg mt-0 text-emerald-700 dark:text-emerald-300">
          create polls and ask others anything you want privately or publicly -{" "}
          {`it's`} free!
        </p>
      </div>
      <div className="flex mt-3 gap-3 justify-center items-center lg:w-1/3 md:w-1/2 w-full text-center">
        <button
          className="duration-300 relative rounded bg-green-300 hover:ring-2 ring-green-400 cursor-pointer px-4 py-2 w-full h-full shadow-md text-center text-gray-800"
          onClick={() => router.push("/create")}
        >
          create a poll
        </button>
        <button
          className="duration-300 rounded bg-green-300 hover:ring-2 ring-green-400 cursor-pointer px-4 py-2 w-full h-full shadow-md text-center text-gray-800"
          onClick={() => router.push("/polls")}
        >
          see public polls
        </button>
      </div>
      <SiteFooter />
    </div>
  );
}
