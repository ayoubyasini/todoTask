import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(req);

    if (!session) {
      return NextResponse.json(
        {
          error: "Please create an account first",
        },
        { status: 422 }
      );
    }

    const { email } = session.user;

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 }
      );
    }

    const { title, description, status, important, customDate } =
      await req.json();

    console.log(customDate);

    if (!title || !description) {
      return NextResponse.json(
        { error: "Please enter valid information" },
        { status: 400 }
      );
    }

    user.todos.push({ title, description, status, important, customDate });
    user.save();

    return NextResponse.json(
      { message: "Task Created successfuly" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error in connecting to DB!" },
      { status: 422 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(req);
    console.log(session)
    if (!session) {
      return NextResponse.json(
        {
          error: "Please create an account first",
        },
        { status: 422 }
      );
    }

    const {email} = session.user;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({data: user.todos },{status: 200})
    
  } catch (error) {
    return NextResponse.json(
      { error: "error in connecting to DB!"},
      { status: 422 }
    );
  }
}