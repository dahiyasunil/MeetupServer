const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpeakerSchema = new Schema({
  designation: {
    type: String,
    required: true,
  },
});

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      required: true,
    },
    dateDetails: {
      startDateTime: {
        type: Date,
        required: true,
      },
      endDateTime: {
        type: Date,
        required: true,
      },
    },
    hostedBy: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    speakers: {
      type: [SpeakerSchema],
      default: [],
      required: true,
    },
    eventDetails: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
    restrictions: {
      dressCode: {
        type: String,
        default: "None",
      },
      ageRestriction: {
        type: Number,
        min: 0,
      },
    },
    location: {
      address: {
        type: String,
        required: function () {
          return this.type === "Offline" || this.type === "Both";
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ title: "text", tags: "text" });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
