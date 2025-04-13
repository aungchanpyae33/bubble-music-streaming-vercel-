import { X } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useEffect, useRef, useState } from "react";
import Form from "next/form";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import TitleInput from "./createPlaylist/TitleInput";
import DescriptionInput from "./createPlaylist/DescriptionInput";
import SubmitButton from "./createPlaylist/SubmitButton";

import InitCreateButton from "./createPlaylist/InitCreateButton";
import { PostgrestError } from "@supabase/supabase-js";
interface PlaylistAddProp {
  state: {
    data: any[];
    error: PostgrestError | null;
  };
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

function PlaylistAdd({ state, formAction, isPending }: PlaylistAddProp) {
  const [open, setOpen] = useState(false);
  const formParentRef = useRef<HTMLDivElement>(null);
  //useeffect when when playlistAdd is re-render because of return from formaction , it will always true state and initial ispending false  , it is already run  before click initcreateButton ,
  useEffect(() => {
    if (!isPending && state) {
      setOpen(false);
    }
  }, [isPending, state]);

  return (
    <>
      <InitCreateButton open={open} setOpen={setOpen} />
      {open && (
        <div
          className="fixed   w-screen bg-black/50   h-screen inset-0 z-40"
          onClick={() => setOpen(false)}
        >
          <FocusTrap refFocus={formParentRef}>
            <div
              ref={formParentRef}
              className="absolute   top-[50%] left-[50%] -translate-x-[50%] bg-zinc-800 p-3 rounded-md border border-zinc-500 -translate-y-[50%]  max-w-[480px] w-[94%]"
              onClick={(e) => e.stopPropagation()}
            >
              <Form action={formAction} className="" id="createPlaylist">
                <fieldset className=" flex flex-col gap-2 items-start">
                  <legend className="text-lg font-semibold flex w-full justify-between items-center  text-white mb-4">
                    <h3 className="">သီချင်းစာရင်း အသစ်</h3>
                    <button
                      type="button"
                      className=" bg-transparent transition-colors  duration-200 hover:bg-[#333333] p-1 rounded-full flex items-center justify-center"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <IconWrapper size="large" Icon={X} />
                    </button>
                  </legend>
                  <TitleInput />
                  <DescriptionInput />
                  <SubmitButton isPending={isPending} />
                </fieldset>
              </Form>
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  );
}

export default PlaylistAdd;
