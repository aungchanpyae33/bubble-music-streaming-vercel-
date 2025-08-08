import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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
import EditableAudiosContainer from "../albumContainer/EditableAudiosContainer";

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
        <AlbumUpperBackground>
          <AlbumUpperContainer songs={songs} />
        </AlbumUpperBackground>
        <ContextSongListContainer
          id={songs.id}
          name={songs.name}
          type={songs.type}
          source={songs.source}
          isPage={true}
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

        <EditableAudiosContainer playlistId={id} description={description} />
      </div>
    </HydrationBoundary>
  );
}

export default OwnEdit;
