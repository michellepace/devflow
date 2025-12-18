import { connection } from "next/server";
import { ClerkSignUp } from "@/components/auth/clerk-signup";

export default async function SignUpPage() {
  await connection();

  return <ClerkSignUp />;
}
