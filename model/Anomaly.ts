import mongoose from "mongoose";

const AnomalySchema = new mongoose.Schema({
    projectId: {
  type: String,
  required: true,
  index: true,
},

    clusterHash:{
        type : String,
        required: true,
        index: true,
    },

    windowStart:{
        type: Date,
        required: true,
    },

    count:{
        type: Number,
        required: true,
    },

    severity:{
        type: String,
        enum: ["LOW","MEDIUM","HIGH"],
        required: true,
    },

    reason: {
    type: String,
    required: true,
  },

  detectedAt: {
    type: Date,
    default: Date.now,
  },

  aiExplanation: {
  type: String,
  default: null,
}

});

const Anomaly = mongoose.models.Anomaly || mongoose.model("Anomaly", AnomalySchema);

export default Anomaly;