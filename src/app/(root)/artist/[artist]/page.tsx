import { getArtistPage } from "@/database/data";
import AlbumUpperBackground from "@/ui/albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
import Container from "@/ui/albumContainer/Container";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerAddToLibrary from "@/ui/general/ListContainerOption/ListContainerAddToLibrary";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import SongListContainerOption from "@/ui/general/optionBox/SongListContainerOption";
import ContextSongListContainer from "@/ui/playlist/playlistOption/ContextSongListContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import { Suspense } from "react";
async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;

  const { data, error } = await getArtistPage(params.artist);

  if (!data || error) return;
  const { songs, albums } = data;
  if (!songs && !albums) return;
  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <Suspense fallback={<p>nice</p>}>
          <AlbumUpperContainer description={"jello"} />
        </Suspense>
      </AlbumUpperBackground>
      {songs && (
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
      )}
      <div className=" space-y-3">
        {songs && <AudiosContainer description="top songs" listSong={songs} />}
        {albums && <Container songs={albums} description="album" />}
      </div>
    </div>
  );
}

export default page;
