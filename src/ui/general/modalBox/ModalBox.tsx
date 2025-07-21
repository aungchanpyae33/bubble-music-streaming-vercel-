import AddSongsToPlaylistBox from "./AddSongsToPlaylistBox";
import ConfirmAddSongBox from "./ConfirmAddSongBox";
import EditPlaylistBox from "./EditPlaylistBox";

function ModalBox() {
  return (
    <>
      <ConfirmAddSongBox />
      <AddSongsToPlaylistBox />
      <EditPlaylistBox />
    </>
  );
}

export default ModalBox;
