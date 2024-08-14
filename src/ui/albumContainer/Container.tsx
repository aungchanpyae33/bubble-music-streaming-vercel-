"use client";
import React, { useRef, useState } from "react";
import PlaylistContainer from "../playlist/PlaylistContainer";
import ArrowNavi from "@/lib/Assibility/ArrowNavi";

function Container({
  songs,
  description,
}: {
  songs: string[];
  description: string;
}) {
  const numRefs = 7;
  const dataInc = useRef(-1);
  const refs = useRef<React.RefObject<HTMLAnchorElement>[]>(
    Array.from({ length: numRefs }, () => React.createRef())
  );

  return (
    <div
      className="playlist border-2 overflow-auto  max-w-full"
      tabIndex={0}
      onKeyDown={(e) => {
        ArrowNavi(e, dataInc, refs);
      }}
    >
      <h1
        aria-label="song playlist name is playlist"
        className="pl-4 sticky left-0"
      >
        {description}
      </h1>

      <div className="playlist w-fit gap-2   flex p-4">
        {[...Array(7)].map((_, index) => (
          <PlaylistContainer
            key={index}
            inputRef={refs.current[index]}
            songs={songs}
            description={index + description}
          />
        ))}
      </div>
    </div>
  );
}

export default Container;
