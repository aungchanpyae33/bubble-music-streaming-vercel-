import { getTranslations } from "next-intl/server";
import TableHead from "../TableHeadGrid/TableHead";
import TableHeadItems from "../TableHeadGrid/TableHeadItems";
import ContextTableHeadBgChange from "@/Context/ContextTableHeadBgChange";
import ConRenderSong from "./ConRenderSong";
import ListGeneralHeader from "../general/ListInfoGeneral/ListGeneralHeader";
import SongContainer from "./SongContainer";
import EmptyGeneral from "../general/NoExist/EmptyGeneral";
async function EditablePageTrackItemContainer({
  description,
}: {
  description: string;
}) {
  const [b, l] = await Promise.all([
    getTranslations("block"),
    getTranslations("ListTitle"),
  ]);
  return (
    <ConRenderSong
      container={
        <div className=" w-full">
          <ListGeneralHeader>{l(description)}</ListGeneralHeader>
          <ContextTableHeadBgChange>
            <TableHead>
              <TableHeadItems b={b} />
            </TableHead>
            <SongContainer />
          </ContextTableHeadBgChange>
        </div>
      }
      empty={<EmptyGeneral />}
    />
  );
}

export default EditablePageTrackItemContainer;
