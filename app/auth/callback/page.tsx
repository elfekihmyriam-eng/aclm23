"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finalize = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        router.replace("/login");
        return;
      }

      router.replace("/admin");
    };

    finalize();
  }, [router]);

  return null;
}

