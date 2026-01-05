import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // BYPASS LOGIN: Always return mock admin user
                return {
                    id: "mock-admin-id",
                    name: "Dev Admin",
                    email: "admin@example.com",
                    role: "admin",
                } as any; // Cast to any to avoid strict type checks if User type is complex

                /*
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Find user in database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    return null;
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                // Return user object with role
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role as "admin" | "user",
                };
                */
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.sub!;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    }
};
