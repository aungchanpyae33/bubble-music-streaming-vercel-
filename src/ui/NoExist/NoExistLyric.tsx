import Image from "next/image";

function NoExistLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <Image
        priority={true}
        src={"/ui/no-lyric.svg"}
        width={200}
        height={200}
        sizes="200px"
        alt="the logo is telling lyric is no exist "
        className=""
      />
      <span className=" whitespace-nowrap">
        ဒီသီချင်းအတွက် သီချင်းစာသား မရှိသေးပါ
      </span>
    </div>
  );
}

export default NoExistLyric;
