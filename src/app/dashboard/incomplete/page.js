import { getServerSession } from "next-auth/next";
import authoption from "../../api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Dashboard from "@/components/template/Dashboard";

async function Incomplete() {
  const session = await getServerSession(authoption);
  await connectDB();

  const data = await User.findOne({ email: session.user.email });
  const filterData = [];
  data.todos.map((todo) => {if(todo.status === "incomplete") {
    return filterData.push(todo)
  }})


  return <Dashboard data={filterData} title="Incomplete" />;
}

export default Incomplete;
