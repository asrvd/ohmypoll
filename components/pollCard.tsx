import { Poll } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  poll: Poll;
};

export default function PollCard(props: Props) {
  const router = useRouter();
  const { title, createdAt, upvotes, createdBy, id } = props?.poll;
  return (
    <div
      className="flex flex-col w-full h-full gap-3 shadow-lg p-5 cursor-pointer border-2 border-gray-500 rounded justify-between"
      onClick={() => router.push(`/poll/${id}`)}
    >
      <div className="flex gap-3 self-start items-center">
        <span className="text-xs text-gray-500">poll#{id}</span>
        <h2 className="text-md lg:text-lg md:text-lg flex-nowrap underline decoration-dotted underline-offset-2">
          {title}
        </h2>
      </div>
      <div className="flex gap-1 self-start items-center text-gray-500 text-sm">
        <span className="text-sm text-gray-500">△ {upvotes}</span>
        {" | "}
        <span className="text-sm text-gray-500">by {createdBy}</span>
        <span className="text-sm text-gray-500">
          on {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
