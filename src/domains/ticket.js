const prisma = require("../utils/prisma.js");

const createTicketDB = async (id) =>
    await prisma.ticket.create({
        
    });

module.exports = {
    createTicketDB,
};