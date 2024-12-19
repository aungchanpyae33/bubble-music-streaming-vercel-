import UserProfile from "./UserProfile";

function UserInfo() {
  // test for now
  const user = {
    name: "aungchanpyae",
  };
  return <UserProfile name={user.name} />;
}

export default UserInfo;
