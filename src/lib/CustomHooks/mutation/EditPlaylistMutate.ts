import { editPlaylist } from "@/actions/editPlaylist";
import { editToPlaylistAction, useEditToPlaylist } from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditPlaylistMutate = () => {
  const editToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistAction) => state.editToPlaylistAction
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPlaylist,
    onSuccess: (queryData, variables, context) => {
      const { data, error } = queryData;
      if (!data || error) return;

      queryClient.setQueryData(["user-library"], { data, error: null });
      editToPlaylistAction({});
    },
  });
  return mutation;
};

export default useEditPlaylistMutate;
