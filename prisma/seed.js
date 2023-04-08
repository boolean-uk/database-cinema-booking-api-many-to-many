const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const customer = await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  const screenings = await createScreenings(screens, movies);
  const seats = await createSeats(screens[0]);
  // const ticket = await createTicket(seats, screenings[0], customer);
  // console.log("TICKET CREATED: ", ticket);
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

  const returnedValue = [];
  returnedValue.push(customer);
  console.log("Customer created", customer);
  return returnedValue;
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

// Create 4 seats for the screen
async function createSeats(screen) {
  seatsToCreate = ["A1", "A2", "B1", "B2"];
  const seats = [];
  // console.log("seatstocreate", seatsToCreate);
  // console.log("screen", screen);

  // Originally had a forEach here but it only works with .map with await Promise.all. It has to return the promises
  // Alternative approach: .then()
  const createdSeats = await Promise.all(
    seatsToCreate.map(async (seat) => createSeat(seat, screen))
  );
  seats.push([...createdSeats]);
  return createdSeats;
  // console.log("seatstocreate OUTSIDE", seatsToCreate);
}

// Created a single seat, called from createSeats
async function createSeat(seat, screen) {
  // console.log("seatstocreate INSIDE", seat);

  const createdSeat = await prisma.seat.create({
    data: {
      number: seat,
      screen: {
        connect: {
          id: screen.number,
        },
      },
    },
  });
  console.log("Seat created", createdSeat);
  return createdSeat;
}

// Creates a ticket based on everything that was created above.
// This can't be done at the top of the seed because the seats, screening and customer must be created first!
// async function createTicket(seats, screening, customer) {
//   console.log("THE CUSTOMER", customer);
//   const seatIds = seats.map((seat) => {
//     return { id: seat.id };
//   });

//   const ticket = await prisma.ticket.create({
//     data: {
//       customerId: customer.id,
//       screeningId: screening.id,

//       // This will connect with the seats that I created above (in createdSeat)
//       seats: {
//         connect: seatIds,
//       },
//     },
//   });
//   return ticket;
// }

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
