"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import OptionIconEl from "./OptionIconEl";
import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";

function ShareButton() {
  const { setShow } = useContext(ContextMoreOption);
  //test for now , only showcase
  //should go to the trackPage , artistPage, albumPage, playlistPage
  return (
    <OptionItem>
      <button className="flex items-center" onClick={() => setShow(false)}>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={Link2} />
        </OptionIconEl>
        <span>share </span>
      </button>
    </OptionItem>
  );
}

export default ShareButton;
