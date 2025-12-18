import { connection } from "next/server";
import { ClerkSignIn } from "@/components/auth/clerk-signin";

export default async function SignInPage() {
  await connection();

  return <ClerkSignIn />;
}
