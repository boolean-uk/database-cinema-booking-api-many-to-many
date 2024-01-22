const prisma = require("../utils/prisma")

const getTicketsWithSeatsForAScreenDb = async (id) => {
    return await prisma.screen.findUnique({
        where: { id },
        include: { 
            seats: {
                include: {
                    tickets: {
                        include: {
                            customer: {
                                select: {
                                    name:true
                                }
                            },
                            screening: {
                                select: {
                                    movie: {
                                        select: {
                                            title: true
                                        }
                                    },
                                    startsAt: true
                                }
                            }
                        }
                    }

                }
            }
        }
    })
}

const createTicketWithSeatsDb = async (request) => {  
    const ticket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: request.customer
                }
            }, 
            screening: {
                connect: {
                    id: request.screening
                }
            },
            seats: {
                connect: request.seats.map((seat) => ({number: seat.number}))
            },
        }, 
        include: {
            customer: true,
            screening: true,
            seats: true
        }
    })
    return ticket
}

module.exports = {
    getTicketsWithSeatsForAScreenDb,
    createTicketWithSeatsDb
}