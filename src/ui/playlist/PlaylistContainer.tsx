import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DirectPlayButton from "./DirectPlayButton";
import UnderLineLinkHover from "../general/UnderLineLinkHover";

interface prop {
  songs: string[];
  description: string;
  index: number;
  testId: string;
}

function PlaylistContainer({ songs, description, index, testId }: prop) {
  return (
    <div
      role={`cell${index + 1}`}
      className={clsx(
        "peer space-y-3 w-[165px] isolate md:w-[175px] lg:w-[185px] shrink-0 grow-0 "
      )}
    >
      <Link
        href={`album/one${index}`}
        prefetch={false}
        className="flex relative w-full imageContainer rounded-[4.5px] overflow-hidden    before:block before:pb-[100%] group"
      >
        <Image
          src="https://s3.tebi.io/test1345/20250412_1240_Smiling%20Girl%20with%20Headphones_simple_compose_01jrm9wdxjegbtgsevnsbfjd63%20%286%29%20%282%29.png"
          fill
          alt="this is image element"
          priority={true}
          className=""
        />
        <DirectPlayButton playListId={testId} index={index} />
        <span className=" group-hover:backdrop-brightness-75 absolute inset-0  "></span>
      </Link>
      <div className=" w-full">
        <UnderLineLinkHover
          href={"album/supanova"}
          prefetch={false}
          className=" block leading-relaxed w-full truncate text-start  "
        >
          let&apos;s go song {index}
        </UnderLineLinkHover>
        <span className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400">
          aspea,baby monster,bts,newjeans
        </span>
      </div>
    </div>
  );
}

export default PlaylistContainer;
