import { ClerkProvider as ClerkNextJSProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

type ClerkProviderProps = React.ComponentProps<typeof ClerkNextJSProvider>;

export function ClerkProvider({
  children,
  appearance,
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
        },
        ...appearance,
      }}
      {...props}
    >
      {children}
    </ClerkNextJSProvider>
  );
}
