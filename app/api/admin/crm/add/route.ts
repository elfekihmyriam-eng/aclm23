import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email manquant" },
        { status: 400 }
      );
    }

    console.log("Adding email to CRM:", email);

    // Vérification existence
    const { data: existing, error: selectError } = await supabase
      .from("crm_contacts")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (selectError) {
      console.error("SELECT ERROR:", selectError);
      return NextResponse.json(
        { error: selectError.message },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Email déjà موجود في CRM",
      });
    }

    // Insert
const { error: insertError } = await supabase
  .from("crm_contacts")
  .insert([
    {
      email,
      source: "admin",
    },
  ]);

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تمت إضافة البريد إلى CRM",
    });

  } catch (err: any) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}


