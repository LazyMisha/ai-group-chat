import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { saveUser } from "@/lib/mongo/users";
import { connect, disconnect } from "@/lib/mongo";

const authOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "your username" },
            password: { label: "Password", type: "password", placeholder: "your password" }
          },
          async authorize(credentials, req) {
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com", image: "https://voda.love/wp-content/uploads/2020/11/328578.jpg" }
            const user2 = { id: "2", name: "J Doe", email: "jdoe@example.com", image: "https://images.squarespace-cdn.com/content/v1/569591ff0ab3771dba3f1ec6/1453167464043-YWCO1KRYYH7SJNC3D1ZM/image-asset.jpeg" }
            const user3 = { id: "3", name: "Ma Lin", email: "malin@example.com", image: "https://www.yasaka.se/wp-content/uploads/2019/08/Ma-Lin-poto.jpg" }
      
            if (credentials?.username === "jsmith" && credentials?.password === "password") {
              return user
            } else if (credentials?.username === "doe" && credentials?.password === "password") {
              return user2
            } else if (credentials?.username === "ma" && credentials?.password === "password") {
              return user3 
            } else {
              return null
            }
          }
        })
    ],
    events: {
      signIn: async ({ user }) => {
        await connect();
        await saveUser(user);
      },
      signOut: async () => {
        await disconnect();
      }
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }

        return token;
      },
      async session({ session, token }) {
        if (token?.id) {
          session.user.id = token.id;
        }

        return session;
      }
    }
}

export default authOptions;