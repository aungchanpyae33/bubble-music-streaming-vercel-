import type { JwtPayload } from "@supabase/supabase-js";
import OptionContainer from "../OptionUI/OptionContainer";
import NameItem from "../OptionItems/NameItem";
import EmailItem from "../OptionItems/EmailItem";
import ProfileItem from "../OptionItems/ProfileItem";
import ThemeSwitchItem from "../OptionSubItems/ThemeSwitch/ThemeSwitchItem";
import LanguageSwitchItem from "../OptionSubItems/LanguageSwitch/LanguagaeSwtichItem";
import LogoutItem from "../OptionItems/LogoutItem";
import PasswordChange from "../OptionItems/PasswordChange";

function UserProfileContainer({ user }: { user: JwtPayload }) {
  const name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.user_name ||
    user.user_metadata?.login ||
    user.email;
  const email = user.user_metadata.email;
  const id = user.sub;
  return (
    <OptionContainer>
      <NameItem name={name} />
      <EmailItem email={email} />
      <ProfileItem id={id} />
      <PasswordChange />
      <ThemeSwitchItem />
      <LanguageSwitchItem />
      <LogoutItem />
    </OptionContainer>
  );
}

export default UserProfileContainer;
