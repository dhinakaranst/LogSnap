import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  projectId: {
  type: String,
  required: true,
  index: true,
},
  level: {
    type: String,
    enum: ["INFO", "WARN", "ERROR"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  normalizedMessage: {
  type: String,
  required: true,
},
  hash: {
  type: String,
  required: true,
  index: true,
},
  source: {
    type: String,
    required: true,
  },
  metadata: {
    type: Object,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },


  

});

const Log =
  mongoose.models.Log || mongoose.model("Log", LogSchema);

export default Log;
