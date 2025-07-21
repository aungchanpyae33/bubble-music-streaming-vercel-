import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import DirectPlayButton from "./DirectPlayButton";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import { getProps } from "@/database/data";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";

interface SonglistsContainerProps extends getProps {
  description: string;
  index: number;
}

function SonglistsContainer({
  description,
  index,
  id,
  name,
  type,
  source,
  related_id,
  related_name,
}: SonglistsContainerProps) {
  return (
    <div
      role={`cell${index + 1}`}
      className={clsx(
        "peer snap-center space-y-3 w-[165px] isolate md:w-[175px] lg:w-[185px] shrink-0 grow-0 "
      )}
    >
      <Link
        href={`${type}/${id}`}
        prefetch={false}
        className="flex relative w-full imageContainer  rounded overflow-hidden    before:block before:pb-[100%] group "
      >
        <Image
          src="https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
          fill
          alt="this is image element"
          sizes="(min-width: 1024px) 185px, (min-width: 768px) 175px , 160px"
          priority={true}
          className=" group-hover:brightness-75 "
        />

        <ContextSongListContainer
          id={id}
          source={source}
          type={type}
          name={name}
        >
          <MoreOptionContext>
            <MoreOption targetElement={<SongListContainerOption />} />
          </MoreOptionContext>
        </ContextSongListContainer>

        <DirectPlayButton playListId={id} />
      </Link>
      <div className=" w-full">
        <UnderLineLinkHover
          href={"album/supanova"}
          prefetch={false}
          className=" block leading-relaxed w-full truncate text-start  "
        >
          {name}
        </UnderLineLinkHover>
        <span className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400">
          aspea,baby monster,bts,newjeans
        </span>
      </div>
    </div>
  );
}

export default SonglistsContainer;
