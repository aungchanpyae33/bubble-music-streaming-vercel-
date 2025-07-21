import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
const useRemoveSongMutate = (id: string) => {
  const { setShow } = useContext(ContextMoreOption);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeSongsFromPlaylist,
    onSuccess: (queryData, variables, context) => {
      const { data, error } = queryData;
      if (!data || error) return;
      if (!error) {
        queryClient.setQueryData(["playlist", id], { data, error: null });
      }
      setShow(false);
    },
  });
  return mutation;
};
export default useRemoveSongMutate;
