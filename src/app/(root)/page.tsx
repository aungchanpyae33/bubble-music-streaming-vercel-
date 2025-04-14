import { get } from "@/database/data";
import Container from "@/ui/albumContainer/Container";
import TapNavi from "@/ui/Home/TapNavi";

async function page() {
  console.log("hey");
  const songs = await get();
  return (
    <div className="space-y-3">
      <TapNavi />
      <Container
        songs={["hi"]}
        description="နားထောင်လေ့ရှိသော သီချင်းများ စာရင်း"
      />
    </div>
  );
}
export default page;
