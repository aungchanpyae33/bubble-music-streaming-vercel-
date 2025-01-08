import Image from "next/image";

function AudioDisplayFooter({ urlImage }: { urlImage: string }) {
  return (
    <div className=" p-1  w-[70px] h-[70px]   flex items-center justify-center shadow-md ">
      <div className=" w-[70px]">
        <Image
          src={urlImage}
          width={300}
          height={300}
          alt="test image"
          className="w-full h-full"
          priority={true}
        />
      </div>
    </div>
  );
}

export default AudioDisplayFooter;
