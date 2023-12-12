import { getServerSession } from "next-auth";
import authoption from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home(props) {
  console.log(props)
  const session = await getServerSession(authoption);
  if(!session) redirect("/signup")

  return redirect("/dashboard");
}
