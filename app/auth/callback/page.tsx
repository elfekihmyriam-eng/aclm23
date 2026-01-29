"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // On laisse Supabase écrire la session,
    // puis on va à l’admin
    setTimeout(() => {
      router.replace("/admin/authors");
    }, 800);
  }, [router]);

  return (
    <main className="content-page" dir="rtl">
      <p>جاري تسجيل الدخول…</p>
    </main>
  );
}

