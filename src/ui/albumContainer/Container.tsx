import { getDataProps, listInfo } from "@/database/data";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
function Container({
  songs,
  description,
}: {
  songs: getDataProps[keyof getDataProps];
  description: string;
}) {
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <h3>{description}</h3>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {songs &&
            songs.idArray.map((id, index) => {
              const item = songs[`${id}`] as listInfo;
              return (
                <SonglistsContainer
                  index={index}
                  key={item.id}
                  list={item}
                  description={description}
                />
              );
            })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default Container;
