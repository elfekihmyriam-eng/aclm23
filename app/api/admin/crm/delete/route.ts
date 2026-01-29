import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;

  if (!id) {
    return NextResponse.json(
      { error: "ID manquant" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("crm_contacts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.redirect(
    new URL("/admin/crm", req.url)
  );
}


