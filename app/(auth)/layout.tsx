const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/auth-bg-light.webp')] dark:bg-[url('/images/auth-bg-dark.webp')]">
      {children}
    </main>
  );
};

export default AuthLayout;
