const express = require('express');
const { bookTicket, myTickets } = require('../controllers/ticketController');
const auth = require('../middleware/auth'); // You need to create this
const router = express.Router();

router.post('/book', auth, bookTicket); // POST /api/tickets/book
router.get('/me', auth, myTickets);     // GET  /api/tickets/me

module.exports = router;
