import mongoose from "mongoose";

const LogStatSchema = new mongoose.Schema({
  projectId: {
  type: String,
  required: true,
  index: true,
},

  clusterHash: {
    type: String,
    required: true,
    index: true,
  },

  windowStart: {
    type: Date,
    required: true,
    index: true,
  },

  count: {
    type: Number,
    default: 0,
  },
});

LogStatSchema.index({ clusterHash: 1, windowStart: 1 }, { unique: true });

const LogStat =
  mongoose.models.LogStat || mongoose.model("LogStat", LogStatSchema);

export default LogStat;
