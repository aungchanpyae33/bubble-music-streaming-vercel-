import AlbumUpperBackground from "../albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "../albumContainer/AlbumUpperContainer";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import { listSongsSection } from "@/database/data";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import AudiosContainer from "../albumContainer/AudiosContainer";
function View({ songs }: { songs: listSongsSection }) {
  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <AlbumUpperContainer songs={songs} />
      </AlbumUpperBackground>
      <ContextSongListContainer
        id={songs.id}
        name={songs.name}
        type={songs.type}
      >
        <ListContainer>
          <ListContainerPlayBack list={songs} />
          <ListContainerAddToLibrary />

          <div>
            <MoreOptionContext>
              <MoreOption targetElement={<SongListContainerOption />} />
            </MoreOptionContext>
          </div>
        </ListContainer>
      </ContextSongListContainer>

      <AudiosContainer description="album" listSong={songs} />
    </div>
  );
}

export default View;
