import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
async function getData() {
  // This artificial delay simulates a slow data fetch
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { name: "Dashboard" };
}
// import Track from "@/ui/trackComponent/Track";

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = process.env.VERCEL_URL || "localhost:3000";
  const data = await fetch(
    `${protocol}://${host}/api/getPlaylistData/${params.album}`
  );
  const playListMock = await data.json();
  return (
    <div>
      <AudiosContainer url={playListMock} description={params.album} />
      {/* <div className=" bg-yellow-600 relative w-full h-[40px]">
        hello
        <div className=" absolute top-0 left-0 -translate-y-full">
          full tran
        </div>
      </div> */}
    </div>
  );
}

export default page;
