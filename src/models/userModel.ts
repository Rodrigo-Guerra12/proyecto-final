import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define the schema
interface IUser extends Document {
  name: string;
  age: number;
}

const dataSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

// Define the model
const Data: Model<IUser> = model<IUser>("User", dataSchema);

export default Data;
