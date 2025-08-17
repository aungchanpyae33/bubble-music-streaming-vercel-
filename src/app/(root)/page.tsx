import { get } from "@/database/data";
import Container from "@/ui/albumContainer/Container";
import ListItemContainer from "@/ui/general/ListItemContainer/ListItemContainer";
import ListItemScrollHz from "@/ui/general/ListItemContainer/ListItemScrollHz";
import TapNavi from "@/ui/Home/TapNavi";

async function page() {
  const { data, error } = await get();
  console.log(data, error);
  if (!data || error) return null;
  return (
    <div className="space-y-3">
      <TapNavi />
      {(Object.keys(data) as string[]).map((itemKey) => {
        console.log(itemKey);
        if (data[itemKey].idArray.length < 1) return null;
        if (itemKey === "trendingSongs") {
          return (
            <ListItemScrollHz description={itemKey} key={itemKey}>
              <ListItemContainer songs={data[itemKey]} />
            </ListItemScrollHz>
          );
        }
        return (
          <Container
            key={itemKey}
            songs={data[itemKey]}
            description={itemKey}
          />
        );
      })}
    </div>
  );
}
export default page;
