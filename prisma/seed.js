const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  await createCustomer()
  const movies = await createMovies()
  const screens = await createScreens()
  await createScreenings(screens, movies)
  await createSeats()

  process.exit(0)
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
  })

  console.log('Customer created', customer)

  return customer
}

async function createMovies() {
  const rawMovies = [
    { title: 'The Matrix', runtimeMins: 120 },
    { title: 'Dodgeball', runtimeMins: 154 }
  ]

  const movies = []

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie })
    movies.push(movie)
  }

  console.log('Movies created', movies)

  return movies
}

async function createScreens() {
  const rawScreens = [{ number: 1 }, { number: 2 }]

  const screens = []

  for (const rawScreen of rawScreens) {
    const screen = await prisma.screen.create({
      data: rawScreen
    })

    console.log('Screen created', screen)

    screens.push(screen)
  }

  return screens
}

async function createScreenings(screens, movies) {
  const screeningDate = new Date()

  for (const screen of screens) {
    for (let i = 0; i < movies.length; i++) {
      screeningDate.setDate(screeningDate.getDate() + i)

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
      })

      console.log('Screening created', screening)
    }
  }
}

const createSeats = async () => {
  const seatsData = [
    { number: 1, screenId: 1 },
    { number: 2, screenId: 1 },
    { number: 3, screenId: 2 },
    { number: 4, screenId: 2 },
    { number: 5, screenId: 2 },
    { number: 6, screenId: 1 }
  ]

  const createdSeats = await prisma.seat.createMany({
    data: seatsData
  })

  console.log('Created Seats', createSeats)

  return createdSeats
}

seed()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
  .finally(() => process.exit(1))
