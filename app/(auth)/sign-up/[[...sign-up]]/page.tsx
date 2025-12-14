import { connection } from "next/server";
import { ClerkSignUp } from "@/components/auth/clerk-signup";

export default async function SignUpPage() {
  await connection();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ClerkSignUp />
    </div>
  );
}
