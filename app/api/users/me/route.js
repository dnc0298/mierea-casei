import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

import { authOptions } from "@/app/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Trebuie să fii autentificat." },
        { status: 401 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
    );

    const { data: user, error } = await supabase
      .from("users")
      .select("name, email, phone_number")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("GET USER DATA ERROR:", error);

      return NextResponse.json(
        { error: "Datele utilizatorului nu au putut fi încărcate." },
        { status: 500 },
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Utilizatorul nu a fost găsit." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("USER ME ERROR:", error);

    return NextResponse.json({ error: "A apărut o eroare." }, { status: 500 });
  }
}
