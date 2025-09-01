import { Artist, listSongsSection, SongInfo } from "@/database/data";
import { RefObject } from "react";
import { createWithEqualityFn as create } from "zustand/traditional";
import { persist } from "zustand/middleware";

export interface SongDetail {
  url: string;
  sege: number;
  duration: number;
  song_time_stamp: Array<number>;
  name: string;
  id: string;
  song_id: string;
  is_lyric: boolean;
  is_liked: boolean;
  artists: Artist[];
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
  id: string;
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

export interface ShouldFetchSongsListId {
  FetchSongsListId: string | undefined;
}
export interface ShouldFetchSongsListIdAction {
  FetchSongsListIdAction: (
    id: ShouldFetchSongsListId["FetchSongsListId"]
  ) => void;
}
export interface currentSongPlaylist {
  playListArray: listSongsSection | {};
}

export interface currentSongPlaylistAction {
  setPlayListArray: (newList: currentSongPlaylist["playListArray"]) => void;
}

export interface currentSongPlaylisthuffleAction {
  shufflePlayListArray: (nweList: currentSongPlaylist["playListArray"]) => void;
}
export interface currentAddToQueueAction {
  currentAddToQueue: (song: Record<string, SongInfo>, id: string[]) => void;
}

export interface currentAddToNextAction {
  currentAddToNext: (
    song: Record<string, SongInfo>,
    id: string[],
    curId: string
  ) => void;
}
export interface removeFromQueueAction {
  removeFromQueue: (id: string) => void;
}
export interface previousSongPlaylist {
  previousPlayListArray: listSongsSection | {};
}

export interface resetAction {
  reset: () => void;
}
export interface previousSongPlaylistAction {
  setPreviousPlayListArray: (
    newList: previousSongPlaylist["previousPlayListArray"]
  ) => void;
}

export interface Playlist {
  id: string;
  name: string;
}

export interface playlistFolderProps {
  playlistFolder: Playlist[] | null;
}

export interface setPlaylistFolderAction {
  setPlaylistFolder: (data: Playlist[]) => void;
}

export interface addPlaylistFolderAction {
  addPlaylistFolder: (value: Playlist) => void;
}

export interface addSongProps {
  addSong: {};
}
export interface addSongAction {
  addSongAction: (value: addSongProps["addSong"]) => void;
}

export interface toggleLikeProps {
  toggleLike: {};
}
export interface toggleLikeAction {
  toggleLikeAction: (value: toggleLikeProps["toggleLike"]) => void;
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
    set(() => {
      return { previousPlayListArray: { ...newList } };
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

export const useShouldFetchSongsList = create<
  ShouldFetchSongsListId & ShouldFetchSongsListIdAction
>()((set) => ({
  FetchSongsListId: undefined,
  FetchSongsListIdAction: (id) =>
    set(() => ({
      FetchSongsListId: id,
    })),
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
    currentSongPlaylisthuffleAction &
    currentAddToQueueAction &
    currentAddToNextAction &
    removeFromQueueAction &
    IsRepeatState &
    RepeatAction &
    PrefetchAction &
    resetAction
>()((set, get) => ({
  playListArray: {},
  setPlayListArray: (newList) =>
    set((state) => {
      if (Object.keys(newList)[0] !== Object.keys(state.playListArray)[0]) {
        return { playListArray: { ...newList } };
      } else {
        return state.playListArray;
      }
    }),
  shufflePlayListArray: (newList) =>
    set(() => {
      return { playListArray: { ...newList } };
    }),
  currentAddToQueue: (song, id) =>
    set((state) => {
      const playListArray = (Object.values(state.playListArray)[0] ||
        undefined) as listSongsSection;
      const playListArrayKey = Object.keys(state.playListArray)[0] as string;

      if (playListArray && "songs" in playListArray) {
        playListArray.songs = { ...playListArray.songs, ...song };

        return {
          playListArray: {
            [playListArrayKey || ""]: {
              ...playListArray,
              idArray: [...playListArray.idArray, ...id],
            },
          },
        };
      } else {
        return state;
      }
    }),
  currentAddToNext: (song, id, curId) =>
    set((state) => {
      const playListArray = (Object.values(state.playListArray)[0] ||
        undefined) as listSongsSection;
      const playListArrayKey = Object.keys(state.playListArray)[0] as string;

      if (playListArray && "songs" in playListArray) {
        playListArray.songs = { ...playListArray.songs, ...song };
        const currentIndex = outputCurrentIndex(playListArray.idArray, curId);
        if (currentIndex === -1) return state;
        const newSongs = [...playListArray.idArray];
        newSongs.splice(currentIndex + 1, 0, ...id);
        return {
          playListArray: {
            [playListArrayKey || ""]: {
              ...playListArray,
              idArray: newSongs,
            },
          },
        };
      } else {
        return state;
      }
    }),

  removeFromQueue: (id) =>
    set((state) => {
      const playListArray = (Object.values(state.playListArray)[0] ||
        undefined) as listSongsSection;
      const playListArrayKey = Object.keys(state.playListArray)[0] as string;

      if (playListArray && "songs" in playListArray) {
        delete playListArray.songs[id];
        const currentIndex = outputCurrentIndex(playListArray.idArray, id);

        if (currentIndex === -1) return state;
        const newSongs = [...playListArray.idArray];
        newSongs.splice(currentIndex, 1);
        return {
          playListArray: {
            [playListArrayKey || ""]: {
              ...playListArray,
              idArray: newSongs,
            },
          },
        };
      } else {
        return state;
      }
    }),
  isRepeat: false,
  setRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  // if it check as isRepeat in function component, it will re-render entrire component
  prefetchSegment: async ({
    id,
    abortController,
    prefetchedUrl,
    prefetchPromiseRef,
  }: PrefetchParams) => {
    if (get().isRepeat) return null;
    // later need to change another abort
    const fetchOptions: RequestInit = {
      signal: abortController!.current!.signal,
    };

    const playlistArray = Object.values(
      get().playListArray
    )[0] as listSongsSection;
    const currentIndex = outputCurrentIndex(playlistArray.idArray, id);

    const extract = Math.min(
      currentIndex + 1,
      playlistArray.idArray.length - 1
    );
    const { id: id_scope, url } =
      playlistArray.songs[playlistArray.idArray[extract]];

    if (currentIndex >= playlistArray.idArray.length - 1 && id === id_scope) {
      return prefetchPromiseRef.current;
    }
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

export const useVolumeValue = create<VolumeValueState & VolumeValueActions>()(
  persist(
    (set) => ({
      value: 0,
      setValue: (newValue: number) =>
        set(() => ({
          value: newValue,
        })),
    }),
    {
      name: "volume-storage", // key in localStorage
    }
  )
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
  playlistFolder: null,
  setPlaylistFolder: (value) =>
    set((state) => {
      // If there's no existing state yet, just set the new value
      if (!state.playlistFolder) {
        return { playlistFolder: value };
      }
      return { playlistFolder: state.playlistFolder };
    }),
  addPlaylistFolder: (value) =>
    set((state) => ({
      playlistFolder: [...(state.playlistFolder || []), value],
    })),
}));

// only for trigger
export const useSongsStoreData = create<addSongProps & addSongAction>(
  (set) => ({
    addSong: {},
    addSongAction: (value) =>
      set(() => {
        return {
          addSong: { ...value },
        };
      }),
  })
);

import outputCurrentIndex from "./CustomHooks/OutputCurrentIndex";

export interface songExist {
  playlistId: string;
  songId: string;
}
export interface isSongExist {
  isSongExist: songExist | {};
}
export interface songExistAction {
  setIsSongExist: (songExist: songExist | {}) => void;
}
export const useIsExistSongs = create<isSongExist & songExistAction>((set) => ({
  isSongExist: {},
  setIsSongExist: (value) =>
    set(() => ({
      isSongExist: value,
    })),
}));

export interface addSongsToPlaylistProps {
  songId: string;
}
export interface songsToPlaylist {
  songsToPlaylist: addSongsToPlaylistProps | {};
}
export interface addSongsToPlaylist {
  addSongsToPlaylist: (value: addSongsToPlaylistProps | {}) => void;
}
export const useAddSongsToPlaylist = create<
  songsToPlaylist & addSongsToPlaylist
>((set) => ({
  songsToPlaylist: {},
  addSongsToPlaylist: (value) =>
    set(() => ({
      songsToPlaylist: value,
    })),
}));

export interface editToPlaylistProps {
  id: string;
  name: string;
}
export interface editToPlaylist {
  editToPlaylist: editToPlaylistProps | {};
}
export interface editToPlaylistAction {
  editToPlaylistAction: (value: editToPlaylistProps | {}) => void;
}
export const useEditToPlaylist = create<editToPlaylist & editToPlaylistAction>(
  (set) => ({
    editToPlaylist: {},
    editToPlaylistAction: (value) =>
      set(() => ({
        editToPlaylist: value,
      })),
  })
);

export interface lyricShowState {
  lyricShow: boolean;
}
export interface lyricShowAction {
  setLyricShow: (value?: boolean) => void;
}

export const useLyric = create<lyricShowState & lyricShowAction>((set) => ({
  lyricShow: false,
  setLyricShow: (value?) =>
    set((state) => {
      if (value !== undefined) {
        return { lyricShow: value };
      }
      return { lyricShow: !state.lyricShow };
    }),
}));

export interface SongTrackState {
  songTrack:
    | {
        count: number;
        songsId: string[];
      }
    | undefined;
}
export interface SetSongTrackAction {
  setSongTrack: (songId: string) => void;
}
export const useSongTrack = create<SongTrackState & SetSongTrackAction>()(
  persist(
    (set) => ({
      songTrack: undefined,
      setSongTrack: (songId) =>
        set((state) => {
          if (!songId) return state;

          if (!state.songTrack) {
            return {
              songTrack: {
                count: 0,
                songsId: [songId],
              },
            };
          }

          if (state.songTrack.count >= 10) {
            return {
              songTrack: {
                count: 1,
                songsId: [songId],
              },
            };
          }
          if (songId === "increment") {
            return {
              songTrack: {
                count: ++state.songTrack.count,
                songsId: state.songTrack.songsId,
              },
            };
          }
          if (state.songTrack.songsId.includes(songId)) {
            return {
              songTrack: {
                count: ++state.songTrack.count,
                songsId: state.songTrack.songsId,
              },
            };
          }
          return {
            songTrack: {
              count: state.songTrack.count + 1,
              songsId: [...state.songTrack.songsId, songId],
            },
          };
        }),
    }),
    {
      name: "track-song-storage",
    }
  )
);

export interface listTrackState {
  listTrack:
    | {
        type: "playlist" | "album" | "artist";
        id: string;
      }
    | undefined;
}
export interface SetListTrackAction {
  setListTrack: (type: "playlist" | "album" | "artist", id: string) => void;
}
export const useListTrack = create<listTrackState & SetListTrackAction>(
  (set) => ({
    listTrack: undefined,
    setListTrack: (type, id) =>
      set((state) => {
        if (!id) return state;
        return {
          listTrack: {
            type,
            id,
          },
        };
      }),
  })
);

export interface likeActionState {
  likeAction: Record<string, boolean>;
}
export interface setLikeAction {
  setLikeAction: (value: likeActionState["likeAction"]) => void;
}
export const useLikeActionStore = create<likeActionState & setLikeAction>(
  (set) => ({
    likeAction: {},
    setLikeAction: (value) =>
      set(() => ({
        likeAction: value,
      })),
  })
);
