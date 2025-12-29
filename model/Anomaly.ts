import mongoose from "mongoose";

const AnomalySchema = new mongoose.Schema({
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

});

const Anomaly = mongoose.models.Anomaly || mongoose.model("Anomaly", AnomalySchema);

export default Anomaly;