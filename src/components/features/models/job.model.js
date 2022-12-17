const { Schema, model } = require("mongoose");

const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    postedAt: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "FullStack"],
    },
    level: { type: String, required: true, enum: ["Junior", "Senior"] },
    contract: {
      type: String,
      required: true,
      enum: ["Part Time", "Full Time"],
    },
    position: { type: String, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true }
);
const JobModel = model("job", JobSchema);
module.exports = JobModel;
