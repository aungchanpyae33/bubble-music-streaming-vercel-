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
  // extra div to prevent trigger link click from button click
  return (
    <div className="containerPlaylist group hover:bg-overlay pointer-events-none relative">
      <Link
        href={"album/supanova"}
        // tabIndex={0}
        role={`cell${index + 1}`}
        prefetch={false}
        className={clsx("pointer-events-auto block p-3 md:p-4 lg:p-5")}
      >
        <div className="flex  imageContainer  rounded-md w-[145px] md:w-[155px] lg:w-[175px] before:block before:pb-[100%]">
          <Image
            src="https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
            width={300}
            height={300}
            alt="this is image element"
            priority={true}
            className="w-full h-full rounded-md"
          />
        </div>
        <p>{description}</p>
      </Link>
      <div className=" pointer-events-none">
        {" "}
        <DirectPlayButton playListId={testId} />
      </div>
    </div>
  );
}

export default PlaylistContainer;
