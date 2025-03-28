function TapNavi() {
  return (
    <div className=" w-full h-[80px] flex justify-between gap-3 flex-shrink-0 overflow-auto items-center max-w-[900px] flex-grow-0 text-nowrap">
      <button className=" p-2 px-6 ">liked songs</button>
      <button className=" p-2 px-6 ">energy</button>
      <button className=" p-2 px-6 ">heart broken</button>
      <button className=" p-2 px-6 ">happy</button>
      <button className=" p-2 px-6 ">sleep</button>
      <button className=" p-2 px-6 ">chill</button>{" "}
      <button className=" p-2 px-6 ">rock</button>{" "}
      <button className=" p-2 px-6 ">kpop</button>
    </div>
  );
}

export default TapNavi;
