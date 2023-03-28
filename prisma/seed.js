const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  await createScreenings(screens, movies);
  const seats = await createSeats();
  const assign = await assignSeat();
  const ticket = await createTicket();
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
      seats: true,
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

async function createSeats() {
  const rawSeats = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
  ];

  const seats = [];

  for (const rawSeat of rawSeats) {
    const seat = await prisma.seat.create({
      data: rawSeat,
    });

    console.log("seat created", seat);

    seats.push(seat);
  }

  return seats;
}

async function assignSeat() {
  const customerSeats = await prisma.customer.create({
    data: {
      name: "Picard",
      seats: {
        connectOrCreate: [
          {
            where: {
              id: 4,
            },
            create: {
              number: 4,
            },
          },
          {
            where: {
              id: 5,
            },
            create: {
              number: 5,
            },
          },
        ],
      },
    },
    include: {
      seats: true,
    },
  });
  console.log("customer seats????", customerSeats);

  return customerSeats;
}

async function createTicket() {
  const ticket = await prisma.ticket.create({
    data: {
      screening: {
        connect: {
            id: 2,
        },
      },
      customer: {
        connect: {
            id: 2,
        },
      },
      seat: {
        connect: {
            id: 5,
        },
      },
    },
    include: {
      screening: true,
      customer: true,
      seat: true,
    },
  });
  console.log("Tickets----", ticket);
  return ticket;
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
