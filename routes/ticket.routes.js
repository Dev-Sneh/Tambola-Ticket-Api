const express = require("express");
const { TicketModel } = require("../models/ticket.model");
const { generateTambolaTicket, generateUniqueTicketId } = require("../components/ticket");
const { TambolaTicketModel } = require("../models/tambol.model");
const tambolaRoutes = express.Router();

tambolaRoutes.post("/tickets", async (req, res) => {
  try {
    const { userId, numberOfTickets } = req.body;

    // Generate unique ticket ID
    const ticketId = generateUniqueTicketId();

    // Save the ticket to the database
    const ticket = new TicketModel({ ticketId, userId });
    const savedTicket = await ticket.save();
    const ticketInsertId = savedTicket._id;

    // Generate the requested number of tickets
    const tickets = [];
    let numberArray = Array.from({ length: 90 }, (_, index) => index + 1);

    for (let i = 0; i < numberOfTickets; i++) {
      const array = numberArray.length === 0 ? Array.from({ length: 90 }, (_, index) => index + 1) : numberArray.slice();
      const ticketNumbers = generateTambolaTicket(array);

      // Save the ticket numbers to the database
      const tambolaTicket = new TambolaTicketModel({
        ticket_id: ticketInsertId,
        value: JSON.stringify(ticketNumbers)
      });
      await tambolaTicket.save();

      tickets.push(ticketNumbers);
    }

    return res.status(200).json({ tickets, ticketId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});



tambolaRoutes.get("/tickets", async (req, res) => {
  try {
    const {userId, page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skipCount = (pageNumber - 1) * pageSize;

    // Fetch the tickets associated with the user ID with pagination
    const tickets = await TambolaTicketModel.find()
      .skip(skipCount)
      .limit(pageSize)

    return res.status(200).send({ tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = {
  tambolaRoutes,
};
