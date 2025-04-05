import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Google Client ID and Secret are required.");
  }

const authOptions: AuthOptions = {
 providers: [
     GoogleProvider({
         clientId: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
         authorization: {
            params: {
              prompt: "select_account",
            },
     }
    }),
   ],
   pages: {
     signIn: '/auth/signin',
   },
   session: {
     strategy: 'jwt',
   },
   jwt: {
    secret: NEXTAUTH_SECRET,
  },
   callbacks: {
     async jwt({ token, account, profile }) {
       if (account && profile) {
         // token.id = profile.id;
         token.email = profile.email;
         token.name = profile.name;
       }
       return token;
     },
     async session({ session, token }) {
       if (session?.user && token?.email) {
         session.user.email = token.email;
         session.user.name = token.name;
       }
       return session;
     },
   },
}


const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }