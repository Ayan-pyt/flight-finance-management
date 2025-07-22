const Ticket = require('../models/Ticket');

exports.bookTicket = async (req, res) => {
  try {
    const { flightId, seat } = req.body;
    const ticket = await Ticket.create({ user: req.user.id, flight: flightId, seat });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('flight');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
