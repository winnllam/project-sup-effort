import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  name: String,
  value: { type: Number, min: 0 },
});

sequenceSchema.index({ name: 1 }, { unique: true });

sequenceSchema.statics.next = async function nextSequenceValue(name) {
  const { value } = await this.findOneAndUpdate(
    { name },
    { $inc: { value: 1 } },
    { upsert: true, new: true }
  );
  return value;
};

export const Sequence = mongoose.model("Sequence", sequenceSchema);
