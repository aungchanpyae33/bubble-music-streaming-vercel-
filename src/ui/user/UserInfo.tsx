import Link from "next/link";
import UserProfile from "./UserProfile";

import TestCom from "../TestCom";
import { createClient } from "@/database/server";

async function UserInfo() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  // console.log(user);

  return (
    <>
      {user ? (
        <UserProfile
          name={
            user &&
            user.user_metadata.first_name + " " + user.user_metadata.last_name
          }
        >
          <Link
            href={"/profile"}
            className="hover:bg-[#333333] p-2 flex gap-x-3 "
          >
            <div>icon</div>
            <div>ပရိုဖိုင်</div>
          </Link>
          <Link
            href={"/setting"}
            className="hover:bg-[#333333] p-2 flex gap-x-3 "
          >
            <div>icon</div>
            <div>ဆက်တင်မျာ:</div>
          </Link>
          <Link
            href={"/feedback"}
            className="hover:bg-[#333333] p-2 flex gap-x-3"
          >
            <div>icon</div>
            <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
          </Link>
          <Link
            href={"/feedback"}
            className="hover:bg-[#333333] p-2 flex gap-x-3"
          >
            <div>icon</div>
            <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
          </Link>
          <Link
            href={"/feedback"}
            className="hover:bg-[#333333] p-2 flex gap-x-3"
          >
            <div>icon</div>
            <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
          </Link>
          <Link
            href={"/feedback"}
            className="hover:bg-[#333333] p-2 flex gap-x-3"
          >
            <div>icon</div>
            <div>အကူအညီ နှင့် အကြံပြုချက် </div>{" "}
          </Link>
          <TestCom />
        </UserProfile>
      ) : (
        <Link href={"/auth/login"}>
          <button className="bg-[#222222] h-[40px] px-2 hover:bg-[#333333] border-opacity-15 border border-neutral-200 rounded-sm flex items-center ">
            ဝင်ရန်
          </button>
        </Link>
      )}
    </>
  );
}

export default UserInfo;
