import { DeviceCheck } from "@/lib/DeviceCheck";
import AudioPlayerWrapper from "./AudioPlayerWrapper";
import DeviceContextFooter from "@/lib/DeviceContext/DeviceContextFooter";
async function FooterBar() {
  //consider to use 'use cache' (it is very new feature)
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <DeviceContextFooter device={deviceFromUserAgent}>
      <AudioPlayerWrapper />
    </DeviceContextFooter>
  );
}

export default FooterBar;
