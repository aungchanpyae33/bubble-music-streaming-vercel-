import { RefObject } from "react";
import { persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";
export interface SongDetail {
  url: string;
  sege: number;
  duration: number;
  name: string;
}

export interface IsRepeatState {
  isRepeat: boolean;
}
export interface RepeatAction {
  setRepeat: () => void;
}
export interface PrefetchAction {
  prefetchSegment: (params: PrefetchParams) => Promise<void>;
}
export interface PrefetchParams {
  currentUrl: string;
  sourceBuffer: RefObject<SourceBuffer | null>;
  mediaSource: RefObject<MediaSource | null>;
  segNum: number | undefined;
  abortController: RefObject<AbortController | null>;
  audioInitBufferRef: RefObject<ArrayBuffer | null>;
  audioSeg1BufferRef: RefObject<ArrayBuffer | null>;
  prefetchedUrl: RefObject<string>;
}
export interface SongState {
  songCu: SongDetail | {};
}
export interface SongActions {
  updateSongCu: (newSong: SongState["songCu"]) => void;
}

export interface currentSongPlaylist {
  playListArray: SongDetail[];
}

export interface currentSongPlaylistAction {
  setPlayListArray: (newList: SongDetail[]) => void;
}

export interface previousSongPlaylist {
  previousPlayListArray: SongDetail[];
}

export interface previousSongPlaylistAction {
  setPreviousPlayListArray: (newList: SongDetail[]) => void;
}

export interface SongFunctionState {
  Isplay: Record<string, boolean | undefined>;
}
export interface SongFunctionActions {
  setPlay: (key: string, play: boolean | undefined) => void;
}

export interface AudioValueState {
  value: number;
}
export interface AudioValueActions {
  setValue: (newValue: number) => void;
}

export interface AudioDraggingState {
  isDragging: boolean;
}
export interface AudioDraggingActions {
  setIsDragging: (newState: boolean) => void;
}

export interface VolumeValueState {
  value: number;
}
export interface VolumeValueActions {
  setValue: (newValue: number) => void;
}
export interface VolumeDraggingState {
  isDragging: boolean;
}
export interface VolumeDraggingActions {
  setIsDragging: (newState: boolean) => void;
}

export interface queueState {
  isQueue: boolean;
}

export interface queueStateAction {
  setIsQueue: (value: boolean) => void;
}

export const useSong = create<SongState & SongActions>()(
  persist(
    (set) => ({
      songCu: {},
      updateSongCu: (newSong) =>
        set(() => ({
          songCu: { ...newSong },
        })),
    }),
    {
      name: "currentSong-storage",
    }
  )
);

// export const useCurrentPlayList = create<
//   currentSongPlaylist & currentSongPlaylistAction
// >()(
//   persist(
//     (set) => ({
//       playListArray: [
//         {
//           url: "https://s3.tebi.io/test1345/hello/init.mp4",
//           sege: 27,
//           name: "gone",
//           duration: 52.199,
//         },
//       ],

//       setPlayListArray: (newList: SongDetail[]) =>
//         set((state) => ({
//           playListArray: newList,
//         })),
//     }),
//     {
//       name: "playlist-storage",
//     }
//   )
// );

export const usePreviousPlayList = create<
  previousSongPlaylist & previousSongPlaylistAction
>()(
  persist(
    (set) => ({
      previousPlayListArray: [
        {
          url: "https://s3.tebi.io/test1345/hello/init.mp4",
          sege: 27,
          name: "gone",
          duration: 52.199,
        },
      ],
      setPreviousPlayListArray: (newList: SongDetail[]) =>
        set(() => ({
          previousPlayListArray: newList,
        })),
    }),
    {
      name: "previous-playlistArray-storage",
    }
  )
);

export const useSongFunction = create<SongFunctionState & SongFunctionActions>(
  (set) => ({
    Isplay: {},
    setPlay: (key: string, play: boolean | undefined) =>
      set((state) => ({
        Isplay: {
          [key]: play || !state.Isplay[key],
        },
      })),
  })
);

export const useRepeatAndCurrentPlayList = create<
  currentSongPlaylist &
    currentSongPlaylistAction &
    IsRepeatState &
    RepeatAction &
    PrefetchAction
>()(
  persist(
    (set, get) => ({
      playListArray: [
        {
          url: "https://s3.tebi.io/test1345/hello/init.mp4",
          sege: 27,
          name: "gone",
          duration: 52.199,
        },
      ],
      setPlayListArray: (newList: SongDetail[]) =>
        set((state) => ({
          playListArray: newList,
        })),
      isRepeat: false,
      setRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
      // if it check as isRepeat in function component, it will re-render entrire component
      prefetchSegment: async ({
        currentUrl,
        sourceBuffer,
        mediaSource,
        segNum,
        abortController,
        audioInitBufferRef,
        audioSeg1BufferRef,
        prefetchedUrl,
      }: PrefetchParams) => {
        const fetchOptions: RequestInit = {
          signal: abortController!.current!.signal,
        };
        const urlSongs = get().playListArray.flatMap(({ url }) => url);
        const currentIndex = urlSongs.indexOf(currentUrl);
        const url = urlSongs[currentIndex + 1];
        // Early return if repeat is enabled
        if (get().isRepeat) return;

        const initUrl = url;
        const seg1Url = url.replace("init.mp4", "seg-1.m4s");

        try {
          const [initBuffer, seg1Buffer] = await Promise.all([
            fetch(initUrl, fetchOptions).then((res) => res.arrayBuffer()),
            fetch(seg1Url, fetchOptions).then((res) => res.arrayBuffer()),
          ]);

          if (
            sourceBuffer.current?.buffered &&
            !sourceBuffer.current.updating &&
            mediaSource.current?.readyState
          ) {
            audioInitBufferRef.current = initBuffer;
            audioSeg1BufferRef.current = seg1Buffer;
            prefetchedUrl.current = url;
          }
        } catch (err: any) {
          if (err.name === "AbortError") {
            console.log(`the song segments sege-${segNum} fetching is aborted`);
          } else {
            console.error(`Error fetching segments sege-${segNum}`, err);
          }
        }
      },
    }),
    {
      name: "repeatAndPlaylistArray-storage",
    }
  )
);

export const useAudioValue = create<AudioValueState & AudioValueActions>(
  (set) => ({
    value: 100,
    setValue: (newValue: number) =>
      set(() => ({
        value: newValue,
      })),
  })
);

export const useAudioDragging = create<
  AudioDraggingState & AudioDraggingActions
>((set) => ({
  isDragging: false,
  setIsDragging: (newState: boolean) =>
    set(() => ({
      isDragging: newState,
    })),
}));

export const useVolumeValue = create<VolumeValueState & VolumeValueActions>(
  (set) => ({
    value: 0,
    setValue: (newValue: number) =>
      set(() => ({
        value: newValue,
      })),
  })
);

export const useVolumeDragging = create<
  VolumeDraggingState & VolumeDraggingActions
>((set) => ({
  isDragging: false,
  setIsDragging: (newState: boolean) =>
    set(() => ({
      isDragging: newState,
    })),
}));

export const useOnlyOneSider = create<queueState & queueStateAction>((set) => ({
  isQueue: false,
  setIsQueue: (value: boolean) => set(() => ({ isQueue: value })),
}));
