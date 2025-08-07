"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/database/supabase";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout}></Button>;
}
