import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface prop {
  songs: string[];
  description: string;
  index: number;
}

function PlaylistContainer({ songs, description, index }: prop) {
  return (
    <Link
      href={"album/supanova"}
      // tabIndex={0}
      role={`cell${index + 1}`}
      prefetch={false}
      className={clsx(
        "containerPlaylist p-3 md:p-4 lg:p-5 hover:bg-green-600 hover:shadow-lg rounded-md bg-green-500 shadow-md"
      )}
    >
      <div className="flex imageContainer rounded-md w-[145px] md:w-[155px] lg:w-[175px] before:block before:pb-[100%]">
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
  );
}

export default PlaylistContainer;
