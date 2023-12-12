import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      title: String,
      description: String,
      status: String,
      important: Boolean,
      customDate: Date,
      createAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
    },
  ],
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});


const User = models.User || model("User", userSchema);

export default User;