import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import { ReactNode, useContext } from "react";

function VolumeWrapper({ children }: { children: ReactNode }) {
  const { open } = useContext(Context);
  return <>{!open && children}</>;
}

export default VolumeWrapper;
