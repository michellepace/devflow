import { ClerkProvider as ClerkNextJSProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

type ClerkProviderProps = React.ComponentProps<typeof ClerkNextJSProvider>;

export function ClerkProvider({
  children,
  appearance,
  localization,
  ...props
}: ClerkProviderProps) {
  return (
    <ClerkNextJSProvider
      appearance={{
        theme: shadcn,
        cssLayerName: "clerk",
        variables: {
          fontFamily: "var(--font-sans-serif)",
        },
        elements: {
          formButtonPrimary:
            "bg-[image:var(--gradient-primary)] text-white hover:opacity-90",
          footer: "bg-card",
          avatarBox: "size-8",
        },
        ...appearance,
      }}
      localization={{
        socialButtonsBlockButton: "{{provider|titleize}}",
        signIn: {
          start: {
            title: "Sign in",
            subtitle: "to continue to DevFlow",
          },
        },
        signUp: {
          start: {
            title: "Sign up",
            subtitle: "to continue to DevFlow",
          },
        },
        ...localization,
      }}
      {...props}
    >
      {children}
    </ClerkNextJSProvider>
  );
}
