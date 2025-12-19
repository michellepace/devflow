const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-(image:--auth-bg) px-6 py-10 md:px-8 lg:px-12">
      {children}
    </main>
  );
};

export default AuthLayout;
