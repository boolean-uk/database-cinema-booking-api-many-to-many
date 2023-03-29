# Update the Schema

1. Add the new model and its relationships to the `prisma/schema.prisma` file.
2. Run `npx prisma generate` to recompile the prisma client.
3. Run `npx prisma migrate dev --create-only --skip-seed --name new_model` to create a migration.
4. Update the `prisma/seed.js` file to create records for the new model and satisfy its relationships.
5. Run `npx prisma migrate reset` to apply the migration and run the seed file.

## Relevant Documentation

[Implicit many-to-many relationships](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations)


//seatNumber: 1,
            // screen: {
            //     connect: {
            //         id: 2
            //     },
            // },
            // tickets: {
            //     create: [{
            //         screening: {
            //             connect: {
            //                 id: 2,
            //             },
            //         },
            //         customer: {
            //             connect: {
            //                 id: 2,
            //             },
            //         }
            //     }]
            // },