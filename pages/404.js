import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center font-sans gap-3 p-3">
      <div className="w-full lg:w-1/2 md:w-2/3 items-left gap-3 flex flex-col">
        <h1 className="border-b-2 border-dotted border-gray-500 text-[2rem] lg:text-[3rem] md:text-[3rem]">
          <span className="text-[3rem] lg:text-[4rem] md:text-[4rem] font-extrabold text-rose-500">404</span>{" "}
          page not found :(
        </h1>
        <Link href="/">
          <a className="text-green-600 text-lg">
            . . / <span className="cursor-default text-gray-500">404.js</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
