"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase"; // ✅ client unique

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // ✅ REDIRECTION DIRECTE ET DÉFINITIVE VERS L’ADMIN
        emailRedirectTo: "https://aclm.ca/admin",

      },
    });

    setLoading(false);

    if (error) {
      alert("حدث خطأ، يرجى المحاولة مرة أخرى");
      return;
    }

    alert("تحقق من بريدك الإلكتروني، سيتم تحويلك تلقائيًا إلى لوحة الإدارة");
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
      />

      <button onClick={login} disabled={loading}>
        {loading ? "جارٍ الإرسال..." : "دخول"}
      </button>
    </main>
  );
}

