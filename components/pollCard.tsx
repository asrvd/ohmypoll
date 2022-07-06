import { Poll } from "@prisma/client";
import { useRouter } from "next/router";

type Props = {
  poll: Poll;
};

export default function PollCard(props: Props) {
  const router = useRouter();
  const { title, createdAt, upvotes, createdBy, id, votes } = props?.poll;
  return (
    <div
      className="hover:scale-[1.02] duration-500 flex flex-col w-full h-full gap-3 shadow-lg p-5 cursor-pointer border-2 border-gray-500 dark:border-gray-300 rounded justify-between"
      onClick={() => router.push(`/poll/${id}`)}
    >
      <div className="flex gap-3 self-start items-center">
        <span className="text-xs text-gray-500 dark:text-gray-300">
          poll#{id}
        </span>
        <h2 className="text-md lg:text-lg md:text-lg flex-nowrap underline decoration-dotted underline-offset-2 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <div className="flex gap-1 self-start items-center text-gray-500 dark:text-gray-300 text-sm">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          △ {upvotes}
        </span>
        {" | "}
        <span className="text-sm text-gray-500 dark:text-gray-300">
          by {createdBy}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          on {new Date(createdAt).toLocaleDateString()}
        </span>
        {" | "}
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {votes} {votes === 1 ? "person" : "people"} voted
        </span>
      </div>
    </div>
  );
}
