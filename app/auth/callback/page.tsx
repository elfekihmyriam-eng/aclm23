"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // Échange le token contre une session (cookies)
      const { error } = await supabase.auth.getSession();

      if (error) {
        router.replace("/login");
        return;
      }

      // Session OK → admin
      router.replace("/admin");
    };

    handleAuth();
  }, [router]);

  return null;
}

