import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import AlbumUpperBackground from "../albumContainer/AlbumUpperBackground";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import { listSongsSection } from "@/database/data";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import EditableAudiosContainer from "../albumContainer/EditableAudiosContainer";
import PlaylistUpperWrapper from "./PlaylistUpperWrapper";

function OwnEdit({
  queryClient,
  songs,
  id,
  description,
}: {
  queryClient: QueryClient;
  songs: listSongsSection;
  id: string;
  description: string;
}) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" w-full">
        <ContextSongListContainer id={songs.id} list={songs}>
          <AlbumUpperBackground>
            <PlaylistUpperWrapper />
          </AlbumUpperBackground>

          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <ListContainerAddToLibrary />

            <div>
              <MoreOptionContext
                relative={{ id: songs.related_id, name: songs.related_name }}
              >
                <MoreOption targetElement={<SongListContainerOption />} />
              </MoreOptionContext>
            </div>
          </ListContainer>

          <EditableAudiosContainer playlistId={id} description={description} />
        </ContextSongListContainer>
      </div>
    </HydrationBoundary>
  );
}

export default OwnEdit;
