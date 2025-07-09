"use client";
import { useContext } from "react";

import Track from "../trackComponent/Track";

import { SongsDataContext } from "./ContextSongsData";

function SongContainer() {
  const { songsData } = useContext(SongsDataContext);

  return (
    <tbody className=" ">
      {songsData &&
        songsData.songs.map((item, index) => (
          //need to test playlist url when click track of toggleElement
          <Track
            key={songsData.might_repeat ? item.uni_id : item.id}
            playlistSong={songsData}
            name={item.name}
            duration={item.duration}
            index={index}
            like={item.is_liked}
            songId={item.id}
            song_time_stamp={item.song_time_stamp}
            artists={item.artists}
            albumName={item.album.name}
            albumId={item.album.id}
            uni_id={item.uni_id}
            //for accessbility
            // roleCell={rowCell}
            // dataInc={dataInc}
            sege={item.sege}
            url={item.url}
          />
        ))}
    </tbody>
  );
}

export default SongContainer;
