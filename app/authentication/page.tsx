import AuthForm from "@/components/auth-form";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Params = Promise<{ mode: "login" | "signup" }>;
export default async function Authentication(props: { searchParams: Params }) {
  const result = await verifyAuth();
  const params = await props.searchParams;
  const searchParams = params.mode;
  if (result.user) {
    redirect("/expenses");
  }
  const formMode: "login" | "signup" = searchParams || "login";
  return (
    <main style={{ flex: 1, overflow: "scroll" }}>
      <AuthForm mode={formMode} />
    </main>
  );
}
