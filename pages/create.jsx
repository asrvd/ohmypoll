import { nanoid } from "nanoid";
import axios from "axios";
import PollForm from "../components/pollForm";

export default function Create() {
  const id = nanoid(6);
  const addPoll = poll => axios.post('/api/poll', { id, ...poll });

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-3 font-mono">
      <div className="flex flex-col justify-center items-center w-1/3 h-2/3 p-2">
        <h1 className="text-2xl font-bold">Create a poll</h1>
        <PollForm onSubmit={addPoll} redirectPath={`/poll/${id}`} />
      </div>
    </div>
  );
}
