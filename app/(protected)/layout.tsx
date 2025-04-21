import { verifyAuth } from "@/lib/auth";
import "../globals.css";
import UserProvider from "@/context/user-context";
import { User } from "lucia";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyAuth();

  if (!user) {
    redirect("/authentication?mode=login");
  }
  return (
    <main style={{ flex: 1, overflow: "scroll" }}>
      <UserProvider value={user as User}>{children}</UserProvider>
    </main>
  );
}
