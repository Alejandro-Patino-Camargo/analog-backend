import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "link cannot be blank"],
    },
  },
  { timestamps: true },
);

const Link = mongoose.model("Link", linkSchema);
export default Link;
