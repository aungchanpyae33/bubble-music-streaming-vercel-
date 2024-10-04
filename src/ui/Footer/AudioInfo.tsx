function AudioInfo({ name }: { name: string }) {
  return (
    <div className="[25%] max-w-[25%]">
      <div className="hidden scroll-smooth md:block md:min-w- overflow-hidden no-scrollbar hover:overflow-x-scroll ">
        <div
          className="truncate hover:text-clip  hover:w-fit"
          onMouseEnter={(e) => {
            e.currentTarget.scrollIntoView({
              behavior: "smooth",
              inline: "end",
            });
          }}
        >
          {name}
        </div>
      </div>
      <span className="text-sm">hello</span>
    </div>
  );
}

export default AudioInfo;
