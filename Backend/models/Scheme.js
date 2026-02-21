// models/Scheme.js

import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  scheme_name: String,
  description: String,
  benefits: String,
  criteria: {
    age_limit_min: Number,
    age_limit_max: Number,
    annual_income_limit_min: Number,
    annual_income_limit_max: Number,
  },
  documents: [String],
  application: String,
  source: String,
}, { timestamps: true });

export default mongoose.model("Scheme", schemeSchema);