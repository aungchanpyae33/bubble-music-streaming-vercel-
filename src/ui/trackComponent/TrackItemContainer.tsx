import AddSongButton from "./AddSongButton";
import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";

function TrackItemContainer() {
  return (
    <>
      <AddSongButton />
      <h1 className=" h-10 flex items-center">add to the queeue</h1>
      <RemoveSongButton />
      <ToggleHeartContent />
      <h1 className="h-10 flex items-center">go to the artist</h1>
      <h1 className="h-10 flex items-center">go to the album</h1>
      <h1 className="h-10 flex items-center">share</h1>
    </>
  );
}

export default TrackItemContainer;
