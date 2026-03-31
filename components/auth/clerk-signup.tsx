import { SignUp } from "@clerk/nextjs";

export function ClerkSignUp() {
  return (
    <SignUp
      appearance={{
        options: {
          logoImageUrl: "/images/site-logo.svg",
        },
      }}
    />
  );
}
