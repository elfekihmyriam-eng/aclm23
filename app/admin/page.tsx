"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection vers une section admin existante
    router.replace("/admin/authors");
  }, [router]);

  return null;
}

