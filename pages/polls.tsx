import Link from "next/link";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Poll } from "@prisma/client";
import PollCard from "../components/pollCard";
import SiteFooter from "../components/footer";

const prisma = new PrismaClient();

type Props = {
  pollsByUpvotes: Poll[];
  pollsByDate: Poll[];
};

export async function getStaticProps() {
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
    props: {
      pollsByUpvotes: JSON.parse(JSON.stringify(pollsByUpvotes)),
      pollsByDate: JSON.parse(JSON.stringify(pollsByDate)),
    },
    revalidate: 5,
  };
}

export default function Polls(props: Props) {
  const [sortType, setSortType] = useState("upvotes");

  const switchSortType = () => {
    console.log(sortType);
    if (sortType === "upvotes") {
      setSortType("date");
    } else {
      setSortType("upvotes");
    }
  };

  return (
    <div className="relative flex flex-col w-screen max-h-max min-h-screen font-sans justify-center gap-4 items-center p-5 overflow-y-scroll">
      <div className="absolute text-green-500 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-1/2 md:w-2/3">
        <Link href="/">
          <a>
            . . / <span className="cursor-default text-gray-400">polls</span>
          </a>
        </Link>
      </div>
      <div className="h-[10%] w-full lg:w-1/3 md:w-2/3 justify-center items-center flex gap-3 mt-9-3">
        <h2 className="text-md lg:text-2xl md:text-xl">Public Poll List</h2>
        <select
          className="focus:outline-none border-2 border-gray-500 rounded px-2 py-1"
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
