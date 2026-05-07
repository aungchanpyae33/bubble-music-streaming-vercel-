import { GlobalNotFoundIcon } from "../CustomIcon/Icon";
import SubAppWrapper from "../general/SideEffectPageWrapper/SubAppWrapper";

import NotFoundWrapper from "./NotFoundWrapper";

function SubNotFound() {
  return (
    <SubAppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <NotFoundWrapper />
    </SubAppWrapper>
  );
}

export default SubNotFound;
