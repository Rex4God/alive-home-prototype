import credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
      async profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email:
            profile.email ||
            `${profile.id}+${profile.login}@users.noreply.github.com`,
          image: profile.avatar_url,
        };
      },
    }),
    credentials({
      name: "Credentials",
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/auths/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const result = await response.json();

          if (response.ok && result?.data?.token) {
            const user = result.data.user;
            return {
              id: user.userId,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role?.name,
              token: result.data.token,
              isBuyerProfileFiled: user.isBuyerProfileFiled,
              isDeveloperProfileFiled: user.isDeveloperProfileFiled,
              isRealtorProfileFiled: user.isRealtorProfileFiled,
              isHomeownerProfileFiled: user.isHomeownerProfileFiled,
            };
          }
          throw new Error(result.message || "Invalid credentials");
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600, //1hour
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        // Handle Google provider
        if (account.provider === "google") {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASEURL}/auth/google-login`,
              {
                email: profile?.email || user.email,
                name: profile?.name || user.name,
                picture: profile?.picture || user.image,
                googleId: profile?.sub,
              }
            );

            const savedUser = response.data?.data;

            return {
              ...token,
              id: savedUser.id,
              role: savedUser.role,
              email: savedUser.email,
              token: response.data.token,
            };
          } catch (error) {
            console.error("Error saving Google user to DB:", error);
            return token;
          }
        }

        // Handle GitHub provider
        if (account.provider === "github") {
          try {
            const email =
              user.email ||
              `${profile?.id}+${profile?.login}@users.noreply.github.com`;

            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASEURL}/auth/github-login`,
              {
                email,
                name: profile?.name || profile?.login || user.name,
                picture: profile?.avatar_url || user.image,
                githubId: profile?.id?.toString(),
              }
            );

            if (response.data?.data) {
              return {
                ...token,
                id: response.data.data.id,
                role: response.data.data.role,
                email: response.data.data.email,
                token: response.data.token,
              };
            }
          } catch (error) {
            console.error("Error saving GitHub user to DB:", error);
            return token;
          }
        }

        // Handle credentials provider
        if (account.provider === "credentials") {
          return {
            ...token,
            id: user.id,
            email: user.email,
            role: user.role,
            token: user.token,
            isHomeownerProfileFiled: user.isHomeownerProfileFiled,
            isRealtorProfileFiled: user.isRealtorProfileFiled,
            isBuyerProfileFiled: user.isBuyerProfileFiled,
            isDeveloperProfileFiled: user.isDeveloperProfileFiled,
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
        session.user.isHomeownerProfileFiled = token.isHomeownerProfileFiled as boolean;
        session.user.isRealtorProfileFiled = token.isRealtorProfileFiled as boolean;
        session.user.isBuyerProfileFiled = token.isBuyerProfileFiled as boolean;
        session.user.isDeveloperProfileFiled = token.isDeveloperProfileFiled as boolean;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}`;
    },
  },

  pages: {
    signIn: "/login",
    error: "/not-found",
  },
});
