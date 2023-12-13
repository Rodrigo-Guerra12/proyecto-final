import mongoose, { Document, Schema, Model, model } from "mongoose";

interface ISearch extends Document {
  searchType: string;
  date: Date;
  queryOptions: {
    q: string;
    sort?: "indexed" | undefined;
    order?: "asc" | "desc" | undefined;
    per_page?: number | undefined;
    page?: number | undefined;
  };
}

const dataSchema: Schema<ISearch> = new Schema<ISearch>({
  searchType: {
    required: true,
    type: String,
  },

  date: {
    requiered: true,
    type: Date,
    default: Date.now,
  },
  queryOptions: {
    required: true,
    type: {
      q: { required: true, type: String },
      sort: { required: false, type: String },
      order: { required: false, type: String },
      per_page: { required: false, type: Number },
      page: { required: false, type: Number },
    },
  },
});

// Define the model
const Search: Model<ISearch> = model<ISearch>("Search", dataSchema);

export default Search;
