import Container from "@/ui/albumContainer/Container";
import TapNavi from "@/ui/Home/TapNavi";

function page() {
  return (
    <div className="p-4">
      <TapNavi />
      <Container songs={["hi"]} description="Request song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
    </div>
  );
}
export default page;
