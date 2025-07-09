import AddSongContent from "@/ui/trackComponent/AddSongContent";
import SubOpenContentWrapper from "@/ui/trackComponent/SubOpenContentWrapper";
import SubOptionToggle from "@/ui/trackComponent/SubOptionToggle";

function AddSongsToPlaylistBox() {
  return (
    <SubOpenContentWrapper>
      <SubOptionToggle>
        <AddSongContent />
      </SubOptionToggle>
    </SubOpenContentWrapper>
  );
}

export default AddSongsToPlaylistBox;
