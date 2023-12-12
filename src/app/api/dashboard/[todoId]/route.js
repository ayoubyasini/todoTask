import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    const id = context.params.todoId;
    if (!session) {
      return NextResponse.json(
        { error: "Create an account!" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User account not found!!" },
        { status: 404 }
      );
    }

    if (user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Your access to these todos is restricted" },
        { status: 404 }
      );
    }

    const newTodos = user.todos.filter((todo) => todo._id != id);
    user.todos = newTodos;
    user.save();

    return NextResponse.json(
      { message: "The ad was deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error in connecting to DB!" },
      { status: 422 }
    );
  }
}

export async function GET(req, context) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    const id = context.params.todoId;

    if (!session) {
      return NextResponse.json(
        { error: "Create an account!" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User account not found!!" },
        { status: 404 }
      );
    }

    if (user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Your access to these todos is restricted" },
        { status: 404 }
      );
    }

    const newTodos = user.todos.filter((todo) => todo._id == id);
    if (newTodos[0].status == "complete") {
      newTodos[0].status = "incomplete";
    } else if (newTodos[0].status == "incomplete") {
      newTodos[0].status = "complete";
    }

    user.save();

    return NextResponse.json(
      { message: "Todo successfully changed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error in connecting to DB!" },
      { status: 422 }
    );
  }
}

export async function PATCH(req, context) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    const id = context.params.todoId;
    console.log(context)
    const { title, description, customDate, status, important } = await req.json();

    if (!session) {
      return NextResponse.json(
        { error: "Create an account!" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "User account not found!!" },
        { status: 404 }
      );
    }

    if (user.email !== session.user.email) {
      return NextResponse.json(
        { error: "Your access to these todos is restricted" },
        { status: 404 }
      );
    }

    if (!title || !description || !customDate) {
      return NextResponse.json(
        { error: "Enter valid information" },
        { json: 401 }
      );
    }

    const todo = user.todos.filter((todo) => todo._id == id);
    todo[0].title = title;
    todo[0].description = description;
    todo[0].status = status;
    todo[0].customDate = customDate;
    todo[0].important = important;

    user.save();

    return NextResponse.json(
      { message: "Todo successfully changed" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error in connecting to DB!" },
      { status: 422 }
    );
  }
}
