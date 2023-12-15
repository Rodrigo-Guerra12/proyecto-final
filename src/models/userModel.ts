import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define the schema
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const dataSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

// Define the model
const User: Model<IUser> = model<IUser>("User", dataSchema);

export default User;
