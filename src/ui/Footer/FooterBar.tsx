import { DeviceCheck } from "@/lib/DeviceCheck";
import AudioPlayerWrapper from "./AudioPlayerWrapper";
import DeviceContextFooter from "@/lib/DeviceContext/DeviceContextFooter";
async function FooterBar() {
  // get cache from cache api
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <DeviceContextFooter device={deviceFromUserAgent}>
      <AudioPlayerWrapper />
    </DeviceContextFooter>
  );
}

export default FooterBar;
