import { listInfo } from "@/database/data";
import { outputRelatedType } from "@/lib/prototypeOuputRelatedType";
import OfficialBadgeName from "@/ui/albumContainer/OfficialBadgeName";
import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";

function InfoList({
  list,
  is_official,
}: {
  list: listInfo;
  is_official?: boolean;
}) {
  const relatedType = outputRelatedType(list.type);

  if (!relatedType) return null;
  return (
    <>
      &bull;
      {is_official && <OfficialBadgeName />}
      <UnderLineLinkHover
        href={`/${relatedType}/${list.related_id}`}
        prefetch={false}
        className=" ml-1 text-lg font-black  leading-relaxed w-full truncate text-start  "
      >
        {list.related_name}
      </UnderLineLinkHover>
    </>
  );
}

export default InfoList;
