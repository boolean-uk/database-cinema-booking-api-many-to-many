const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const customer = await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  const screenings = await createScreenings(screens, movies);
  await createSeats(screens);
  await createTicket(customer, screenings[0]);
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

  const screenings = [];

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
      screenings.push(screening);

      console.log("Screening created", screening);
    }
  }
  return screenings;
}

async function createSeats(screens) {
  const rawSeats = [
    { number: 1, screen: 2 },
    { number: 2, screen: 2 },
    { number: 3, screen: 2 },
    { number: 4, screen: 1 },
    { number: 5, screen: 1 },
    { number: 6, screen: 1 },
  ];

  const seats = [];

  for (let i = 0; i < screens.length; i++) {
    for (let j = 0; j < rawSeats.length; j++) {
      if (rawSeats[j].screen === screens[i].number) {
        const seat = await prisma.seat.create({
          data: {
            number: rawSeats[j].number,
            screen: {
              connect: {
                id: screens[i].id,
              },
            },
          },
        });
        seats.push(seat);
      }
    }
  }

  console.log("Seats created", seats);

  return seats;
}

async function createTicket(customer, screening) {
  const rawTicket = [{ seat: 1 }, { seat: 2 }];

  const ticket = await prisma.ticket.create({
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
        create: rawTicket.map((ticket) => ({ 
          seat: {
            connect: {
              id: ticket.seat
            }
          },
          sold: true,
          discount: false
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
      seats: true
    },
  });

  console.log("ticket created", ticket);
  
  return ticket;
}
seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
