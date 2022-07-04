import { nanoid } from "nanoid";
import axios from "axios";
import PollForm from "../components/pollForm";
import Link from "next/link";

export default function Create() {
  const id = nanoid(6);
  const addPoll = (poll) => axios.post("/api/poll", { id, ...poll });

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-3 font-mono relative">
      <div className="absolute text-green-500 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-1/2 md:w-2/3 lg:h-2/3">
        <Link href="/">
          <a>
            ../<span className="cursor-default text-gray-400">create</span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 md:w-2/3 h-3/4 p-2">
        <h1 className="text-2xl font-bold">Create a poll</h1>
        <PollForm onSubmit={addPoll} redirectPath={`/poll/${id}`} />
      </div>
    </div>
  );
}
