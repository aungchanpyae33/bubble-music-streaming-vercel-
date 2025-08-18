import { X } from "lucide-react";
import IconWrapper from "../IconWrapper";
import TitleInput from "@/ui/navtopBar/createPlaylist/TitleInput";
import DescriptionInput from "@/ui/navtopBar/createPlaylist/DescriptionInput";
import SubmitButton from "@/ui/navtopBar/createPlaylist/SubmitButton";
import Form from "next/form";
import {
  editToPlaylist,
  editToPlaylistAction,
  editToPlaylistProps,
  useEditToPlaylist,
} from "@/lib/zustand";
import { useTransition } from "react";
import useEditPlaylistMutate from "@/lib/CustomHooks/mutation/EditPlaylistMutate";
import CheckType from "@/ui/navtopBar/createPlaylist/CheckType";

function EditContentBox() {
  const { id, name } = useEditToPlaylist(
    (state: editToPlaylist) => state.editToPlaylist
  ) as editToPlaylistProps;
  const editToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistAction) => state.editToPlaylistAction
  );
  const [isPending, startTransition] = useTransition();
  const mutation = useEditPlaylistMutate();
  function handleEdit(id: string, updateName: string, check_type: boolean) {
    mutation.mutate({ playlistId: id, playlistName: updateName, check_type });
  }
  return (
    <Form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const playlistname = formData.get("playlistname");
          const id = formData.get("id");
          const type = formData.get("typeCheck");
          const check_type = type === "public" ? true : false;
          if (
            typeof playlistname !== "string" ||
            typeof id !== "string" ||
            typeof type !== "string"
          ) {
            console.error("Invalid form data");
            return;
          }
          handleEdit(id, playlistname, check_type);
        });
      }}
      className=""
      id="createPlaylist"
    >
      <fieldset className="flex flex-col gap-2 items-start">
        <legend className="text-lg font-semibold flex w-full justify-between items-center  text-white mb-4">
          <h3 className="">သီချင်းစာရင်း အသစ်</h3>
          <button
            type="button"
            className=" bg-transparent transition-colors  duration-200 hover:bg-[#333333] p-1 rounded-full flex items-center justify-center"
            onClick={() => {
              editToPlaylistAction({});
            }}
          >
            <IconWrapper size="large" Icon={X} />
          </button>
        </legend>
        <input type="text" name="id" defaultValue={id} hidden />
        <TitleInput initValue={name} />
        <CheckType id={id} />

        <DescriptionInput initValue="vloo" />
        <SubmitButton isPending={isPending} />
      </fieldset>
    </Form>
  );
}

export default EditContentBox;
