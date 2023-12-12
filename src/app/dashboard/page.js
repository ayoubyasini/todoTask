import { getServerSession } from "next-auth/next";
import authoption from "../api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Dashboard from "@/components/template/Dashboard";

async function page() {
  const session = await getServerSession(authoption);
  await connectDB();
  const data = await User.findOne({email: session.user.email});

  return <Dashboard data={data.todos} title="All" />;
}

export default page;