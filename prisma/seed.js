const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
    const customer = await createCustomer();
    const movies = await createMovies();
    const screens = await createScreens();
  
    // Check if screens array is populated
    if (screens.length === 0) {
      throw new Error('No screens available to create seats or tickets.');
    }
  
    const screenings = await createScreenings(screens, movies);
  
    // Example of creating seats for a screen and creating a ticket
    const seats = createSeatsForScreen(10); 
    await createSeatsInDB(seats, screens[0].id); 
  
    
    if (screenings.length === 0) {
      throw new Error('No screenings available to create tickets.');
    }
  
    await createTickets(screenings[0], customer, [1, 2]);
  
    console.log("Seeding completed successfully.");
    process.exit(0);
  }

async function createCustomer() {
  const customer = await prisma.customer.create({
    data: {
      name: "Alice",
      contact: {
        create: {
          email: "alice@boolean.co.uk",
          phone: "1234567890",
        },
      },
    },
    include: {
      contact: true,
    },
  });

  console.log("Customer created", customer);

  return customer;
}

async function createMovies() {
  const rawMovies = [
    { title: "The Matrix", runtimeMins: 120 },
    { title: "Dodgeball", runtimeMins: 154 },
  ];

  const movies = [];

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie });
    movies.push(movie);
  }

  console.log("Movies created", movies);

  return movies;
}

async function createScreens() {
  const rawScreens = [{ number: 1 }, { number: 2 }];

  const screens = [];

  for (const rawScreen of rawScreens) {
    const screen = await prisma.screen.create({
      data: rawScreen,
    });

    console.log("Screen created", screen);

    screens.push(screen);
  }

  return screens;
}

async function createScreenings(screens, movies) {
    const screenings = [];
  
    for (const screen of screens) {
      for (let i = 0; i < movies.length; i++) {
        const screeningDate = new Date();
        screeningDate.setDate(screeningDate.getDate() + i);
  
        const screening = await prisma.screening.create({
          data: {
            startsAt: screeningDate,
            movie: {
              connect: {
                id: movies[i].id,
              },
            },
            screen: {
              connect: {
                id: screen.id,
              },
            },
          },
        });
  
        console.log("Screening created", screening);
        screenings.push(screening);
      }
    }
  
    return screenings;
  }
  

function createSeatsForScreen(numberOfSeats) {
  let seats = [];
  for (let i = 1; i <= numberOfSeats; i++) {
    seats.push({ seatNumber: i });
  }
  return seats;
}

async function createSeatsInDB(seats, screenId, ticketId) {
    for (const seat of seats) {
        const seatData = {
            seatNumber: seat.seatNumber,
            Screen: {
                connect: { id: screenId },
            },
        };

        if (ticketId) {
            seatData.Ticket = {
                connect: { id: ticketId },
            };
        }

        await prisma.seat.create({ data: seatData });
    }
}



async function createTickets(screening, customer, seatIds) {
  const ticket = await prisma.ticket.create({
    data: {
      customer: { connect: { id: customer.id } },
      screening: { connect: { id: screening.id } },
      seats: {
        connect: seatIds.map((id) => ({ id })),
      },
    },
  });

  console.log("Ticket created", ticket);
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
