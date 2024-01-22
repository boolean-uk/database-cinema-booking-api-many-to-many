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
const createTicketWithSeatsDb = async () => {}

module.exports = {
    getTicketsWithSeatsForAScreenDb,
    createTicketWithSeatsDb
}