import { PrismaClient } from "@prisma/client";
import { Props } from "../[slug]";
import { Option } from "@prisma/client";

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

export async function getStaticProps({ params }: any) {
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

export default function Results({ poll, options }: Props) {
  const totalVotes = options.reduce((acc, option) => {
    return acc + option.votes;
  }, 0);
  console.log(totalVotes);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-3 font-mono relative">
      <div className="flex flex-col justify-center items-center w-1/2 h-2/3 p-2 gap-3">
        <h1 className="text-2xl font-bold">
          {poll?.title}{" "}
          <span className="text-sm text-gray-500 underline decoration-dotted underline-offset-2">
            {poll?.visibility}
          </span>
        </h1>
        <div className="grid gap-3 grid-cols-2 grid-rows-2 w-full">
          {options?.map((option: Option) => {
            return (
              <div key={option.id} className="flex flex-col">
                <label htmlFor="poll-result-bar">{option.votes} votes</label>
                <button
                  className={`flex justify-between items-center rounded ring-2 ring-green-500 px-4 py-2 w-full cursor-default h-full poll-result-bar`}
                  key={option.id}
                  name='poll-result-bar'
                  style={{
                    backgroundImage:
                      `linear-gradient(to right, #22c55e 0%, #22c55e ${
                        (option.votes / totalVotes) * 100
                      }%, #4ade80 ${
                        (option.votes / totalVotes) * 100
                      }%, #4ade80 100%)`,
                  }}
                >
                  <span>{option.number}.</span>
                  <h2 className="text-md font-mono font-bold">{option.text}</h2>
                  <span>{Math.round((100 * option.votes) / totalVotes)}%</span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-sm flex-wrap justify-center items-center w-screen text-center absolute bottom-0 p-3">
          <span className="text-gray-500 underline decoration-dotted underline-offset-2">
            created by
          </span>{" "}
          {poll?.createdBy}
          {" | "}
          <span className="text-gray-500 underline decoration-dotted underline-offset-2">
            upvotes
          </span>{" "}
          {poll?.upvotes}
          {" | "}
          <span className="text-gray-500 underline decoration-dotted underline-offset-2">
            created on
          </span>{" "}
          {new Date(poll?.createdAt).toLocaleDateString()}{" "}
          {new Date(poll?.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
