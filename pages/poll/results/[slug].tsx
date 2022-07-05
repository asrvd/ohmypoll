import { PrismaClient } from "@prisma/client";
import { Props } from "../[slug]";
import { Option } from "@prisma/client";
import SiteFooter from "../../../components/footer";
import Link from "next/link";
import { useRouter } from "next/router";

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
    fallback: true,
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
      revaildate: 5,
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
  const totalVotes = options?.reduce((acc, option) => {
    return acc + option.votes;
  }, 0);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex flec-col justify-center items-center w-screen h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-3 font-sans relative">
      <div className="absolute text-green-500 top-0 p-2 flex justify-left text-sm items-left w-full lg:w-2/3 md:w-2/3">
        <Link href="/">
          <a>
            . . /{" "}
            <span className="cursor-default text-gray-400">
              poll / results / {poll?.id}
            </span>
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-left w-full h-full lg:w-2/3 md:w-2/3 lg:h-2/3 p-2 gap-3">
        <h1 className="text-2xl font-bold">
          {poll?.title}{" "}
          <span className="text-sm text-gray-500 underline decoration-dotted underline-offset-2">
            {poll?.visibility}
          </span>
        </h1>
        <div className="grid gap-3 grid-cols-2 w-full">
          {options?.map((option: Option) => {
            return (
              <div key={option.id} className="flex flex-col">
                <label htmlFor="poll-result-bar">{option.votes} votes</label>
                <button
                  className={`flex shadow-md justify-between items-center rounded ring-2 ring-green-500 px-4 py-2 w-full cursor-default h-full poll-result-bar`}
                  key={option.id}
                  name="poll-result-bar"
                  style={{
                    backgroundImage:
                      `linear-gradient(to right, #22c55e 0%, #22c55e ${
                        (option.votes / totalVotes) * 100
                      }%, #4ade80 ${
                        (option.votes / totalVotes) * 100
                      }%, #4ade80 100%)`,
                  }}
                >
                  <span className="text-sm lg:text-md md:text-md font-sans font-bold">
                    {option.number}.
                  </span>
                  <h2 className="text-sm lg:text-md md:text-md font-sans font-bold">
                    {option.text}
                  </h2>
                  <span className="text-sm lg:text-md md:text-md font-sans font-bold">
                    {Math.round((100 * option.votes) / totalVotes)}%
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-[0.65rem] lg:text-sm md:text-sm flex-wrap justify-center self-center items-center w-screen text-center absolute bottom-8 p-2">
          <span className="text-gray-500 text-[0.65rem] lg:text-sm md:text-sm underline decoration-dotted underline-offset-2">
            created by
          </span>{" "}
          {poll?.createdBy}
          {" | "}
          <span className="text-gray-500 text-[0.65rem] lg:text-sm md:text-sm underline decoration-dotted underline-offset-2">
            upvotes
          </span>{" "}
          {poll?.upvotes}
          {" | "}
          <span className="text-gray-500 text-[0.65rem] lg:text-sm md:text-sm underline decoration-dotted underline-offset-2">
            created on
          </span>{" "}
          {new Date(poll?.createdAt).toLocaleDateString()}{" "}
          {new Date(poll?.createdAt).toLocaleTimeString()}
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
