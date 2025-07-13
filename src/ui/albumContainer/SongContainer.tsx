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
            index={index}
            song={item}
            //for accessbility
            // roleCell={rowCell}
            // dataInc={dataInc}
          />
        ))}
    </tbody>
  );
}

export default SongContainer;
