import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddSongMutate = ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) => {
  const insertSongsToPlaylistAction = insertSongtoPlaylist.bind(
    null,
    playlistId,
    songId!
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await insertSongsToPlaylistAction(),
    onSuccess: (returnData, variables, context) => {
      const { data, error } = returnData;
      if (!data) return;
      const mutatedData = data[0];
      if (!error) {
        queryClient.setQueryData(["playlist", playlistId], mutatedData);
      }
    },
  });
  return mutation;
};

export default useAddSongMutate;
