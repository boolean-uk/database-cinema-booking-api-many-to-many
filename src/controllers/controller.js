const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getScreen = async (req, res) => {
    const screenId = Number(req.params.id)

    const data = await prisma.screen.findUnique({

        where: {
            id: screenId
        },

        include: {
            seats: true
    }})

    return res.send( { screen: data } )
}

const createTicket = async (req, res) => {
    const { seatNum } = req.query

    const customerId = Number(req.query.customerId)

    const screeningId = Number(req.query.screeningId)

    const screen = Number(req.query.screenId)

    const createdTicket = await prisma.ticket.create({
        data: {
            screening: {
                connect: {
                    id: screeningId
                }
            },
            seats: {
                create: {
                        seatNum: seatNum,
                        screen: {
                            create: {
                                number: screen
                            }
                        }
                    },
            },
            customer: {
                connect: {
                    id: customerId
                }
            },
        },
        include: {
            seats: true,
            screening: true,
            customer: true
        }
    })
    return res.status(201).send( {createdTicket} )
  }

module.exports = {
    getScreen,
    createTicket
}
