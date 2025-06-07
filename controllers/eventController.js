const Event = require('../models/Event');
const User = require('../models/User');
const sendEventEmail = require('../config/nodemailer');

exports.getAllEvents = async (_, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;
  const event = await Event.create({ title, location, date, description, userId: req.user.userId });

  const user = await User.findById(req.user.userId);
  await sendEventEmail(user.email, { title, location, date });

  res.status(201).json(event);
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user.userId });
  res.json(events);
};
