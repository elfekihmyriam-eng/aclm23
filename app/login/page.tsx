"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function login() {
    await supabase.auth.signInWithOtp({
      email,
      options: {
       emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    alert("تحقق من بريدك الإلكتروني ثم سيتم تحويلك تلقائيًا إلى لوحة الإدارة");
  }

  return (
    <main className="content-page" dir="rtl">
      <h1>تسجيل الدخول (الإدارة)</h1>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={login}>دخول</button>
    </main>
  );
}

