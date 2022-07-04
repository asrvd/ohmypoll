import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen font-sans text-center p-3 gap-4">
      <div className="flex flex-col mt-3 justify-center items-center lg:w-2/3 md:w-2/3 w-full text-center">
        <h2 className="w-full mb-0 text-shadow-lg text-[4rem] lg:text-[5rem] md:text-[5rem] font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          oh my poll !
        </h2>
        <p className="text-shadow-lg mt-0 text-emerald-700">
          create polls and ask others anything you want privately or publicly -{" "}
          {`it's`} free!
        </p>
      </div>
      <div className="flex mt-3 gap-3 justify-center items-center lg:w-1/3 md:w-1/2 w-full text-center">
        <button
          className="duration-300 relative rounded bg-green-300 hover:ring-2 ring-green-400 cursor-pointer px-4 py-2 w-full h-full shadow-md text-center"
          onClick={() => router.push("/create")}
        >
          create a poll
        </button>
        <button
          className="duration-300 rounded bg-green-300 hover:ring-2 ring-green-400 cursor-pointer px-4 py-2 w-full h-full shadow-md text-center"
          onClick={() => router.push("/list")}
        >
          see public polls
        </button>
      </div>
    </div>
  );
}
