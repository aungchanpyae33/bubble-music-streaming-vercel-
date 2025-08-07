import Image from "next/image";

function TopResult() {
  return (
    <div className="">
      <h1 className=" text-xl p-2 px-4">top result</h1>
      <div className=" p-4 bg-[#333333] flex flex-col  gap-2 ">
        <div className=" flex items-center gap-5">
          <div
            className=" lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-[#333333]
              "
          >
            <Image
              src={
                "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
              }
              priority={true}
              sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
              fill
              alt="singer song"
            />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ex
            unde doloremque qui in dicta accusantium illum quam error aliquam.
          </div>
        </div>
        <div>
          <button className=" border p-1"> i am type</button>
          <span> : lee hi</span>
        </div>
      </div>
    </div>
  );
}

export default TopResult;
