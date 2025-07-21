import { editPlaylist } from "@/actions/editPlaylist";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditPlaylistMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPlaylist,
    onSuccess: (queryData, variables, context) => {
      const { data, error } = queryData;
      if (!data || error) return;

      queryClient.setQueryData(["user-library"], { data, error: null });
    },
  });
  return mutation;
};

export default useEditPlaylistMutate;
