import NoExist from "../icon/NoExist";

function NoExistLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full  items-center justify-center">
      <NoExist width={"70%"} height={"70%"} />
      <span className="">ဒီသီချင်းအတွက် သီချင်းစာသား မရှိသေးပါ</span>
    </div>
  );
}

export default NoExistLyric;
