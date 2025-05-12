"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DirectPlayButton from "./DirectPlayButton";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";

interface prop {
  songs: string;
  description: string;
  index: number;
  testId: string;
}

function PlaylistContainer({ songs, description, index, testId }: prop) {
  return (
    <div
      role={`cell${index + 1}`}
      className={clsx(
        "peer snap-center space-y-3 w-[165px] isolate md:w-[175px] lg:w-[185px] shrink-0 grow-0 "
      )}
    >
      <Link
        href={`album/${testId}`}
        prefetch={false}
        className="flex relative w-full imageContainer rounded-[4.5px] overflow-hidden    before:block before:pb-[100%] group hover:brightness-75"
      >
        <Image
          src="https://s3.tebi.io/test1345/20250412_1240_Smiling%20Girl%20with%20Headphones_simple_compose_01jrm9wdxjegbtgsevnsbfjd63%20%286%29%20%282%29.png"
          fill
          alt="this is image element"
          priority={true}
          className=""
        />
        <span
          className=" absolute top-2 right-2 has-hover:opacity-0 has-hover:group-hover:opacity-100 has-hover:transition-opacity has-hover:duration-150"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MoreOptionContext>
            <MoreOption />
          </MoreOptionContext>
        </span>
        <DirectPlayButton playListId={testId} index={index} />
      </Link>
      <div className=" w-full">
        <UnderLineLinkHover
          href={"album/supanova"}
          prefetch={false}
          className=" block leading-relaxed w-full truncate text-start  "
        >
          {songs}
        </UnderLineLinkHover>
        <span className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400">
          aspea,baby monster,bts,newjeans
        </span>
      </div>
    </div>
  );
}

export default PlaylistContainer;
