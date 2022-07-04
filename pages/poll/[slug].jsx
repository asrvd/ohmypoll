// Import the generated Prisma client
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";

// Instantiate it
const prisma = new PrismaClient();

export async function getStaticPaths() {
  const polls = await prisma.poll.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: polls.map((poll) => ({
      params: {
        slug: poll.id,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const poll = await prisma.poll.findUnique({
    where: {
      id: params.slug,
    },
  });
  const options = await prisma.option.findMany({
    where: {
      pollID: params.slug,
    },
  });

  if (poll) {
    return {
      props: {
        poll: JSON.parse(JSON.stringify(poll)),
        options: JSON.parse(JSON.stringify(options)),
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default function Poll(props = null) {
  const addVote = (id) => {
    let toastId;
    toastId = toast.loading("Adding your vote...");
    try {
      axios.post("/api/vote", {
        id: id,
      });
      toast.success("Your vote has been added!", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Something went wrong...", {
        id: toastId,
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-3 font-mono">
      <div className="flex flex-col justify-center items-center w-1/2 h-2/3 p-2 gap-3">
        <h1 className="text-2xl font-bold">{props?.poll.title}</h1>
        <div className="grid gap-3 grid-cols-2 grid-rows-2 w-full">
          {props?.options.map((option) => {
            return (
              <button
                onClick={() => addVote(option.id)}
                className="flex justify-between items-center rounded bg-green-300 hover:ring-2 ring-green-600 cursor-pointer px-4 py-2 w-full h-full"
                key={option.id}
              >
                <span>{option.number}.</span>
                <h2 className="text-md font-mono font-bold">{option.text}</h2>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}
