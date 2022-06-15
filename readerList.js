// This is a tool that lets you read everything in the readerList json array into the database.
// Is this adaptable for maintaining the reader list without making the readers available publically?

require('dotenv').config()

const connectDB = require('./db/connect');                          // Makes the database connection set-up available
const Reader = require('./models/Reader');                          // Makes the Reader function based on the Reader.js model available

const jsonReaders = require('./readerList.json')                    // Makes array of readers listed in json available

const start = async () =>{
    try {
        await connectDB(process.env.DATABASE_URL)                   // Establishes connect to the database again
//        await Reader.deleteMany()                                   // Removes all of the readers currently there. Makes you start from scratch for the dataset
        await Reader.create(jsonReaders)                            // Creates entries in the database based on the readerList.json
        console.log('Success')
    } catch (error) {
        console.log(error)
    }
}

start()