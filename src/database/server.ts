import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { Database } from "../../database.types";

export const createClient = async () => {
  const cookieStore = await cookies();
  const { getIdToken } = getKindeServerSession();
  const idToken = await getIdToken();

  let token: string;

  if (idToken) {
    const secret = new TextEncoder().encode(process.env.KINDE_CLIENT_SECRET);
    const payload = typeof idToken === "string" ? { token: idToken } : idToken;

    token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
  } else {
    token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Server Component - safe to ignore in some cases.
          }
        },
      },
    }
  );
};
