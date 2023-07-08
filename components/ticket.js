function generateUniqueTicketId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
    const randomString = Math.random().toString(36).substring(2, 5); // Generate a random string
  
    return `${timestamp}-${randomString}`;
  }
  
  const generateRandomValues = (indexes) => {
    const uniqueIndexes = [];
  
    while (uniqueIndexes.length < 5) {
      const randomIndex = Math.floor(Math.random() * indexes.length);
      const selected = indexes.splice(randomIndex, 1)[0];
      uniqueIndexes.push(selected);
    }
    return uniqueIndexes;
  };
  
  const generateRandomIndexForTickets = () => {
    const indexes = Array.from({ length: 9 }, (_, index) => index); // Create an array with indexes 0 to 4
    const uniqueIndexes = [];
  
    while (uniqueIndexes.length < 5) {
      const randomIndex = Math.floor(Math.random() * indexes.length);
      const selected = indexes.splice(randomIndex, 1)[0];
      uniqueIndexes.push(selected);
    }
  
    return uniqueIndexes;
  };
  
  const generateTambolaTicket = (array) => {
    console.log(array.length);
    const tickets=[]

    for(let ticketNumber=1;ticketNumber<=6;ticketNumber++){
       let ticket = Array.from({ length: 3 }, () => Array(9).fill(0));//in .fill changed 0 with empty space and we can simple change it with number or string 


    for (let i = 0; i < 3; i++) {
      const randomIndexForTickets = generateRandomIndexForTickets();
      const randomValues = generateRandomValues(array);
      console.log("Random values: " + randomValues, randomIndexForTickets);

      for (let j = 0; j < randomIndexForTickets.length; j++) {
        ticket[i][randomIndexForTickets[j]] = randomValues[j];
      }
    }

    tickets.push(ticket)
    }

    
    return tickets;
  };

  
  module.exports = {
    generateUniqueTicketId,
    generateTambolaTicket,
  };