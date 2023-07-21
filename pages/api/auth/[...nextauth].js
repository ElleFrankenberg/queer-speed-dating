import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// import { verifyPassword } from '../../../lib/auth';
// import { connectToDatabase } from '../../../lib/db';

import { verifyPassword } from "@/helpers/auth";
import { connectDatabase } from "@/helpers/db";

export const authOptions = {
  secret: "thequickbrownfox",
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const adminCollection = client.db().collection("admin");

        const admin = await adminCollection.findOne({
          email: credentials.email,
        });

        if (!admin) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          admin.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: admin.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);

// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyPassword } from "@/helpers/auth";
// import { connectDatabase } from "@/helpers/db";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const client = await connectDatabase();

//         const adminCollection = client.db().collection("admin");

//         const admin = await adminCollection.findOne({
//           email: credentials.email,
//         });

//         if (!admin) {
//           client.close();
//           throw new Error("No admin found!");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           admin.password
//         );

//         if (!isValid) {
//           client.close();
//           throw new Error("wrong password!");
//         }

//         client.close();
//         return { email: admin.email };
//       },
//     }),
//   ],
// });
