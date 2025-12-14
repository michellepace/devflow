import { SignUp } from "@clerk/nextjs";

export function ClerkSignUp() {
  return (
    <SignUp
      appearance={{
        layout: {
          logoImageUrl: "/images/site-logo.svg",
        },
      }}
    />
  );
}
