import { SignIn } from "@clerk/nextjs";
import { connection } from "next/server";

export default async function SignInPage() {
  await connection();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <SignIn />
    </div>
  );
}
