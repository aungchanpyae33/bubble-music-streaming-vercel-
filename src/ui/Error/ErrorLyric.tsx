import Error from "../icon/Error";

function ErrorLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full items-center justify-center">
      <Error height={"70%"} width={"70%"} />
      <span className="">သီချင်းစာသားကို ရယူရာတွင် အခက်အခဲရှိခဲ့ပါသည်</span>
    </div>
  );
}

export default ErrorLyric;
