import { X } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useEffect, useRef, useState, useTransition } from "react";
import Form from "next/form";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import TitleInput from "./createPlaylist/TitleInput";
import DescriptionInput from "./createPlaylist/DescriptionInput";
import SubmitButton from "./createPlaylist/SubmitButton";
import InitCreateButton from "./createPlaylist/InitCreateButton";
import { insertDataAction } from "@/actions/createPlaylist";
import { useQueryClient } from "@tanstack/react-query";
import CheckTypeCreate from "./createPlaylist/CheckTypeCreate";

function PlaylistAdd() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const formParentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    open && formParentRef.current?.focus();
  }, [open, formParentRef]);
  const [isPending, startTransition] = useTransition();
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
              tabIndex={0}
              ref={formParentRef}
              className="absolute   top-[50%] left-[50%] -translate-x-[50%] bg-zinc-800 p-3 rounded-md border border-zinc-500 -translate-y-[50%]  max-w-[480px] w-[94%]"
              onClick={(e) => e.stopPropagation()}
            >
              <Form
                action={async (formData: FormData) => {
                  startTransition(async () => {
                    const playlistname = formData.get("playlistname");
                    const type = formData.get("typeCheck");
                    const check_type = type === "public" ? true : false;
                    if (
                      typeof playlistname !== "string" ||
                      typeof type !== "string"
                    ) {
                      return;
                    }
                    const { data, error } = await insertDataAction(
                      playlistname,
                      check_type
                    );

                    if (data) {
                      queryClient.setQueryData(["user-library"], {
                        data,
                        error: null,
                      });
                      setOpen(false);
                    }
                  });
                }}
                className=""
                id="createPlaylist"
              >
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
                  <CheckTypeCreate />
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
