"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !email.includes("@")) {
      alert("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // 🔑 OBLIGATOIRE : passer par le callback
        emailRedirectTo: "https://aclm.ca/auth/callback",
      },
    });

    setLoading(false);

    if (error) {
      console.error("Supabase login error:", error.message);
      alert("حدث خطأ أثناء إرسال رابط الدخول، يرجى المحاولة مرة أخرى");
      return;
    }

    alert("تحقق من بريدك الإلكتروني، ثم اضغط على رابط الدخول");
  }

  return (
    <main className="content-page" dir="rtl">
      <h1>تسجيل الدخول (الإدارة)</h1>

      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        style={{ direction: "ltr" }}
      />

      <button type="button" onClick={login} disabled={loading}>
        {loading ? "جارٍ الإرسال..." : "دخول"}
      </button>
    </main>
  );
}

