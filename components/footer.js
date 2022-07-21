const SiteFooter = () => {
  return (
    <div className="absolute bottom-0 p-2 flex justify-center items-center">
      <p className="text-sm text-gray-500 dark:text-gray-200">
        made with{" "}
        <span className="text-rose-600 dark:text-rose-300">{`<3`}</span> by{" "}
        <a
          className="underline cursor-pointer decoration-dotted underline-offset-2 text-green-600 dark:text-green-300"
          href="https://github.com/asrvd"
        >
          ashish
        </a>
      </p>
    </div>
  );
};

export default SiteFooter;
