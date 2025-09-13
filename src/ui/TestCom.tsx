"use client";
import { supabase } from "@/database/supabase";
import {
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useStorePlayListId,
} from "@/lib/zustand";
import { useRouter } from "next/navigation";

function TestCom() {
  const router = useRouter();
  const resetAllStores = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    useSong.getState().reset();
    usePreviousPlayList.getState().reset();
    useStorePlayListId.getState().reset();
    useRepeatAndCurrentPlayList.getState().reset();
  };

  return (
    <button
      className="hover:bg-[#333333]  w-full p-2 flex gap-x-3 border border-gray-700 "
      onClick={resetAllStores}
    >
      Logout
    </button>
  );
}

export default TestCom;
