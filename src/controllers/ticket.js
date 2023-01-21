const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createTicket = async (req, res) => {
 const { seatNumber, screenId } = req.body;

    try {
        const ticket = await prisma.ticket.create({
            data: {
                screening: {
                    connect: {
                        id: 1
                    }
                },
               customer: {
                connect: {
                    id: 1
                }
               },
                seats: {
                    create: [{seatNumber: seatNumber, screenId: Number.parseInt(screenId)}]
                }
            },
            include: {
                seats: true
            }
           
        })
    
        res.status(201).json({ticket: ticket})
    }
    catch(e){
        res.json("check your screenId and seatNumber both must be unique. ")
    }
}

module.exports = {
    createTicket
}