const SiteFooter = () => {
  return (
    <div className="absolute bottom-0 p-2 flex justify-center items-center">
      <p className="text-sm text-gray-500">
        made with <span className="text-rose-600">{`<3`}</span> by{" "}
        <a
          className="underline cursor-pointer decoration-dotted underline-offset-2 text-green-600"
          href="https://github.com/asheeeshh"
        >
          ashish
        </a>
      </p>
    </div>
  );
};

export default SiteFooter;
