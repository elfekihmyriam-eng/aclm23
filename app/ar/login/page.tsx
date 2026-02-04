"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";



export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 async function login() {
  if (!email || !password) {
    alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  // ✅ IMPORTANT : forcer la synchro auth AVANT de quitter la page
  await supabase.auth.getUser();

  router.replace("/admin/authors");
  router.refresh();
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

      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        style={{ direction: "ltr" }}
      />

      <button type="button" onClick={login} disabled={loading}>
        {loading ? "جارٍ التحقق..." : "دخول"}
      </button>
    </main>
  );
}


