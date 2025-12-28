import mongoose from "mongoose";

const LogClusterSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  normalizedMessage: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  firstSeen: {
    type: Date,
    default: Date.now,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
});

const LogCluster =
  mongoose.models.LogCluster ||
  mongoose.model("LogCluster", LogClusterSchema);

export default LogCluster;
