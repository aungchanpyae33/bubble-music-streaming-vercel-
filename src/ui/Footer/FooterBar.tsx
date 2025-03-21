import { DeviceCheck } from "@/lib/DeviceCheck";
import AudioPlayerWrapper from "./AudioPlayerWrapper";
import DeviceContextFooter from "@/lib/DeviceContext/DeviceContextFooter";
import FooterNavi from "./FooterNavi";
async function FooterBar() {
  // get cache from cache api
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <DeviceContextFooter device={deviceFromUserAgent}>
      <AudioPlayerWrapper>
        <FooterNavi device={deviceFromUserAgent} />
      </AudioPlayerWrapper>
    </DeviceContextFooter>
  );
}

export default FooterBar;
