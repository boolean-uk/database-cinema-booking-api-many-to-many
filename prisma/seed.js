const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMovies = async () => {
  const rawMovies = [
    { title: "Inception", runtimeMins: 148 },
    { title: "Interstellar", runtimeMins: 169 },
  ];

  const movies = [];

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie });
    movies.push(movie);
  }

  console.log("Movies created", movies);

  return movies;
};

async function createSeats(screenId) {
  const seatsData = [
    { number: 1, screenId },
    { number: 2, screenId },
    { number: 3, screenId },
    { number: 4, screenId },
    { number: 5, screenId },
    { number: 6, screenId },
  ];

  const createdSeats = await prisma.seat.createMany({
    data: seatsData,
  });

  console.log("Created Seats", createdSeats);

  return createdSeats;
}

async function createTicket(customer, screening) {
  const seatsArray = [7, 8, 9, 10, 11, 12];

  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: {
          id: screening.id,
        },
      },
      customer: {
        connect: {
          id: customer.id,
        },
      },
      seats: {
        create: seatsArray.map((seatNumber) => ({
          seat: {
            connect: {
              screenId: screening.screenId,
              number: seatNumber,
            },
          },
        })),
      },
    },
    include: {
      screening: {
        select: {
          movie: {
            select: {
              title: true,
            },
          },
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
      seats: true,
    },
  });

  console.log("Created Ticket", createdTicket);

  return createdTicket;
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

      return screening;
    }
  }
}

const createCustomer = async () => {
  const customer = await prisma.customer.create({
    data: {
      name: "Bob",
      contact: {
        create: {
          email: "bob@example.com",
          phone: "9876543210",
        },
      },
    },
    include: {
      contact: true,
    },
  });

  console.log("Customer created", customer);

  return customer;
};

async function seed() {
  const customer = await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  const screenings = await createScreenings(screens, movies);
  console.log(screenings);
  await createSeats(screens[0].id);
  await createTicket(customer, screenings);

  process.exit(0);
}

async function createScreens() {
  const rawScreens = [{ number: 3 }, { number: 4 }];

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

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
