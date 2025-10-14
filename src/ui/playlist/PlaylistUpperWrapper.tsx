import { DeviceCheck } from "@/lib/DeviceCheck";
import PlaylistUpperContainer from "./PlaylistUpperContainer";

async function PlaylistUpperWrapper() {
  const deviceFromUserAgent = await DeviceCheck();
  return <PlaylistUpperContainer deviceFromUserAgent={deviceFromUserAgent} />;
}

export default PlaylistUpperWrapper;
