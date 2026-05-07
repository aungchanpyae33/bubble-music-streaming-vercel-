import NotFoundWrapper from "./NotFoundWrapper";
import { GlobalNotFoundIcon } from "../CustomIcon/Icon";
import AppWrapper from "../general/SideEffectPageWrapper/AppWrapper";

function AppNotFound() {
  return (
    <AppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />

      <NotFoundWrapper />
    </AppWrapper>
  );
}

export default AppNotFound;
