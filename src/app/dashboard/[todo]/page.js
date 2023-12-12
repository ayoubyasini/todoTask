import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { AuthOption } from "../../api/auth/[...nextauth]/route";
import AddTods from "@/components/layout/AddTodos";

async function page({params: {todo}}) {
  await connectDB();
  const session = await getServerSession(AuthOption);
  const data = await User.findOne({email: session.user.email});

  const todoOne = data.todos.filter((item) => item._id == todo);

  return (
    <AddTods title="Edit Task" data={JSON.parse(JSON.stringify(todoOne))} />
  );
}

export default page;
