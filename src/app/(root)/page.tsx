import { get } from "@/database/data";
import Container from "@/ui/albumContainer/Container";
import TapNavi from "@/ui/Home/TapNavi";

async function page() {
  const { data, error } = await get();
  console.log(data, error);
  if (!data || error) return null;
  return (
    <div className="space-y-3">
      <TapNavi />
      <Container
        songs={data["getAllTest"]}
        description="နားထောင်လေ့ရှိသော သီချင်းများ စာရင်း"
      />
    </div>
  );
}
export default page;
