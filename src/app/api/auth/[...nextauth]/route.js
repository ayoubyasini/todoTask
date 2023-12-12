import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const authOptions = {
  session: { straregy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const {email, password} = credentials;

        try {
            await connectDB();
        }catch(error) {
            throw new Error("a problem has occured on the server");
        } 


        if(!email || !password) {
            throw new Error("please enter valid information")
        }

        const user = await User.findOne({email: email});

        if(!user) throw new Error("Created an account");

        const isValid = await verifyPassword(password, user.password);

        if(!isValid) throw new Error("Email or password is incorrect");
        
        return {email}
      },
    }),
  ],
};



const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};