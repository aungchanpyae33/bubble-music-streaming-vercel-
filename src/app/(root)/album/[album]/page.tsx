import { getAlbumSongs } from "@/database/data";
import AlbumUpperBackground from "@/ui/albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerAddToLibrary from "@/ui/general/ListContainerOption/ListContainerAddToLibrary";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import SongListContainerOption from "@/ui/general/optionBox/SongListContainerOption";
import ContextSongListContainer from "@/ui/playlist/playlistOption/ContextSongListContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import { Suspense } from "react";
// import Track from "@/ui/trackComponent/Track";

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
  const { data, error } = await getAlbumSongs(params.album);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <Suspense fallback={<p>nice</p>}>
          <AlbumUpperContainer songs={songs} />
        </Suspense>
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

      <AudiosContainer description="album" listSong={songs} />
    </div>
  );
}

export default page;
