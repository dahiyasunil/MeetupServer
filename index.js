const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));

initializeDatabase();

const getAllEvents = async () => {
  try {
    return await Event.find();
  } catch (err) {
    console.error(`An error occured while trying to retrive events.
      ${err}`);
    throw new Error(`An error occured while trying to retrive events.`);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents();
    if (events) {
      res
        .status(200)
        .json({ msg: `Events retrived successfully!`, data: events });
    } else {
      res.status(204).json({ msg: `No Events!`, data: [] });
    }
  } catch (err) {
    next(err);
  }
});

const getEventDetailsById = async (eventId) => {
  try {
    return await Event.findById(eventId);
  } catch (err) {
    console.error(`An error occured while trying to retrive event.
      ${err}`);
    throw new Error(`An error occured while trying to retrive event.`);
  }
};

app.get("/events/eventDetails/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventDetails = await getEventDetailsById(eventId);
    if (eventDetails) {
      res.status(200).json({
        msg: `Event details retrieved successfully.`,
        data: eventDetails,
      });
    } else {
      res.status(404).json({
        msg: "Event not found.",
      });
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    msg: err.message || "An unexpected error occurred",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
