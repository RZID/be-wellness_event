const { Schema, model } = require("mongoose");
const dateLimit = (val) => val.length <= 3;
const eventSchema = new Schema({
  name: String,
  company: String,
  proposed_date: {
    type: [
      {
        type: Date
      }
    ],
    validate: [dateLimit, "{PATH} exceeds the limit of 3"]
  },
  proposed_location: String,
  hr: { type: Schema.Types.ObjectId, ref: "user" },
  vendor: { type: Schema.Types.ObjectId, ref: "user" },
  date_created: Date,
  status: String,
  approved_date: Date,
  remarks: String
});
module.exports = model("event", eventSchema);
