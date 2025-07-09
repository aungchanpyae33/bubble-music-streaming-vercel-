import Image from "next/image";

function AudioDisplayFooter({ urlImage }: { urlImage: string }) {
  return (
    <div className="  flex-shrink-0 bg-[#222222]  w-[70px] h-[70px]      flex items-center justify-center shadow-md ">
      <div className=" size-[62px] rounded overflow-hidden relative">
        <Image
          src={
            "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
          }
          fill
          sizes="62px"
          alt="test image"
          className="w-full h-full"
          priority={true}
        />
      </div>
    </div>
  );
}

export default AudioDisplayFooter;
