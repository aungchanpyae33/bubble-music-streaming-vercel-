import { createWithEqualityFn as create } from "zustand/traditional";
import { urlProp } from "@/ui/albumContainer/Album";
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

export const useCurrentPlayList = create((set) => ({
  playListArray: [],
  setPlayListArray: (newList: urlProp[]) =>
    set(() => ({
      playListArray: [...newList],
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
