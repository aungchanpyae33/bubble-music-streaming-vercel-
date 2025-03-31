import Link from "next/link";
import UserProfile from "./UserProfile";

function UserInfo() {
  // test for now
  const user = {
    name: "aungchanpyae",
  };
  return (
    <UserProfile name={user.name}>
      <Link href={"/profile"} className="hover:bg-[#333333] p-2 flex gap-x-3 ">
        <div>icon</div>
        <div>ပရိုဖိုင်</div>
      </Link>
      <Link href={"/setting"} className="hover:bg-[#333333] p-2 flex gap-x-3 ">
        <div>icon</div>
        <div>ဆက်တင်မျာ:</div>
      </Link>
      <Link href={"/feedback"} className="hover:bg-[#333333] p-2 flex gap-x-3">
        <div>icon</div>
        <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
      </Link>
      <Link href={"/feedback"} className="hover:bg-[#333333] p-2 flex gap-x-3">
        <div>icon</div>
        <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
      </Link>
      <Link href={"/feedback"} className="hover:bg-[#333333] p-2 flex gap-x-3">
        <div>icon</div>
        <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
      </Link>
      <Link href={"/feedback"} className="hover:bg-[#333333] p-2 flex gap-x-3">
        <div>icon</div>
        <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
      </Link>
      <button className="hover:bg-[#333333]  w-full p-2 flex gap-x-3 border-t-[1px] border-gray-700  ">
        <div>icon</div>
        <div>ထွက်ရန်</div>
      </button>
    </UserProfile>
  );
}

export default UserInfo;
