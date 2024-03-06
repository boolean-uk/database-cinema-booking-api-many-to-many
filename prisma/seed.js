const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  await createScreenings(screens, movies);
  await createSeats(screens);
  await createMoreSeats();

  process.exit(0);
}

async function createCustomer() {
  const newCustomer = await prisma.customer.create({
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

  return newCustomer;
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
  for (let i = 0; i < screens.length; i++) {
    const seat = await prisma.seat.create({
      data: {
        seatRow: "A",
        seatNumber: "1",
        screen: {
          connect: { id: screens[i].id },
        },
      },
    });
    console.log("seat created", seat);
  }
}

async function createMoreSeats() {
  const seat1 = await prisma.seat.create({
    data: {
      seatRow: "A",
      seatNumber: 3,
      screen: {
        connect: { id: 1 },
      },
    },
  });

  const seat2 = await prisma.seat.create({
    data: {
      seatRow: "A",
      seatNumber: 5,
      screen: {
        connect: { id: 1 },
      },
    },
  });

  const seat3 = await prisma.seat.create({
    data: {
      seatRow: "B",
      seatNumber: 1,
      screen: {
        connect: { id: 2 },
      },
    },
  });
}

seed()
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0); // Exit with a success status code
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect(); // Ensure Prisma client disconnects after an error
    process.exit(1); // Exit with an error status code
  });
