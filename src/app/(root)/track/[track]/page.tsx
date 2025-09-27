import { getSongTrack } from "@/database/data";
import AlbumUpperBackground from "@/ui/albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import ContextInfoTrack from "@/ui/trackComponent/ContextInfoTrack";
import ContextLike from "@/ui/trackComponent/ContextLike";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import TrackItemContainer from "@/ui/trackComponent/TrackItemContainer";
import TrackToggleLike from "@/ui/trackComponent/TrackToggleLike";

// import PlaceHolderTrackInstantPlay from "@/ui/Footer/PlaceHolderTrackInstantPlay";
import { Suspense } from "react";

async function page(props: { params: Promise<{ track: string }> }) {
  const { track } = await props.params;
  const { data, error } = await getSongTrack(track);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  const songsInfo = songs?.songs[track];

  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <Suspense fallback={<p>nice</p>}>
          <AlbumUpperContainer songs={songs} />
        </Suspense>
      </AlbumUpperBackground>

      <ContextInfoTrack id={songsInfo?.id} source={undefined} song={songsInfo}>
        <ContextLike id={songsInfo!.song_id}>
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <TrackToggleLike songId={songsInfo!.song_id} />
            <div>
              <MoreOptionContext>
                <MoreOption targetElement={<TrackItemContainer />} />
              </MoreOptionContext>
            </div>
          </ListContainer>
        </ContextLike>
      </ContextInfoTrack>

      <AudiosContainer description="Song" listSong={songs} />
    </div>
  );
}

export default page;
