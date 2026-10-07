import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

import { authOptions } from "@/app/lib/auth";

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Trebuie să fii autentificat." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (phone.length < 9 || phone.length > 30) {
      return NextResponse.json(
        { error: "Numărul de telefon nu este valid." },
        { status: 400 },
      );
    }

    const phoneRegex = /^[0-9+\s()-]+$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Numărul de telefon nu este valid." },
        { status: 400 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    const { error } = await supabase
      .from("users")
      .update({
        phone_number: phone,
      })
      .eq("id", session.user.id);

    if (error) {
      console.error("UPDATE PHONE ERROR:", error);

      return NextResponse.json(
        { error: "Numărul de telefon nu a putut fi salvat." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("PHONE API ERROR:", error);

    return NextResponse.json({ error: "A apărut o eroare." }, { status: 500 });
  }
}
