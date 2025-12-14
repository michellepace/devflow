import { ClerkSignIn } from "@/components/auth/clerk-signin";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <ClerkSignIn />
    </div>
  );
}
