const mongoose = require('mongoose');

const tambolaTicketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [[Number]],
    required: true,
  },
});

const TicketModel=mongoose.model("ticket", tambolaTicketSchema)

module.exports={
    TicketModel
}