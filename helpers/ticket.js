function generateUniqueTicketId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 5);
  return `${timestamp}-${randomString}`;
}

const generateTambolaTicket = () => {
  const ticket = [];

  const columnRange = Array.from({ length: 9 }, (_, index) => ({
    start: index * 10 + 1,
    end: (index + 1) * 10,
  }));

  for (let row = 0; row < 3; row++) {
    const ticketRow = [];
    const selectedColumns = [];
    for (let i = 0; i < 5; i++) {
      let randomColumn = Math.floor(Math.random() * 9);
      while (selectedColumns.includes(randomColumn)) {
        randomColumn = Math.floor(Math.random() * 9);
      }
      selectedColumns.push(randomColumn);
    }

    for (let column = 0; column < 9; column++) {
      const { start, end } = columnRange[column];
      let number = 0;
      if (selectedColumns.includes(column)) {
        number = Math.floor(Math.random() * (end - start + 1)) + start;
      }
      ticketRow.push(number);
    }
    ticket.push(ticketRow);
  }

  return ticket;
};

module.exports = {
  generateUniqueTicketId,
  generateTambolaTicket,
};
