import { nanoid } from "nanoid";
import axios from "axios";
import PollForm from "../components/pollForm";
import Link from "next/link";
import SiteFooter from "../components/footer";
import { setTheme, getTheme } from "../lib/theme";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Create() {
  const id = nanoid(6);
  const addPoll = (poll) => axios.post("/api/poll", { id, ...poll });
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
    <div className="dark:bg-slate-800 bg-gray-100 flex flex-col justify-center items-center w-screen min-h-screen p-3 pt-20 pb-10 font-sans relative">
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
      <div className="absolute text-green-500 dark:text-green-300 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-1/2 md:w-2/3">
        <Link href="/">
          <a>
            . . /{" "}
            <span className="cursor-default text-gray-400 dark:text-gray-300">
              create
            </span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 md:w-2/3 h-3/4 p-2">
        <h1 className="text-2xl font-bold dark:text-gray-200 text-gray-800">
          Create a poll
        </h1>
        <PollForm onSubmit={addPoll} redirectPath={`/poll/${id}`} />
      </div>
      <SiteFooter />
    </div>
  );
}
