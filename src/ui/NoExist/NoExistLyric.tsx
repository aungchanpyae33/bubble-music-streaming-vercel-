import NoExist from "../icon/NoExist";

function NoExistLyric() {
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <NoExist width={250} height={250} />
      <span className=" whitespace-nowrap">
        ဒီသီချင်းအတွက် သီချင်းစာသား မရှိသေးပါ
      </span>
    </div>
  );
}

export default NoExistLyric;
