const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const customer = await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();

  if (screens.length === 0) {
    throw new Error("No screens available.");
  }

  const screenings = await createScreenings(screens, movies);

  const seats = createSeatsForScreen(10);
  await createSeatsInDB(seats, screens[0].id);

  if (screenings.length === 0) {
    throw new Error("No screenings available.");
  }

  await createTickets(screenings[0], customer, [1, 2]);

  console.log("Completed successfully.");
  process.exit(0);
}

async function createCustomer() {
  const customer = await prisma.customer.create({
    data: {
      name: "Joey",
      contact: {
        create: {
          email: "joey@life.com",
          phone: "191817121316198",
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
    { title: "Gladiator", runtimeMins: 159 },
    { title: "1917", runtimeMins: 90 },
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
        createMany: {
          data: seatIds.map((seatId) => ({
            seatId: seatId,
          })),
        },
      },
    },
    include: {
      screening: true,
      customer: true,
      seats: {
        include: {
          seat: true,
        },
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
