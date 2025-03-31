import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DirectPlayButton from "./DirectPlayButton";

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
      className={clsx("peer space-y-3 w-[165px] md:w-[175px] lg:w-[185px]  ")}
    >
      <Link
        href={"album/supanova"}
        prefetch={false}
        className="flex relative w-full imageContainer rounded-sm  before:block before:pb-[100%] group"
      >
        <Image
          src="https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
          width={300}
          height={300}
          alt="this is image element"
          priority={true}
          className="w-full h-full rounded-md"
        />
        <DirectPlayButton playListId={testId} />
        <span className=" group-hover:backdrop-brightness-75 absolute inset-0  "></span>
      </Link>
      <div className=" w-full">
        <Link
          href={"album/supanova"}
          prefetch={false}
          className=" leading-relaxed w-full truncate text-start  "
        >
          let&apos;s go song {index}
        </Link>
        <span className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400">
          aspea,baby monster,bts,newjeans
        </span>
      </div>
    </div>
  );
}

export default PlaylistContainer;
