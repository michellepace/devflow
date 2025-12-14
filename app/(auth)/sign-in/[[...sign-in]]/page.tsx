import { connection } from "next/server";
import { ClerkSignIn } from "@/components/auth/clerk-signin";

export default async function SignInPage() {
  await connection();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ClerkSignIn />
    </div>
  );
}
