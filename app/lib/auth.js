import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      const googleId = profile?.sub;

      if (!googleId || !user?.email) {
        return false;
      }

      const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select("id")
        .eq("google_id", googleId)
        .maybeSingle();

      if (findError) {
        console.error("FIND USER ERROR:", findError);
        return false;
      }

      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          google_id: googleId,
          email: user.email,
          name: user.name || "Utilizator",
          picture: user.image || null,
        });

        if (insertError) {
          console.error("CREATE USER ERROR:", insertError);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (!session?.user?.email) {
        return session;
      }

      const { data: dbUser, error } = await supabase
        .from("users")
        .select("id, phone_number")
        .eq("email", session.user.email)
        .maybeSingle();

      if (error) {
        console.error("SESSION USER ERROR:", error);
        return session;
      }

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.phoneNumber = dbUser.phone_number;
      }

      session.user.isAdmin = session.user.email === process.env.ADMIN_EMAIL;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
