import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import { listSongsSection, navbarList } from "@/database/data";
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
      if (!error && data) {
        const { data: playlistData } = queryClient.getQueryData<{
          data: { songs: listSongsSection };
          error: null | string;
        }>(["playlist", id])!;

        if (!playlistData) return;
        const { songs } = playlistData;
        if (!songs) return;
        const { idArray, songs: scope_songs } = songs;
        const didFirstIdRemoving = idArray[0] === variables.id;
        if (didFirstIdRemoving) {
          queryClient.setQueryData(
            ["user-library"],
            (
              oldData:
                | {
                    data: {
                      userLib: Record<string, navbarList> & {
                        idArray: string[];
                      };
                    };
                    error: null | string;
                  }
                | undefined
            ) => {
              if (!oldData) return oldData;

              const cover_url = idArray[1]
                ? scope_songs[idArray[1]].cover_url
                : null;
              const updatedUserLib = {
                ...oldData.data.userLib,
                [id]: {
                  ...oldData.data.userLib[id],
                  cover_url,
                },
              };
              return {
                data: {
                  userLib: updatedUserLib,
                },
                error: null,
              };
            }
          );
        }
        queryClient.setQueryData(["playlist", id], { data, error: null });
      }
      setShow(false);
    },
  });
  return mutation;
};
export default useRemoveSongMutate;
