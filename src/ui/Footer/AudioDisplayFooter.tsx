import Image from "next/image";

function AudioDisplayFooter({ urlImage }: { urlImage: string }) {
  return (
    <div className=" p-1 flex-shrink-0  w-[70px] h-[70px]   flex items-center justify-center shadow-md ">
      <div className=" w-full h-full relative">
        <Image
          src={urlImage}
          fill
          alt="test image"
          className="w-full h-full"
          priority={true}
        />
      </div>
    </div>
  );
}

export default AudioDisplayFooter;
