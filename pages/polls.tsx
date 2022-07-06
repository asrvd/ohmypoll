import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Poll } from "@prisma/client";
import PollCard from "../components/pollCard";
import SiteFooter from "../components/footer";
import { getTheme, setTheme } from "../lib/theme";
import { FiMoon, FiSun } from "react-icons/fi";

const prisma = new PrismaClient();

type Props = {
  pollsByUpvotes: Poll[];
  pollsByDate: Poll[];
};

async function getPolls() {
  const pollsByUpvotes = await prisma.poll.findMany({
    where: {
      visibility: "public",
    },
    orderBy: {
      upvotes: "desc",
    },
  });
  const pollsByDate = await prisma.poll.findMany({
    where: {
      visibility: "public",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    pollsByUpvotes,
    pollsByDate,
  };
}

export async function getServerSideProps() {
  const { pollsByUpvotes, pollsByDate } = await getPolls();

  return {
    props: {
      pollsByUpvotes: JSON.parse(JSON.stringify(pollsByUpvotes)),
      pollsByDate: JSON.parse(JSON.stringify(pollsByDate)),
    },
  };
}

export default function Polls(props: Props) {
  const [sortType, setSortType] = useState("upvotes");
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

  const switchSortType = () => {
    console.log(sortType);
    if (sortType === "upvotes") {
      setSortType("date");
    } else {
      setSortType("upvotes");
    }
  };

  return (
    <div className="relative dark:bg-slate-800 bg-gray-100 flex flex-col w-screen max-h-max min-h-screen font-sans justify-center gap-4 items-center p-5 overflow-y-scroll">
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
              polls
            </span>
          </a>
        </Link>
      </div>
      <div className="h-[10%] w-full lg:w-1/3 md:w-2/3 justify-center items-center flex gap-3 mt-9-3">
        <h2 className="text-md lg:text-2xl md:text-xl dark:text-gray-200 text-gray-800">
          Public Poll List
        </h2>
        <select
          className="focus:outline-none border-2 border-gray-500 rounded px-2 py-1 focus:ring-0 text-gray-700 placeholder:text-gray-600 dark:bg-gray-300"
          onChange={() => switchSortType()}
        >
          <option value="upvotes">Sort by upvotes</option>
          <option value="date">Sort by date</option>
        </select>
      </div>
      <div className="min-h-[90%] max-h-max grid grid-cols-1 justify-center items-center w-full lg:w-1/2 md:w-full gap-3 mb-5">
        {sortType === "date"
          ? props?.pollsByDate.map((poll: Poll) => {
              return (
                <div className="w-full h-full" key={poll.id}>
                  <PollCard poll={poll} />
                </div>
              );
            })
          : props?.pollsByUpvotes.map((poll: Poll) => {
              return (
                <div className="w-full h-full" key={poll.id}>
                  <PollCard poll={poll} />
                </div>
              );
            })}
      </div>
      <SiteFooter />
    </div>
  );
}
