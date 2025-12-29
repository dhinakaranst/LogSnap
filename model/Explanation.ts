import mongoose from "mongoose";

const ExplanationSchema = new mongoose.Schema({
  anomalyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anomaly",
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  possibleCause: {
    type: String,
    required: true,
  },
  suggestedAction: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number, // 0–1
    default: 0.7,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Anomaly =  mongoose.models.Explanation ||
  mongoose.model("Explanation", ExplanationSchema);

  export default Anomaly;