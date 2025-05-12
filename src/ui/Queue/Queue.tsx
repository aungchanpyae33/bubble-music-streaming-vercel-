"use client";
import {
  currentSongPlaylist,
  queueState,
  useOnlyOneSider,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import { getPlaylistSongsReturn } from "@/database/data";
import Image from "next/image";
import PlaylistInfoContext from "../trackComponent/PlaylistInfoContext";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";

function Queue() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getPlaylistSongsReturn;
  // console.log(playListArray);
  return (
    <div
      className={clsx(
        "h-full  w-[20%] md:w-[25%] min-w-[250px] flex flex-col border border-neutral-200 border-opacity-15 border-y-0    max-w-[375px] overflow-y-auto"
      )}
    >
      {playListArray &&
        playListArray.playlist_id &&
        playListArray.songs.map((song, index) => (
          <div
            key={index}
            className="flex hover:bg-[#333333] items-stretch
          "
          >
            <ToggleElement
              url={song.url}
              name={song.name}
              duration={song.duration}
              sege={song.sege}
              playlistSong={playListArray}
              song_time_stamp={song.song_time_stamp}
              className="w-[50px] "
            />
            <div
              className="flex-1 overflow-hidden
              flex items-center"
            >
              <Image
                src={
                  "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
                }
                width={50}
                height={50}
                alt="test image"
                priority={true}
              />
              <div
                className=" flex-1 truncate
              "
              >
                {song.name}
              </div>
              <div className="w-[30px]">
                <PlaylistInfoContext
                  songId={song.id}
                  playlistId={playListArray.playlist_id}
                  isLike={song.is_liked}
                  is_owner={playListArray.is_owner}
                >
                  <MoreOptionContext>
                    <MoreOption />
                  </MoreOptionContext>
                </PlaylistInfoContext>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Queue;
