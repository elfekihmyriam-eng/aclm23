// app/fr/BooksShowcase.tsx
import { supabase } from "@/lib/supabase";
import BooksShowcaseClient from "./BooksShowcaseClient";

export const dynamic = "force-dynamic";

export default async function BooksShowcase() {
  const { data: books } = await supabase
    .from("books")
    .select("id, cover_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (!books || books.length === 0) return null;

  return <BooksShowcaseClient books={books} />;
}
