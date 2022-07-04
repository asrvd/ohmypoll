import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center font-sans gap-3">
      <div className="w-1/5 items-left gap-3 flex flex-col">
        <h1 className="border-b-2 border-dotted border-gray-500">
          <span className="text-3xl font-extrabold text-rose-500">404</span>{" "}
          page not found :(
        </h1>
        <Link href="/">
          <a className="text-green-600">
            . . / <span className="cursor-default text-gray-500">404.js</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
