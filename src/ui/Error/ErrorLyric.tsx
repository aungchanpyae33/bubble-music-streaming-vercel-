import Image from "next/image";

function ErrorLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <Image
        priority={true}
        src={"/ui/error-lyric.svg"}
        width={200}
        height={200}
        sizes="200px"
        alt="logo"
        className=""
      />
      <span className=" whitespace-nowrap">
        {" "}
        သီချင်းစာသားကို ရယူရာတွင် အခက်အခဲရှိခဲ့ပါသည်
      </span>
    </div>
  );
}

export default ErrorLyric;
