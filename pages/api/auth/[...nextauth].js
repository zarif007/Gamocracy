import axios from "axios";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { apiEndpoints, domain } from './../../../domain';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {

      axios.post(`${apiEndpoints.user}`, session.user)

      return session
    }
  },
  secret: process.env.JWT_SECRET,
})