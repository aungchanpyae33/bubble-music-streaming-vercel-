import Link from "next/link";
import UserProfile from "./UserProfile";

function UserInfo() {
  // test for now
  const user = {
    name: "aungchanpyae",
  };
  return (
    <UserProfile name={user.name}>
      <div className="p-2 flex  gap-x-3  border-b-[1px] border-gray-700">
        <div>icon</div>
        <div className="truncate">
          <div className=" truncate select-all"> aung chan pyae</div>
          <div className=" select-all truncate">@aungchanpyae3304</div>
        </div>
      </div>
      <Link href={"/profile"} className="hover:bg-[#333333] p-2 flex gap-x-3 ">
        <div>icon</div>
        <div> Profile</div>
      </Link>
      <Link href={"/setting"} className="hover:bg-[#333333] p-2 flex gap-x-3 ">
        <div>icon</div>
        <div>Setting</div>
      </Link>
      <Link href={"/feedback"} className="hover:bg-[#333333] p-2 flex gap-x-3 ">
        <div>icon</div>
        <div>Help & Feedback</div>{" "}
      </Link>
      <button className="hover:bg-[#333333] p-2 flex gap-x-3 border-t-[1px] border-gray-700  ">
        <div>icon</div>
        <div> Logout</div>
      </button>
    </UserProfile>
  );
}

export default UserInfo;
