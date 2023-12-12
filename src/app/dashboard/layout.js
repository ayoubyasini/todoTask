import MainSidebar from "@/components/layout/MainSidebar";
import { getServerSession } from "next-auth";
import authoption from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Layout({ children }) {
  const session = await getServerSession(authoption);
  if (!session) redirect("/");
  console.log(session)

  return (
    <div className="dashboard">
      <MainSidebar user={session.user} />
      {children}
    </div>
  );
}

export default Layout;
