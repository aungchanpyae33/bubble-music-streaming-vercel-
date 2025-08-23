import Image from "next/image";
import Error from "../icon/Error";

function ErrorLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <Error height={250} width={250} />
      <span className=" whitespace-nowrap">
        သီချင်းစာသားကို ရယူရာတွင် အခက်အခဲရှိခဲ့ပါသည်
      </span>
    </div>
  );
}

export default ErrorLyric;
