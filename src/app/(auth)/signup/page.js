import { getServerSession } from "next-auth";
import authOption from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Signup from "@/components/template/Signup";

async function Page() {
  const session = await getServerSession(authOption);
  if (session) return redirect("/");
  return <Signup />;
}

export default Page;
