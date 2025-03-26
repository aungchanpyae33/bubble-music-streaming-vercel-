import Container from "@/ui/albumContainer/Container";

function page() {
  return (
    <div className="p-4">
      <div className=" w-full h-[80px] flex justify-between gap-3 flex-shrink-0 overflow-auto items-center max-w-[900px] flex-grow-0 text-nowrap">
        <button className=" p-2 px-6 bg-black text-white">liked songs</button>
        <button className=" p-2 px-6 bg-black text-white">energy</button>
        <button className=" p-2 px-6 bg-black text-white">heart broken</button>
        <button className=" p-2 px-6 bg-black text-white">happy</button>
        <button className=" p-2 px-6 bg-black text-white">sleep</button>
        <button className=" p-2 px-6 bg-black text-white">chill</button>{" "}
        <button className=" p-2 px-6 bg-black text-white">rock</button>{" "}
        <button className=" p-2 px-6 bg-black text-white">kpop</button>
      </div>
      <Container songs={["hi"]} description="Request song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
      <Container songs={["hi"]} description="Hit Song of the week" />
    </div>
  );
}
export default page;
