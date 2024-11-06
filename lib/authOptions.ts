import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { createConnection } from "@/lib/mysqlClient";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const bcrypt = require("bcrypt");
        const db = await createConnection();
        const sql = "SELECT * FROM user WHERE email = ?";
        const [rows]: any = await db.query(sql, [credentials.email]);
        if (rows.length === 0) {
          throw new Error("No user found with this email");
        }
        const user = rows[0];
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          console.log("Invalid password");
          throw new Error("Invalid password");
        }
        console.log("Password valid:", isValid);
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
