import Link from "next/link";
import UserProfile from "./UserProfile";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import TestCom from "../TestCom";

async function UserInfo() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      {user ? (
        <UserProfile name={user && user.given_name + user.family_name!}>
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
          <TestCom>
            <div>icon</div>
            <div>ထွက်ရန်</div>
          </TestCom>
        </UserProfile>
      ) : (
        <LoginLink className="bg-[#222222] h-[40px] px-2 hover:bg-[#333333] border-opacity-15 border border-neutral-200 rounded-sm flex items-center ">
          ဝင်ရန်
        </LoginLink>
      )}
    </>
  );
}

export default UserInfo;
