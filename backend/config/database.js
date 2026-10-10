const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        serverSelectionTimeoutMS: 15000
    })
        .then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        })
        .catch(err => {
            console.log(`Database connection error: ${err.message}`)
        })
}

module.exports = connectDatabase