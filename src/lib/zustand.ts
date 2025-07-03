import { PostgrestError } from "@supabase/supabase-js";
import { RefObject } from "react";
import { persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";
export interface SongDetail {
  url: string;
  sege: number;
  duration: number;
  song_time_stamp: Array<number>;
  name: string;
  songId: number;
  uni_id?: number;
  is_liked: boolean;
  artists: artists[];
}

export interface IsRepeatState {
  isRepeat: boolean;
}
export interface RepeatAction {
  setRepeat: () => void;
}
export interface PrefetchAction {
  prefetchSegment: (params: PrefetchParams) => Promise<ArrayBuffer[] | null>;
}
export interface PrefetchParams {
  currentUrl: string;
  abortController: RefObject<AbortController | null>;
  prefetchedUrl: RefObject<string>;
  prefetchPromiseRef: RefObject<Promise<ArrayBuffer[]> | null>;
}
export interface SongState {
  songCu: SongDetail | {};
}
export interface SongActions {
  updateSongCu: (newSong: SongState["songCu"]) => void;
}
export interface StorePlayListIdState {
  playlistId: {};
}
export interface StorePlayListIdStateAction {
  setPlaylistId: (id: StorePlayListIdState["playlistId"]) => void;
}
export interface currentSongPlaylist {
  playListArray: {};
}

export interface currentSongPlaylistAction {
  setPlayListArray: (newList: currentSongPlaylist["playListArray"]) => void;
}

export interface previousSongPlaylist {
  previousPlayListArray: {};
}

export interface resetAction {
  reset: () => void;
}
export interface previousSongPlaylistAction {
  setPreviousPlayListArray: (
    newList: previousSongPlaylist["previousPlayListArray"]
  ) => void;
}

export interface playlistFolderProps {
  playlistFolder:
    | {
        data:
          | {
              id: string;
              name: any;
            }[]
          | null;
        error: PostgrestError | null;
      }
    | undefined;
}

export interface setPlaylistFolderAction {
  setPlaylistFolder: (data: playlistFolderProps["playlistFolder"]) => void;
}
export interface addSongProps {
  addSong: song | {};
}
export interface addSongAction {
  addSongAction: (value: addSongProps["addSong"]) => void;
}
export interface addPlaylistFolderAction {
  addPlaylistFolder: (value: {
    data: any;
    error: PostgrestError | null;
  }) => void;
}
export interface SongFunctionState {
  Isplay: Record<string, boolean | undefined>;
}
export interface SongFunctionActions {
  setPlay: (key: string, play: boolean | undefined) => void;
}

export interface DirectPlayBackState {
  IsPlayList: Record<string, boolean | undefined>;
}
export interface DirectPlayBackAction {
  setPlayList: (key: string, play: boolean | undefined) => void;
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

export interface focusState {
  isInputFocus: boolean;
}

export interface focusStateAction {
  setIsInputFocus: (value: boolean) => void;
}

export interface isChildOpen {
  isChildOpen: Record<string, boolean>;
}

export interface isChildOpenAction {
  setIsChildOpen: (value: isChildOpen["isChildOpen"]) => void;
}

export interface isBoxOpen {
  isBoxOpen: boolean;
}
export interface setIsBoxOpen {
  setIsBoxOpen: (value: boolean) => void;
}

// need to select them with object key as there will be used for many component
export const useSong = create<SongState & SongActions & resetAction>()(
  (set) => ({
    songCu: {},
    updateSongCu: (newSong) =>
      set(() => ({
        songCu: { ...newSong },
      })),
    reset: () => {
      set({ songCu: {} });
    },
  })
);

export const usePreviousPlayList = create<
  previousSongPlaylist & previousSongPlaylistAction & resetAction
>()((set) => ({
  previousPlayListArray: {},
  setPreviousPlayListArray: (newList) =>
    set((state) => {
      if (
        Object.keys(newList)[0] !== Object.keys(state.previousPlayListArray)[0]
      ) {
        return { previousPlayListArray: { ...newList } };
      } else return state.previousPlayListArray;
    }),
  reset: () => {
    set({ previousPlayListArray: {} });
  },
}));

export const useSongFunction = create<SongFunctionState & SongFunctionActions>(
  (set) => ({
    Isplay: {},
    setPlay: (key: string, play: boolean | undefined) =>
      set((state) => ({
        Isplay: {
          [key === "unknown" ? Object.keys(state.Isplay)[0] : key]:
            play ||
            !state.Isplay[
              key === "unknown" ? Object.keys(state.Isplay)[0] : key
            ],
        },
      })),
  })
);

export const useStorePlayListId = create<
  StorePlayListIdState & StorePlayListIdStateAction & resetAction
>()((set) => ({
  playlistId: {},
  setPlaylistId: (id) =>
    set((state) => ({
      playlistId: { ...id },
    })),
  reset: () => {
    set({ playlistId: {} });
  },
}));

export const useDirectPlayBack = create<
  DirectPlayBackState & DirectPlayBackAction
>((set) => ({
  IsPlayList: {},
  setPlayList: (key: string, play: boolean | undefined) =>
    set((state) => ({
      IsPlayList: {
        [key === "unknown" ? Object.keys(state.IsPlayList)[0] : key]:
          play ||
          !state.IsPlayList[
            key === "unknown" ? Object.keys(state.IsPlayList)[0] : key
          ],
      },
    })),
}));

export const useRepeatAndCurrentPlayList = create<
  currentSongPlaylist &
    currentSongPlaylistAction &
    IsRepeatState &
    RepeatAction &
    PrefetchAction &
    resetAction
>()((set, get) => ({
  playListArray: {},
  setPlayListArray: (newList) =>
    set(() => {
      return { playListArray: { ...newList } };
    }),
  isRepeat: false,
  setRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  // if it check as isRepeat in function component, it will re-render entrire component
  prefetchSegment: async ({
    currentUrl,
    abortController,
    prefetchedUrl,
    prefetchPromiseRef,
  }: PrefetchParams) => {
    // later need to change another abort
    const fetchOptions: RequestInit = {
      signal: abortController!.current!.signal,
    };
    const playlistArray = Object.values(
      get().playListArray
    )[0] as getSongsReturn;
    const currentIndex = playlistArray.songs.findIndex(
      (song) => song.url === currentUrl
    );
    const extract = Math.min(currentIndex + 1, playlistArray.songs.length - 1);
    const url = playlistArray.songs[extract].url;
    // Early return if repeat is enabled
    if (get().isRepeat) return null;
    // if (url !== currentUrl) {
    const initUrl = url;
    const seg1Url = url.replace("init.mp4", "seg-1.m4s");

    try {
      // if prefetch promise is not null , means they are waiting some promise, if then return this promise to receive the data
      if (!prefetchPromiseRef.current) {
        // immediate update url to inform there is a prefetch call
        prefetchedUrl.current = url;
        prefetchPromiseRef.current = Promise.all([
          fetch(initUrl).then((res) => res.arrayBuffer()),
          fetch(seg1Url).then((res) => res.arrayBuffer()),
        ]);
      }
      return prefetchPromiseRef.current;
    } catch (err: any) {
      if (err.name === "AbortError") {
        return null;
      } else {
        return null;
      }
    }
  },
  reset: () => {
    set(() => ({
      playListArray: {},
      isRepeat: false,
    }));
  },
}));

export const useAudioValue = create<AudioValueState & AudioValueActions>(
  (set) => ({
    value: 100,
    setValue: (newValue: number) =>
      set(() => ({
        value: newValue,
      })),
  })
);

// no need to select with object key
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

export const useIsChildOpenCloseFunction = create<
  isChildOpen & isChildOpenAction
>((set) => ({
  isChildOpen: {},
  setIsChildOpen: (value) => set(() => ({ isChildOpen: { ...value } })),
}));

export const useNotInputFocus = create<focusState & focusStateAction>(
  (set) => ({
    isInputFocus: false,
    setIsInputFocus: (value: boolean) => set(() => ({ isInputFocus: value })),
  })
);

export const usePlaylistFolder = create<
  playlistFolderProps & setPlaylistFolderAction & addPlaylistFolderAction
>((set) => ({
  playlistFolder: undefined,
  setPlaylistFolder: (value: playlistFolderProps["playlistFolder"]) =>
    set((state) => {
      // If there's no existing state yet, just set the new value
      if (!state.playlistFolder) {
        return { playlistFolder: value };
      }
      return { playlistFolder: state.playlistFolder };
    }),
  addPlaylistFolder: (value) =>
    set((state) => ({
      playlistFolder: {
        data: [...(state.playlistFolder?.data || []), ...value.data],
        error: value.error,
      },
    })),
}));

export const useShowAddBox = create<isBoxOpen & setIsBoxOpen>((set) => ({
  isBoxOpen: false,
  setIsBoxOpen: (value: boolean) =>
    set(() => ({
      isBoxOpen: value,
    })),
}));

export const useSongsStoreData = create<addSongProps & addSongAction>(
  (set) => ({
    addSong: {},
    addSongAction: (value) =>
      set(() => ({
        addSong: { ...value },
      })),
  })
);

import { StoreApi, UseBoundStore } from "zustand";
type PairState = {
  like: boolean | undefined;
  setLike: (v: boolean) => void;
};
type PairStore = UseBoundStore<StoreApi<PairState>>;

// Internal registry
const storeMap = new Map<string, { store: PairStore; count: number }>();

export function getPairStore(pairId: string): PairStore {
  const existing = storeMap.get(pairId);
  if (existing) {
    existing.count += 1;
    return existing.store;
  }

  const store = create<PairState>((set) => ({
    like: undefined,
    setLike: (v) => set({ like: v }),
  }));

  storeMap.set(pairId, { store, count: 1 });
  return store;
}

// Call this when a component unmounts
export function releasePairStore(pairId: string) {
  const entry = storeMap.get(pairId);
  if (!entry) return;
  entry.count -= 1;

  if (entry.count <= 0) {
    storeMap.delete(pairId);
  }
}
