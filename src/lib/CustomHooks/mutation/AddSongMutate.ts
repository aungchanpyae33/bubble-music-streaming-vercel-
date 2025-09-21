import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import { navbarList } from "@/database/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAddSongMutate = (playlistId: string, cover_url: string | null) => {
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

        if (cover_url) {
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

              const updatedUserLib = {
                ...oldData.data.userLib,
                [playlistId]: {
                  ...oldData.data.userLib[playlistId],
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
      }
    },
  });

  return mutation;
};

export default useAddSongMutate;
