import AudiosContainer from "@/ui/albumContainer/AudiosContainer";

// import Track from "@/ui/trackComponent/Track";

const playListMock = {
  playlistId: "one",
  song: [
    {
      url: "https://s3.tebi.io/tebi.bubblemusic.us.kg/init.mp4",
      sege: 24,
      name: "neverofeorghoihergioehrer",
      duration: 239.467,
    },
    //pain in the ass that i am using wrong s3 tebi url not cdn url and it takes 2 days
    {
      url: "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/sdk/music/init.mp4",
      sege: 24,
      name: "gonenewtest",
      duration: 239.467,
    },

    {
      url: "https://kokopop.vercel.app/assets/nn/init.mp4",
      sege: 24,
      name: "paper lady",
      duration: 239.467,
    },
    {
      url: "https://kokopop.vercel.app/assets/init.mp4",
      sege: 24,
      name: "paper lady",
      duration: 239.467,
    },
    {
      url: "https://s3.tebi.io/test1345/testsmall/init.mp4",
      sege: 88,
      name: "pannsmall",
      duration: 263.19,
    },

    {
      url: "https://s3.tebi.io/test1345/sond/init.mp4",
      sege: 5,
      name: "panngg",
      duration: 247.744,
    },
    {
      url: " https://s3.tebi.io/test1345/nicee/init.mp4",
      sege: 12,
      name: "pannlast",
      duration: 155.222,
    },
  ],
};

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
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
