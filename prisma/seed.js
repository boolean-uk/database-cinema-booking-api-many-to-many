const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const customer = await createCustomer();
    const movies = await createMovies();
    const screens = await createScreens();
    const screenings = await createScreenings(screens, movies);
    const seats = await createSeats(screens);
    await createTicket(customer, seats, screenings[0])

    process.exit(0);
}

async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@boolean.co.uk',
                    phone: '1234567890'
                }
            }
        },
        include: {
            contact: true
        }
    });

    console.log('Customer created', customer);

    return customer;
}

async function createMovies() {
    const rawMovies = [
        { title: 'The Matrix', runtimeMins: 120 },
        { title: 'Dodgeball', runtimeMins: 154 },
    ];

    const movies = [];

    for (const rawMovie of rawMovies) {
        const movie = await prisma.movie.create({ data: rawMovie });
        movies.push(movie);
    }

    console.log('Movies created', movies);

    return movies;
}

async function createScreens() {
    const rawScreens = [
        { number: 1 }, { number: 2 }
    ];

    const screens = [];

    for (const rawScreen of rawScreens) {
        const screen = await prisma.screen.create({
            data: rawScreen
        });

        console.log('Screen created', screen);

        screens.push(screen);
    }

    return screens;
}

async function createScreenings(screens, movies) {
    const screeningDate = new Date();

    const screenings = [];

    for (const screen of screens) {
        for (let i = 0; i < movies.length; i++) {
            screeningDate.setDate(screeningDate.getDate() + i);

            const screening = await prisma.screening.create({
                data: {
                    startsAt: screeningDate,
                    movie: {
                        connect: {
                            id: movies[i].id
                        }
                    },
                    screen: {
                        connect: {
                            id: screen.id
                        }
                    }
                }
            });

            console.log('Screening created', screening);
            screenings.push(screening);
        }
    }
    return screenings;
}

async function createSeats(screens) {
    for (const screen of screens) {
        const newSeats = Array.from({length: 2}).map(seat => ({screenId: screen.id}));
        await prisma.seat.createMany({
            data: newSeats
        })
    }
    const seats = await prisma.seat.findMany();
    console.log('Seats created', seats);
    return seats;
}

async function createTicket(customer, seats, screening) {
    const ticket = await prisma.ticket.create({
        data: {
            customerId: customer.id,
            seats: {
                create: [{seatId: seats[0].id}, {seatId: seats[1].id}]
            },
            screeningId: screening.id
        },
        include: {
            screening: {
                include: {
                    movie: true
                }
            },
            seats: true
        }
    })
    console.log("Ticket created", ticket);
    return ticket;
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));