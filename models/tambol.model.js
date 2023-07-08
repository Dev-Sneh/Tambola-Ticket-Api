const mongoose = require('mongoose');

const tambolaTicketSchema = new mongoose.Schema({
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ticket',
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const TambolaTicketModel = mongoose.model('tambolaTicket', tambolaTicketSchema);

module.exports ={ TambolaTicketModel}
