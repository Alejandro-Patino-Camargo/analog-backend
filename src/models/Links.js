import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [false, "link cannot be blank"],
    },
    counter: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Link = mongoose.model("Link", linkSchema);
export default Link;
