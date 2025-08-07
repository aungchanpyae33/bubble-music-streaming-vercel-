import { getSongTrack } from "@/database/data";
import AlbumUpperBackground from "@/ui/albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import PlaceHolderTrackInstantPlay from "@/ui/Footer/PlaceHolderTrackInstantPlay";
import { Suspense } from "react";

async function page(props: { params: Promise<{ track: string }> }) {
  // 02357c3e-d80b-49d4-b1bf-c8b35a6dd927
  const params = await props.params;
  const { data, error } = await getSongTrack(
    "02357c3e-d80b-49d4-b1bf-c8b35a6dd927"
  );
  console.log(error, data);
  if (!data || error || data.length === 0) return;
  const returnData = data[0];
  return (
    <AlbumUpperBackground>
      <Suspense fallback={<p>nice</p>}>
        <AlbumUpperContainer description={returnData.name} />
      </Suspense>
      <PlaceHolderTrackInstantPlay
        listSong={returnData}
        song={returnData.songs[0]}
      />
    </AlbumUpperBackground>
  );
}

export default page;
