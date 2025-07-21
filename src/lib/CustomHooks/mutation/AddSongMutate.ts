import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddSongMutate = (playlistId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: insertSongtoPlaylist,
    onSuccess: (queryData, variables, context) => {
      const { data, error } = queryData;
      if (!data) return;
      if (!error) {
        queryClient.setQueryData(["playlist", playlistId], {
          data,
          error: null,
        });
      }
    },
  });
  return mutation;
};

export default useAddSongMutate;
