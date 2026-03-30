import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { validateEmail } from "./emailValidator";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@stypz.me" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Validate email format and check for disposable emails
        const emailValidation = validateEmail(credentials.email);
        if (!emailValidation.isValid) {
          throw new Error(emailValidation.message || "Invalid email address");
        }

        try {
          const res = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.detail || "Invalid email or password");
          }

          const data = await res.json();
          
          if (!data.user || !data.access_token) {
            throw new Error("Invalid response from server");
          }

          return {
            id: String(data.user.id),
            name: data.user.name,
            email: data.user.email,
            accessToken: data.access_token,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("Unable to connect to authentication server");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encode({ secret, token }) {
      if (!token) return "";
      return jwt.sign(token, secret as string, { algorithm: "HS256" });
    },
    decode({ secret, token }) {
      if (!token) return null;
      try {
        return jwt.verify(token, secret as string, {
          algorithms: ["HS256"],
        }) as any;
      } catch {
        return null;
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).accessToken = token.accessToken;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Allow sign in if user exists
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
