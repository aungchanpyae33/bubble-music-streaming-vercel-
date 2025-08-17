function TapNavi() {
  return (
    <div className=" w-full p-4 h-[80px] thinScrollbar [&>*]:bg-[#222222] flex justify-between gap-3 shrink-0 overflow-auto items-center max-w-[950px] grow-0 text-nowrap no-scrollbar">
      <button className=" p-2 px-6 hover:bg-[#333333] ">နှစ်သက်မှု</button>
      <button className=" p-2 px-6 hover:bg-[#333333] ">အန်နာဂျီ</button>
      <button className=" p-2 px-6 hover:bg-[#333333] ">အသည်းကွဲ</button>
      <button className=" p-2 px-6 hover:bg-[#333333] ">ပျော်စရာ</button>
      <button className=" p-2 px-6 hover:bg-[#333333] ">အိပ်ရာဝင်</button>
      <button className=" p-2 px-6 hover:bg-[#333333] ">အပန်းဖြေ</button>{" "}
      <button className=" p-2 px-6 hover:bg-[#333333] ">ရော့ခ်</button>{" "}
      <button className=" p-2 px-6 hover:bg-[#333333] ">ကေ ပေါ့ပ်</button>
    </div>
  );
}

export default TapNavi;
