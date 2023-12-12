import { getServerSession } from "next-auth";
import authOption from "../../api/auth/[...nextauth]/route";
import Signin from "@/components/template/Signin";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOption);
  if (session) return redirect("/");
  return (
    <div>
      <Signin />
    </div>
  );
}

export default page;
