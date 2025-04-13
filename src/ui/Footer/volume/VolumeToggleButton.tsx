import IconWrapper from "@/ui/general/IconWrapper";
import { Volume2, VolumeX } from "lucide-react";
import { useContext } from "react";
import { volumeContext } from "./ContextVolume";

function VolumeToggleButton({ value }: { value: number }) {
  const { setOpen } = useContext(volumeContext);
  return (
    <button className="lg:hidden" onClick={() => setOpen(true)}>
      {" "}
      {value === 100 ? (
        <IconWrapper size="small" Icon={VolumeX} />
      ) : (
        <IconWrapper size="small" Icon={Volume2} />
      )}
    </button>
  );
}

export default VolumeToggleButton;
