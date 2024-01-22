const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  await createScreenings(screens, movies);
  const seats = await createSeats(screens);
  await createTickets(seats);

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
  const screeningDate = new Date();

  for (const screen of screens) {
    for (let i = 0; i < movies.length; i++) {
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
    }
  }
}

async function createSeats(screens) {
  const seatRows = [
    {
      seatRow: "Row A",
      seatNumber: 1,
    },
    {
      seatRow: "Row A",
      seatNumber: 2,
    },
    {
      seatRow: "Row B",
      seatNumber: 1,
    },
    {
      seatRow: "Row B",
      seatNumber: 2,
    },
  ];

  const seats = [];

  for (const seatRow of seatRows) {
    for (let i = 0; i < screens.length; i++) {
      const pQuery = {
        data: { ...seatRow, screen: { connect: { id: screens[i].id } } },
        include: {
          screen: true,
        },
      };
      console.log("Pquery", pQuery);
      const seat = await prisma.seat.create(pQuery);

      seats.push(seat);
    }
  }

  return seats;
}

async function createTickets(seats) {
  for (let i = 0; i < seats.length; i++) {
    const ticket = await prisma.ticket.create({
      data: {
        customer: {
          connect: {
            id: 1,
          },
        },
        screening: {
          connect: {
            id: 1,
          },
        },
        seats: {
          connect: {
            id: seats[i].id,
          },
        },
      },
      include: {
        customer: true,
        screening: true,
        seats: true,
      },
    });
    console.log("Ticket Created", ticket);
  }
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
