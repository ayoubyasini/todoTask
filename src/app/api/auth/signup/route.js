import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashedPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please ener valid information" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User exist already!" },
        { status: 422 }
      );
    }

    const hashPassword = await hashedPassword(password);

    const newUser = await User.create({
      email: email,
      password: hashPassword,
    });

    return NextResponse.json({ message: "Create an acount!" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "There is a problem with the server" },
      { status: 500 }
    );
  }
}
