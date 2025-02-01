import { createWithEqualityFn as create } from "zustand/traditional";
export interface SongDetail {
  url: string;
  sege: number;
  duration: number;
  name: string;
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

export interface SongFunctionState {
  Isplay: Record<string, boolean | undefined>;
}
export interface SongFunctionActions {
  setPlay: (key: string, play: boolean | undefined) => void;
}

export const useSong = create<SongState & SongActions>((set) => ({
  songCu: {},
  updateSongCu: (newSong) =>
    set(() => ({
      songCu: { ...newSong },
    })),
}));

export const useCurrentPlayList = create<
  currentSongPlaylist & currentSongPlaylistAction
>((set) => ({
  playListArray: [
    {
      url: "https://s3.tebi.io/test1345/hello/init.mp4",
      sege: 27,
      name: "gone",
      duration: 52.199,
    },
  ],
  setPlayListArray: (newList: SongDetail[]) =>
    set(() => ({
      playListArray: newList,
    })),
}));

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
