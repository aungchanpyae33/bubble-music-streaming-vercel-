import { getSimilarSongQueue } from "@/database/client-data";
import { generateUUID } from "@/lib/GenerateUUID";
import {
  currentAddToQueueAction,
  ShouldFetchSongsListId,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
} from "@/lib/zustand";
import { useEffect, useRef } from "react";

function PlaceHolderFetchQueue() {
  const abortController = useRef<AbortController | null>(null);
  const FetchSongsListIdPreRef = useRef<string | null>(null);
  const FetchSongsListId = useShouldFetchSongsList(
    (state: ShouldFetchSongsListId) => state.FetchSongsListId
  );
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue
  );
  const { id, name } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  useEffect(() => {
    console.log(
      FetchSongsListId,
      FetchSongsListIdPreRef.current,
      FetchSongsListId
    );
    // (async () => {
    //   if (
    //     FetchSongsListId &&
    //     FetchSongsListIdPreRef.current !== FetchSongsListId
    //   ) {
    //     FetchSongsListIdPreRef.current = FetchSongsListId;
    //     if (abortController.current) {
    //       // it will abort when it use with signal
    //       abortController.current.abort();
    //       abortController.current = null;
    //     }
    //     abortController.current = new AbortController();
    //     const { data, error } = await getSimilarSongQueue(id, abortController);
    //     if (!data || error) return null;
    //     console.log("run");
    //     const updatedSongs = data.map((song) => ({
    //       ...song,
    //       uni_id: generateUUID(),
    //     }));
    //     if (
    //       FetchSongsListId &&
    //       FetchSongsListIdPreRef.current === FetchSongsListId
    //     ) {
    //       console.log("fin");
    //       currentAddToQueue(updatedSongs);
    //     }
    //   }
    // })();
  }, [id, FetchSongsListId, currentAddToQueue]);
  return null;
}

export default PlaceHolderFetchQueue;
