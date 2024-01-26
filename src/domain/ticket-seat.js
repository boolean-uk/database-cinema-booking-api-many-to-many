const prisma = require("../utils/prisma");

const getTicketsWithSeatsForAScreenDb = async (id) => {
  return await prisma.ticket.findMany({
    where: {
      seats: {
        some: {
          seat: {
            screen: {
              id: id,
            },
          },
        },
      },
    }, 
    include: {
        seats: true
    }
  });
};

const createTicketWithSeatsDb = async (request) => {
  const ticket = await prisma.ticket.create({
    data: {
      customer: {
        connect: {
          id: request.customer,
        },
      },
      screening: {
        connect: {
          id: request.screening,
        },
      },
      seats: {
        create: request.seats.map((seat) => ({ 
            seat: {
                connect: {
                    number: seat.number,
                }
            },
            sold: seat.sold, 
            discount: seat.discount
        })),
      },
    },
    include: {
      customer: true,
      screening: true,
      seats: true,
    },
  });
  return ticket;
};

module.exports = {
  getTicketsWithSeatsForAScreenDb,
  createTicketWithSeatsDb,
};
