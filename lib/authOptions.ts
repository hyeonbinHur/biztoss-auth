import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { createConnection } from "@/lib/mysqlClient";
import axios from "axios";

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
          throw new Error("Invalid password");
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const db = await createConnection();
      const sql = "SELECT * FROM user WHERE email = ?";
      const [rows]: any = await db.query(sql, [user.email]);
      if (rows.length === 0) {
        const insertSql =
          "INSERT INTO user (email, username, image) VALUES (?, ?, ?)";
        await db.query(insertSql, [user.email, user.name, user.image]);
        console.log(user.image);
      }
      return true;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/getUser?email=${user.email}`
          );
          const userInfo = response.data;
          token.id = userInfo.id;
          token.usertype = userInfo.usertype;
          token.username = userInfo.username;
          token.image = userInfo.image;
        } catch (err) {
          console.error(err);
        }
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).usertype = token.usertype;
        (session.user as any).username = token.username;
        (session.user as any).image = token.image;
      }
      return session;
    },
  },
};
